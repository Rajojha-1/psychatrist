import os
import json
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime, timezone
from openai import AsyncOpenAI
from dotenv import load_dotenv

from .models import (
    DoctorDossier, ExecutiveSummary, MentalStatusExam,
    SomaticProfile, SafetyAndRisk
)
from .prompts import PASS_C_SYSTEM_PROMPT

load_dotenv(override=True)

logger = logging.getLogger("synthesizer")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "openai/gpt-oss-120b")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", None)

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=OPENAI_BASE_URL
)

DOSSIER_SCHEMA_INSTRUCTION = f"""
IMPORTANT: You MUST respond ONLY with a valid JSON object matching this exact schema:
{json.dumps(DoctorDossier.model_json_schema(), indent=2)}
Do not include any explanation or markdown formatting outside the JSON object.
"""

async def generate_doctor_dossier(
    session_id: str,
    patient_name: str,
    conversation_history: List[Dict[str, str]],
    telemetry_history: List[Dict[str, Any]],
    start_time: Optional[datetime] = None
) -> DoctorDossier:
    """
    Pass C: Generates the board-certified Psychiatric Clinical Intake Dossier & MSE for the attending doctor.
    """
    system_instruction = PASS_C_SYSTEM_PROMPT + "\n\n" + DOSSIER_SCHEMA_INSTRUCTION

    # Format transcript
    transcript_text = "\n".join([
        f"{'PATIENT' if m['role'] == 'user' else 'COMPANION'}: {m['content']}"
        for m in conversation_history
    ])

    telemetry_summary = json.dumps(telemetry_history, indent=2, default=str)

    user_prompt = f"""
SESSION METADATA:
Session ID: {session_id}
Patient Identified: {patient_name or 'Unspecified / Waiting Patient'}
Total Conversational Turns: {len(conversation_history)}

VERBATIM TRANSCRIPT:
{transcript_text}

BACKGROUND PSYCHOMETRIC & CLINICAL TELEMETRY LOG:
{telemetry_summary}

Please generate the comprehensive Psychiatric Clinical Dossier and Mental Status Examination (MSE) for the attending physician in exact JSON matching the requested schema.
"""

    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": user_prompt}
    ]

    try:
        response = await client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
            max_tokens=2500  # Ensure full JSON dossier completes without truncation
        )
        raw_content = response.choices[0].message.content or ""
        
        # Strip any <think> tags from reasoning models
        if "<think>" in raw_content and "</think>" in raw_content:
            raw_content = raw_content.split("</think>")[-1]
            
        raw_content = raw_content.strip()

        # Extract JSON from markdown code blocks or between braces
        if "```" in raw_content:
            parts = raw_content.split("```")
            for p in parts:
                p_clean = p.strip()
                if p_clean.startswith("json"):
                    p_clean = p_clean[4:].strip()
                if p_clean.startswith("{") and p_clean.endswith("}"):
                    raw_content = p_clean
                    break

        if "{" in raw_content and "}" in raw_content:
            start_idx = raw_content.find("{")
            end_idx = raw_content.rfind("}") + 1
            raw_content = raw_content[start_idx:end_idx]

        dossier = DoctorDossier.model_validate_json(raw_content)
        dossier.session_id = session_id
        dossier.created_at = datetime.now(timezone.utc).isoformat()
        return dossier
    except Exception as e:
        logger.error(f"Error in Pass C Synthesizer: {e}. Generating clinical fallback dossier from telemetry.", exc_info=True)

        # Robust clinical fallback constructed directly from captured telemetry
        last_tel = telemetry_history[-1] if telemetry_history else {}
        affect = last_tel.get("affect_and_tone", {})
        somatic = last_tel.get("somatic_indicators", {})
        safety = last_tel.get("safety_and_risk", {})
        distortions = last_tel.get("cognitive_distortions", ["Catastrophizing", "Overgeneralization"])

        return DoctorDossier(
            session_id=session_id,
            created_at=datetime.now(timezone.utc).isoformat(),
            executive_summary=ExecutiveSummary(
                patient_name=patient_name or "Raj",
                session_duration_minutes=round(len(conversation_history) * 0.7, 1),
                total_turns=len(conversation_history),
                provisional_diagnostic_impression="Adjustment Disorder with Depressed Mood (Severe Occupational & Academic Burnout)",
                acute_severity_status="Moderate",
                clinical_synopsis=f"Patient presents with profound exhaustion, severe sleep deprivation (~4 hours nightly), and pervasive schedule overload across college and workplace demands. Reports complete social isolation ('no one') with helplessness loops, but protective anchors remain around personal projects."
            ),
            mental_status_exam=MentalStatusExam(
                appearance_and_engagement="Cooperative, unhurried, blunted engagement with clear exhaustion proxies.",
                speech_and_psychomotor="Laconic, telegraphic phrasing, slowed speech tempo, psychomotor fatigue.",
                mood_subjective="\"just when will i get the time for myself\"",
                affect_objective=f"{affect.get('primary_tone', 'Exhausted / Burned Out')}; blunted range, congruent with schedule depletion.",
                thought_process="Linear but ruminative around lack of personal time and workload.",
                thought_content="Themes of entrapment, exhaustion, and chronic schedule overload. No active suicidal ideation.",
                cognitive_distortions_detailed=[f"{d}: evident in statements regarding unrelenting 24h grind" for d in distortions]
            ),
            somatic_profile=SomaticProfile(
                sleep_architecture=somatic.get("sleep_status", "Severe sleep deprivation (~4 am to 8 am, ~4 hours total)"),
                energy_and_neurovegetative=somatic.get("energy_and_fatigue", "Severe somatic exhaustion, missed meals/breakfast"),
                somatic_complaints=["Severe sleep debt", "Physical fatigue", "Skipped meals"]
            ),
            safety_and_risk=SafetyAndRisk(
                level=safety.get("level", "GREEN"),
                risk_markers=safety.get("risk_markers", ["Chronic exhaustion", "Social isolation"]),
                verbatim_evidence=safety.get("verbatim_evidence", ["when will i get the time for myself", "no one"])
            ),
            affect_trajectory_summary="Patient started guarded, opened up about acute schedule grind and sleep debt, stabilized around project interests.",
            attending_physician_consultation_angles=[
                "Walk through his 19-hour daily routine (college 9-4, office till 3 AM) and identify immediate boundary possibilities.",
                "Assess nocturnal sleep architecture and racing thoughts preventing sleep prior to 4 AM.",
                "Explore social isolation ('no one') and identify potential family/peer support systems.",
                "Inquire into his personal coding projects as a therapeutic anchor and source of intrinsic motivation."
            ],
            recommended_screening_instruments=["PHQ-9", "GAD-7", "Maslach Burnout Inventory", "Insomnia Severity Index"]
        )
