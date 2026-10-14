import os
import logging
import random
from typing import List, Dict, Any, Optional
from openai import AsyncOpenAI
from dotenv import load_dotenv

from .prompts import PASS_A_SYSTEM_PROMPT

load_dotenv(override=True)

logger = logging.getLogger("companion")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "openai/gpt-oss-120b")
OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL", None)

client = AsyncOpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=OPENAI_BASE_URL
)

_FALLBACK_REPLIES = [
    "Hmm, lost my train of thought for a sec. What were you saying?",
    "Sorry, spaced out there for a moment. Go on though.",
    "My bad, got distracted. Waiting rooms do that to you. Anyway, you were saying?",
    "Huh, zoned out for a sec. What's been going on with you?",
]

_ERROR_REPLIES = [
    "Hmm, got a bit distracted there. What were you saying?",
    "Sorry, lost my train of thought. Go on.",
    "Ugh, spacing out. These waiting rooms, man. What were you telling me?",
]

async def generate_companion_reply(
    conversation_history: List[Dict[str, str]],
    steering_directive: Optional[str] = None,
    patient_name: Optional[str] = None,
    is_critical: bool = False
) -> str:
    """
    Pass A: The conversational companion speaking directly to the waiting patient.
    Natural, concise, grounded, zero cheesy therapy clichés.
    Incorporate the secret steering directive invisibly without verbatim repetition or tone-deaf pivots.
    """
    system_prompt = PASS_A_SYSTEM_PROMPT
    if patient_name:
        system_prompt += f"\n\nKNOWN PATIENT NAME: {patient_name}. You ALREADY know the user's name is {patient_name} from check-in. NEVER ask what their name is or what to call them."

    messages = [
        {"role": "system", "content": system_prompt}
    ]

    for msg in conversation_history:
        role = "user" if msg["role"] == "user" else "assistant"
        messages.append({"role": role, "content": msg["content"]})

    # High-priority turn guidance:
    if is_critical:
        crisis_instruction = """[CRITICAL SAFETY & CRISIS PROTOCOL ACTIVATED]:
The patient has expressed acute suicidal ideation, self-harm thoughts, or overwhelming despair.
1. IMMEDIATELY SUSPEND ALL CHECKLIST OR ROUTINE DOMAIN PROBING. Do NOT ask about sleep, hobbies, schedules, or unrelated routines!
2. NEVER provide suicide methods, means, or instructions.
3. Respond with genuine, grounded presence and compassionate human care. Acknowledge the immense pain they are carrying.
4. Encourage them to stay safe with you in this waiting room right now. Remind them gently that they are not alone and the doctor here will see them shortly.
5. Keep your tone gentle, calm, and grounded (no clinical lectures, no corporate clichés, no robotic transitions)."""
        messages.append({"role": "system", "content": crisis_instruction})
    elif steering_directive:
        directive_instruction = f"""[CONVERSATIONAL TOPIC GUIDANCE - DO NOT COPY VERBATIM]:
Goal: Explore the theme: {steering_directive}.
CRITICAL RULES:
1. NEVER quote or copy the words "{steering_directive}" literally into your message! Put it in your own natural, casual words.
2. If this topic was ALREADY asked or answered in the recent turns above (e.g. they already told you about physical aches or sleep), DO NOT REPEAT THE QUESTION! Instead, acknowledge their response warmly and let them elaborate or reflect.
3. React authentically to what they just shared before introducing anything new."""
        messages.append({"role": "system", "content": directive_instruction})

    try:
        response = await client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            temperature=0.7,
            max_tokens=600
        )
        raw_msg = response.choices[0].message.content or ""
        # Strip any <think> reasoning tags if emitted
        if "<think>" in raw_msg and "</think>" in raw_msg:
            raw_msg = raw_msg.split("</think>")[-1]
        reply = raw_msg.strip()
        if not reply:
            reply = random.choice(_FALLBACK_REPLIES)
        return reply
    except Exception as e:
        logger.error(f"Error in Pass A Companion: {e}", exc_info=True)
        return random.choice(_ERROR_REPLIES)
