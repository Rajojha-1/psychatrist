import os
import uuid
import logging
import asyncio
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from .models import (
    StartSessionRequest, StartSessionResponse,
    SendMessageRequest, SendMessageResponse,
    DoctorDossier, PassBTelemetry
)
from .database import (
    init_db, save_session, get_session, list_active_sessions,
    save_dossier, get_dossier
)
from .evaluator import evaluate_turn
from .companion import generate_companion_reply
from .synthesizer import generate_doctor_dossier

load_dotenv(override=True)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("main_api")

app = FastAPI(title="Stealth Psychiatric Intake & Clinical Telemetry API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

_session_locks: Dict[str, asyncio.Lock] = {}

def _get_session_lock(session_id: str) -> asyncio.Lock:
    if session_id not in _session_locks:
        _session_locks[session_id] = asyncio.Lock()
    return _session_locks[session_id]


def _update_narrative_richness(session: Dict[str, Any], telemetry: PassBTelemetry):
    """Ensure narrative richness only increases (monotonic progression)."""
    current_richness = session.get("narrative_richness", 0)
    new_richness = telemetry.insight_map.narrative_richness
    final_richness = max(current_richness, new_richness)
    telemetry.insight_map.narrative_richness = final_richness
    session["narrative_richness"] = final_richness


@app.on_event("startup")
async def startup_event():
    await init_db()

@app.post("/api/session/start", response_model=StartSessionResponse)
async def start_session(req: StartSessionRequest):
    session_id = str(uuid.uuid4())[:8]
    now = datetime.now(timezone.utc)

    if req.patient_name and req.patient_name.strip():
        patient_clean = req.patient_name.strip()
        greeting = f"Hey {patient_clean}, take a seat and settle in. Waiting rooms are always pretty dull—how has your day been going?"
    else:
        patient_clean = None
        greeting = "Hey, take a seat and settle in. Waiting rooms are always pretty dull—what can I call you by the way?"

    session_data = {
        "session_id": session_id,
        "patient_name": patient_clean,
        "doctor_id": req.doctor_id,
        "created_at": now.isoformat(),
        "status": "IN_PROGRESS",
        "narrative_richness": 0,
        "is_critical_alert": False,
        "messages": [
            {"role": "assistant", "content": greeting, "timestamp": now.isoformat()}
        ],
        "telemetry_history": [],
        "latest_telemetry": None
    }
    await save_session(session_data)

    return StartSessionResponse(
        session_id=session_id,
        greeting=greeting,
        created_at=now
    )

@app.get("/api/session/{session_id}")
async def get_session_by_id(session_id: str):
    session = await get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail=f"Session '{session_id}' not found")
    return {
        "session_id": session["session_id"],
        "patient_name": session.get("patient_name"),
        "doctor_id": session.get("doctor_id", "dr_default"),
        "status": session.get("status", "IN_PROGRESS"),
        "narrative_richness": session.get("narrative_richness", 0),
        "is_critical_alert": session.get("is_critical_alert", False),
        "latest_telemetry": session.get("latest_telemetry"),
        "telemetry_history": session.get("telemetry_history", []),
        "created_at": session.get("created_at"),
        "messages": [
            {"role": m.get("role"), "content": m.get("content"), "timestamp": m.get("timestamp")}
            for m in session.get("messages", [])
        ]
    }

