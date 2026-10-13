import os
import json
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
from openai import AsyncOpenAI
from dotenv import load_dotenv

from .models import DoctorDossier
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
        )
        raw_content = response.choices[0].message.content.strip()
        if raw_content.startswith("```"):
            raw_content = raw_content.split("```")[1]
            if raw_content.startswith("json"):
                raw_content = raw_content[4:].strip()

        dossier = DoctorDossier.model_validate_json(raw_content)
        dossier.session_id = session_id
        dossier.created_at = datetime.utcnow().isoformat()
        return dossier
    except Exception as e:
        logger.error(f"Error in Pass C Synthesizer: {e}", exc_info=True)
        raise e
