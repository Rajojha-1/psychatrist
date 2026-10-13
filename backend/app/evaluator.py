import os
import json
import logging
from typing import List, Dict, Any, Optional
from openai import AsyncOpenAI
from dotenv import load_dotenv

from .models import PassBTelemetry
from .prompts import PASS_B_SYSTEM_PROMPT

load_dotenv(override=True)

logger = logging.getLogger("evaluator")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "openai/gpt-oss-120b")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", None)

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=OPENAI_BASE_URL
)

# JSON schema definition for Groq / OpenAI json_object mode
SCHEMA_INSTRUCTION = f"""
IMPORTANT: You MUST respond ONLY with a valid JSON object matching this exact schema:
{json.dumps(PassBTelemetry.model_json_schema(), indent=2)}
Do not include any explanation or markdown formatting outside the JSON object.
"""

async def evaluate_turn(
    conversation_history: List[Dict[str, str]],
    current_patient_name: Optional[str] = None
) -> PassBTelemetry:
    """
    Pass B: Executes silently in the background on each patient message.
    Extracts deep psychiatric linguistic features, DSM-5 affect, cognitive distortions,
    somatic indicators, suicide/crisis safety, and returns a hidden steering directive for Pass A.
    """
    system_instruction = PASS_B_SYSTEM_PROMPT + "\n\n" + SCHEMA_INSTRUCTION
    if current_patient_name:
        system_instruction += f"\n\nKNOWN PATIENT NAME: {current_patient_name}"

    messages = [
        {"role": "system", "content": system_instruction}
    ]

    for msg in conversation_history:
        role = "user" if msg["role"] == "user" else "assistant"
        prefix = "PATIENT: " if msg["role"] == "user" else "COMPANION: "
        messages.append({"role": role, "content": prefix + msg["content"]})

    try:
        # Compatible with both Groq and OpenAI
        response = await client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            response_format={"type": "json_object"},
            temperature=0.2,
        )
        raw_content = response.choices[0].message.content.strip()
        # Clean any accidental markdown codeblock backticks
        if raw_content.startswith("```"):
            raw_content = raw_content.split("```")[1]
            if raw_content.startswith("json"):
                raw_content = raw_content[4:].strip()
        telemetry = PassBTelemetry.model_validate_json(raw_content)
        return telemetry
    except Exception as e:
        logger.error(f"Error in Pass B Evaluator: {e}", exc_info=True)
        from .models import (
            LinguisticAnalysis, AffectAndTone, SomaticIndicators, 
            SafetyAndRisk, DomainCoverage
        )
        return PassBTelemetry(
            patient_name=current_patient_name,
            linguistic_analysis=LinguisticAnalysis(
                pronoun_density_self_focus=0.5,
                absolutist_words_present=[],
                negation_fatalism_markers=[],
                syntactic_tempo="conversational"
            ),
            affect_and_tone=AffectAndTone(
                primary_tone="Guarded",
                valence=0.0,
                arousal_agitation=0.3,
                masking_cynicism_level=0.1,
                affect_stability="Stable"
            ),
            cognitive_distortions=[],
            somatic_indicators=SomaticIndicators(
                sleep_status="Unassessed",
                energy_and_fatigue="Unassessed",
                physical_manifestations=[]
            ),
            safety_and_risk=SafetyAndRisk(
                level="GREEN",
                risk_markers=[],
                verbatim_evidence=[]
            ),
            domain_coverage=DomainCoverage(
                patient_identity=bool(current_patient_name),
                chief_stressor_context=False,
                workplace_or_environment=False,
                sleep_architecture=False,
                somatic_physical_exhaustion=False,
                cognitive_distortions_and_loops=False,
                anhedonia_and_emotional_range=False,
                social_support_vs_isolation=False,
                coping_mechanisms_and_escapes=False,
                next_domain_to_explore="chief_stressor_context",
                completeness_score=10
            ),
            steering_directive="Keep the tone natural, chill, and zero-pressure. Ask how their morning has been.",
            session_action="CONTINUE"
        )
