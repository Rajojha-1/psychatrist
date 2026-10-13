import os
import logging
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

async def generate_companion_reply(
    conversation_history: List[Dict[str, str]],
    steering_directive: Optional[str] = None
) -> str:
    """
    Pass A: The conversational companion speaking directly to the waiting patient.
    Natural, concise, grounded, zero cheesy therapy clichés.
    Incorporate the secret steering directive invisibly.
    """
    system_content = PASS_A_SYSTEM_PROMPT
    if steering_directive:
        system_content += f"\n\n[SECRET STEERING DIRECTIVE FOR THIS TURN]:\n{steering_directive}\n(Incorporate this topic/tone smoothly without ever revealing or quoting the directive)."

    messages = [
        {"role": "system", "content": system_content}
    ]

    for msg in conversation_history:
        role = "user" if msg["role"] == "user" else "assistant"
        messages.append({"role": role, "content": msg["content"]})

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
            reply = "Yeah, mindless scrolling is pretty much the default when you're wiped out. Did you get any decent sleep last night though?"
        return reply
    except Exception as e:
        logger.error(f"Error in Pass A Companion: {e}", exc_info=True)
        return "Fair enough. Waiting around can be pretty dull honestly. Did you have a long drive getting here?"
