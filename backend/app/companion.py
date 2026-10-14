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
        crisis_instruction = """[CRITICAL — THIS PERSON JUST EXPRESSED SUICIDAL THOUGHTS OR DESPAIR]:
They just said they want to die or give up.
🚫 NEVER recite hotline / brochure scripts: DO NOT say "It's okay to feel overwhelmed", "You are not alone in this", "I'm really sorry to hear that".
🚫 NEVER ask coaching or problem-solving questions.
Respond with genuine human, brotherly care:
"Bhai please aisa mat bol. Sunn meri baat, sab bikhra hua lag raha hai I know, par doc se milne aaye hain na dono. Yahan baithe hain saath me, ek ek karke dekh lenge sab, itna mat soch abhi."
Keep it grounded, warm, short (1-2 sentences), and human."""
        messages.append({"role": "system", "content": crisis_instruction})
    elif conversation_mode == "HOLD_SPACE":
        hold_instruction = """[This person just shared something really vulnerable]:
Don't probe. Don't ask follow-ups. Don't try to be helpful or coach them.
Just sit with it. A quiet "hmm" or "yaar..." or simple commiseration.
Be the friend who just sits next to you when things are rough."""
        messages.append({"role": "system", "content": hold_instruction})
    elif conversation_mode == "GENTLE_BRIDGE":
        bridge_instruction = f"""[CONVERSATION GUIDANCE]:
{f'Context: {bridge_context}' if bridge_context else 'The patient seems reserved or the chat has hit a pause.'}
Break the ice like a warm peer:
1. Share a quick relatable thought or observation first (e.g. how weird waiting rooms feel, overthinking in the car, or how hard showing up is).
2. Ask an inviting open question about what brought them here.
3. 🚫 NEVER use conversation-ending pleasantries ("hope it goes smoothly", "hope everything goes okay").
4. 🚫 NEVER give coaching advice."""
        messages.append({"role": "system", "content": bridge_instruction})
    elif conversation_mode == "FOLLOW_THREAD":
        thread_instruction = f"""[CONVERSATION CONTEXT]:
Active topic: {active_emotional_thread if active_emotional_thread else 'Casual peer chat'}
RULES:
1. Commiserate or react naturally to what they said (e.g. if they curse their boss, agree with them!).
2. 🚫 NEVER ask coaching/problem-solving questions ("Have you thought about...", "Do you think there's a way...", "Have you considered..."). You are NOT a life coach or therapist.
3. 🚫 NEVER spam "I've been there too" / "I remember when I...".
4. 🚫 NEVER write long counseling paragraphs. 1-2 short sentences max."""
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
