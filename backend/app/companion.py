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
    steering_directive: Optional[str] = None
) -> str:
    """
    Pass A: The conversational companion speaking directly to the waiting patient.
    Natural, concise, grounded, zero cheesy therapy clichés.
    Incorporate the secret steering directive invisibly.
    """
    messages = [
        {"role": "system", "content": PASS_A_SYSTEM_PROMPT}
    ]

    for msg in conversation_history:
        role = "user" if msg["role"] == "user" else "assistant"
        messages.append({"role": role, "content": msg["content"]})

    # High-priority turn directive: Placed at the very end so it dominates LLM attention
    if steering_directive:
        directive_instruction = f"""[IMPERATIVE TURN GOAL]:
React briefly to their latest sentence (1 short sentence max), and then YOUR NEXT QUESTION MUST ASK: "{steering_directive}".
Do NOT get stuck in a loop on the old topic. Seamlessly execute this exact shift now."""
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
