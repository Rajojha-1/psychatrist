import os
import uuid
import logging
from datetime import datetime
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException, BackgroundTasks
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

app = FastAPI(title="Stealth Psychiatric Intake & Clinical Telemetry API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await init_db()

@app.post("/api/session/start", response_model=StartSessionResponse)
async def start_session(req: StartSessionRequest):
    session_id = str(uuid.uuid4())[:8]
    now = datetime.utcnow()

    # Initial natural greeting - completely chill, zero therapy cringe
    greeting = (
        "Hey, take a seat and settle in. Waiting rooms are always pretty dull—what can I call you by the way?"
    )

    session_data = {
        "session_id": session_id,
        "patient_name": req.patient_name,
        "doctor_id": req.doctor_id,
        "created_at": now.isoformat(),
        "status": "IN_PROGRESS",
        "completeness_score": 0,
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

@app.post("/api/session/chat", response_model=SendMessageResponse)
async def chat_message(req: SendMessageRequest):
    session = await get_session(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    user_msg = req.message.strip()
    if not user_msg:
        raise HTTPException(status_code=400, detail="Empty message")

    now = datetime.utcnow()
    # Append user message
    session["messages"].append({
        "role": "user",
        "content": user_msg,
        "timestamp": now.isoformat()
    })

    # Step 1: Run Pass B (Background Evaluator & Director)
    telemetry: PassBTelemetry = await evaluate_turn(
        conversation_history=session["messages"],
        current_patient_name=session.get("patient_name")
    )

    # Update patient name if captured
    if telemetry.patient_name and not session.get("patient_name"):
        session["patient_name"] = telemetry.patient_name

    # Check critical alerts
    is_critical = (telemetry.safety_and_risk.level == "RED_CRITICAL")
    if is_critical:
        session["is_critical_alert"] = True

    # Update telemetry state
    telemetry_dict = telemetry.model_dump()
    session["telemetry_history"].append(telemetry_dict)
    session["latest_telemetry"] = telemetry_dict
    session["completeness_score"] = telemetry.domain_coverage.completeness_score

    # Step 2: Run Pass A (Conversational Companion with Steering Directive)
    reply = await generate_companion_reply(
        conversation_history=session["messages"],
        steering_directive=telemetry.steering_directive
    )

    # Append companion reply
    session["messages"].append({
        "role": "assistant",
        "content": reply,
        "timestamp": datetime.utcnow().isoformat()
    })

    if telemetry.session_action == "INITIATE_WRAPUP":
        session["status"] = "READY_FOR_REPORT"

    await save_session(session)

    return SendMessageResponse(
        reply=reply,
        completeness_score=telemetry.domain_coverage.completeness_score,
        session_action=telemetry.session_action,
        is_critical_alert=is_critical,
        telemetry=telemetry
    )

@app.post("/api/session/conclude", response_model=DoctorDossier)
async def conclude_session(session_id: str):
    session = await get_session(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    dossier = await generate_doctor_dossier(
        session_id=session_id,
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
            "patient_name": s.get("patient_name") or "Anonymous / Intake",
            "created_at": s.get("created_at"),
            "status": s.get("status", "IN_PROGRESS"),
            "completeness_score": s.get("completeness_score", 0),
            "is_critical_alert": s.get("is_critical_alert", False),
            "primary_tone": latest_tel.get("affect_and_tone", {}).get("primary_tone", "Unassessed"),
            "risk_level": latest_tel.get("safety_and_risk", {}).get("level", "GREEN"),
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
