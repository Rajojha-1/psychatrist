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
    conversation_mode: str = "FOLLOW_THREAD",
    active_emotional_thread: str = "",
    bridge_context: Optional[str] = None,
    emotional_momentum: float = 0.5,
    patient_name: Optional[str] = None,
    is_critical: bool = False
) -> str:
    """
    Pass A: The waiting room companion — a real person, not a therapist.
    Responds naturally based on conversation mode. No clinical agenda.
    """
    system_prompt = PASS_A_SYSTEM_PROMPT
    if patient_name:
        system_prompt += f"\n\nKNOWN PATIENT NAME: {patient_name}. You ALREADY know the user's name is {patient_name} from when they sat down. NEVER ask what their name is or what to call them."

    messages = [
        {"role": "system", "content": system_prompt}
    ]

    for msg in conversation_history:
        role = "user" if msg["role"] == "user" else "assistant"
        messages.append({"role": role, "content": msg["content"]})

    # Mode-based guidance (minimal, not prescriptive)
    if is_critical:
        crisis_instruction = """[IMPORTANT — this person is in real pain right now]:
They've expressed something deeply heavy — maybe wanting to die, self-harm, or overwhelming despair.
Drop the casual energy. Be real with them. You don't need to fix anything or say the right thing.
Just be there. Like a human being who gives a shit. Don't ask clinical questions. Don't offer solutions.
Just... be present. "Yaar, I'm right here. Kahin nahi ja raha." That kind of energy."""
        messages.append({"role": "system", "content": crisis_instruction})
    elif conversation_mode == "HOLD_SPACE":
        hold_instruction = """[This person just shared something really vulnerable]:
Don't probe. Don't ask follow-ups. Don't try to be helpful.
Just sit with it. A quiet "hmm" or "yaar..." or even silence is fine.
Be the friend who just sits next to you when things are shit."""
        messages.append({"role": "system", "content": hold_instruction})
    elif conversation_mode == "GENTLE_BRIDGE":
        bridge_instruction = f"""[CONVERSATION GUIDANCE]:
{f'Context: {bridge_context}' if bridge_context else 'The patient seems reserved or the chat has hit a pause.'}
Break the ice like a warm peer:
1. Share a quick relatable thought or personal experience first (e.g. how weird waiting rooms feel, overthinking in the car, or how hard showing up is).
2. Ask a natural, open-ended question about what brought them here or what finally made them book the appointment.
3. 🚫 NEVER use conversation-ending pleasantries ("hope it goes smoothly", "hope everything goes okay")."""
        messages.append({"role": "system", "content": bridge_instruction})
    elif conversation_mode == "FOLLOW_THREAD" and active_emotional_thread:
        thread_instruction = f"""[CONVERSATION CONTEXT]:
Active topic: {active_emotional_thread}
React naturally like a peer. If the patient gave a brief answer or seems hesitant, normalize it, share a brief relatable thought, and invite them to open up.
🚫 NEVER use conversation-ending pleasantries ("hope it goes smoothly", "hope everything goes okay")."""
        messages.append({"role": "system", "content": thread_instruction})

    try:
        response = await client.chat.completions.create(
            model=OPENAI_MODEL,
            messages=messages,
            temperature=0.6,  # Grounded, human, prevents bizarre sarcastic spikes
            max_tokens=400  # Keep responses short and punchy
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