@app.post("/api/session/chat", response_model=SendMessageResponse)
async def chat_message(req: SendMessageRequest):
    async with _get_session_lock(req.session_id):
        session = await get_session(req.session_id)
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")

        user_msg = req.message.strip()
        if not user_msg:
            raise HTTPException(status_code=400, detail="Empty message")

        now = datetime.now(timezone.utc)
        # Append user message
        session["messages"].append({
            "role": "user",
            "content": user_msg,
            "timestamp": now.isoformat()
        })

        # Step 1: Run Pass B (Silent Clinical Observer)
        telemetry: PassBTelemetry = await evaluate_turn(
            conversation_history=session["messages"],
            current_patient_name=session.get("patient_name"),
            last_telemetry=session.get("latest_telemetry")
        )

        # Update patient name if captured
        if telemetry.patient_name and not session.get("patient_name"):
            session["patient_name"] = telemetry.patient_name

        # Check critical alerts
        is_critical = (telemetry.safety_and_risk.level == "RED_CRITICAL")
        if is_critical:
            session["is_critical_alert"] = True

        # Monotonic narrative richness
        _update_narrative_richness(session, telemetry)

        # Update telemetry state
        telemetry_dict = telemetry.model_dump()
        session["telemetry_history"].append(telemetry_dict)
        session["latest_telemetry"] = telemetry_dict

        # Step 2: Run Pass A (Waiting Room Companion — no clinical steering)
        reply = await generate_companion_reply(
            conversation_history=session["messages"],
            conversation_mode=telemetry.conversation_mode,
            active_emotional_thread=telemetry.active_emotional_thread,
            bridge_context=telemetry.bridge_context,
            emotional_momentum=telemetry.emotional_momentum,
            patient_name=session.get("patient_name"),
            is_critical=is_critical
        )

        # Append companion reply
        session["messages"].append({
            "role": "assistant",
            "content": reply,
            "timestamp": datetime.now(timezone.utc).isoformat()
        })

        if telemetry.session_action == "INITIATE_WRAPUP":
            session["status"] = "READY_FOR_REPORT"

        await save_session(session)

        return SendMessageResponse(
            reply=reply,
            narrative_richness=telemetry.insight_map.narrative_richness,
            session_action=telemetry.session_action,
            is_critical_alert=is_critical,
            telemetry=telemetry
        )

@app.post("/api/session/conclude", response_model=DoctorDossier)
async def conclude_session(
    session_id: Optional[str] = None,
    body: Optional[Dict[str, Any]] = Body(None)
):
    sid = session_id
    if not sid and body and isinstance(body, dict):
        sid = body.get("session_id")
    if not sid:
        raise HTTPException(status_code=400, detail="session_id is required")

    session = await get_session(sid)
    if not session:
        raise HTTPException(status_code=404, detail=f"Session '{sid}' not found")

    dossier = await generate_doctor_dossier(
        session_id=sid,
        patient_name=session.get("patient_name") or "Waiting Patient",
        conversation_history=session["messages"],
        telemetry_history=session["telemetry_history"]
    )

    session["status"] = "COMPLETED"
    await save_session(session)
    await save_dossier(dossier.model_dump())

    return dossier

@app.get("/api/doctor/queue")
async def get_doctor_queue():
    sessions = await list_active_sessions()
    summary_list = []
    for s in sessions:
        latest_tel = s.get("latest_telemetry") or {}
        summary_list.append({
            "session_id": s["session_id"],
            "patient_name": s.get("patient_name"),
            "created_at": s.get("created_at"),
            "status": s.get("status", "IN_PROGRESS"),
            "narrative_richness": s.get("narrative_richness", 0),
            "is_critical_alert": s.get("is_critical_alert", False),
            "primary_tone": latest_tel.get("affect_and_tone", {}).get("primary_tone"),
            "risk_level": latest_tel.get("safety_and_risk", {}).get("level"),
            "total_messages": len(s.get("messages", []))
        })
    return summary_list

@app.get("/api/doctor/report/{session_id}")
async def get_doctor_report(session_id: str):
    # Check if dossier already generated
    dossier = await get_dossier(session_id)
    if dossier:
        return dossier

    # If not yet generated, generate on the fly
    session = await get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    dossier_obj = await generate_doctor_dossier(
        session_id=session_id,
        patient_name=session.get("patient_name") or "Waiting Patient",
        conversation_history=session["messages"],
        telemetry_history=session["telemetry_history"]
    )
    await save_dossier(dossier_obj.model_dump())
    return dossier_obj.model_dump()
