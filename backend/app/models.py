from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime

# ==========================================
# PASS B: CLINICAL OBSERVATION TELEMETRY
# ==========================================

class LinguisticAnalysis(BaseModel):
    pronoun_density_self_focus: float = Field(
        ..., description="Ratio (0.0 to 1.0) of 1st person singular ('I', 'me', 'my') showing inward depressive/anxious rumination."
    )
    absolutist_words_present: List[str] = Field(
        default_factory=list, description="Rigid absolutist terms used ('always', 'never', 'ruined', 'can't', 'totally')."
    )
    negation_fatalism_markers: List[str] = Field(
        default_factory=list, description="Passive fatalistic phrases ('whatever', 'pointless', 'it is what it is', 'doesn't matter')."
    )
    syntactic_tempo: str = Field(
        ..., description="Flow of speech: e.g. 'blunted / telegraphic', 'anxious / fragmented', 'verbose / racing', 'conversational / balanced'."
    )

class AffectAndTone(BaseModel):
    primary_tone: str = Field(
        ..., description="Dominant affect: e.g. 'Guarded', 'Cynical/Deflective', 'Anxious/Restless', 'Depressed/Numb', 'Irritable', 'Euthymic/Calm'."
    )
    valence: float = Field(
        ..., description="Emotional valence from -1.0 (deeply distressed/negative) to +1.0 (positive/congruent)."
    )
    arousal_agitation: float = Field(
        ..., description="Psychological arousal/agitation from 0.0 (lethargic/hypoactive) to 1.0 (hyperaroused/frantic)."
    )
    masking_cynicism_level: float = Field(
        ..., description="Degree of humor, sarcasm, or cynicism used to mask distress (0.0 to 1.0)."
    )
    affect_stability: str = Field(
        ..., description="Observations on emotional congruency or lability."
    )

class SomaticIndicators(BaseModel):
    sleep_status: str = Field(
        ..., description="Sleep assessment: e.g. 'Severe sleep-onset insomnia', 'Early morning waking', 'Disrupted / restless', 'Adequate', 'Not yet revealed'."
    )
    energy_and_fatigue: str = Field(
        ..., description="Physical energy level: e.g. 'Severe somatic exhaustion', 'Mild burnout', 'Normal', 'Not yet revealed'."
    )
    physical_manifestations: List[str] = Field(
        default_factory=list, description="Bodily tension reported (headaches, chest tightness, gastrointestinal upset, etc.)."
    )

class SafetyAndRisk(BaseModel):
    level: Literal["GREEN", "AMBER", "RED_CRITICAL"] = Field(
        ..., description="Triage safety level: GREEN (safe), AMBER (moderate distress/hopelessness), RED_CRITICAL (acute crisis/self-harm)."
    )
    risk_markers: List[str] = Field(
        default_factory=list, description="Identified risk factors."
    )
    verbatim_evidence: List[str] = Field(
        default_factory=list, description="Exact quotes from the patient that justify the safety rating."
    )

# ==========================================
# CLINICAL INSIGHT MAP (Replaces DomainCoverage)
# ==========================================

class ClinicalInsightMap(BaseModel):
    """Fluid clinical picture extracted from natural conversation. Uses the 4 Ps framework."""

    # The 4 Ps — free text, filled from whatever naturally surfaces
    precipitating_factors: str = Field(
        default="Not yet revealed",
        description="What triggered the current crisis? Why now? Job loss, breakup, conflict, exam pressure, etc."
    )
    perpetuating_factors: str = Field(
        default="Not yet revealed",
        description="What's keeping the suffering going? Isolation, poor sleep, toxic environment, avoidance, substance use, negative self-talk loops."
    )
    predisposing_factors: str = Field(
        default="Not yet revealed",
        description="Background vulnerabilities — family history, childhood trauma, personality traits. Only if naturally mentioned."
    )
    protective_factors: str = Field(
        default="Not yet revealed",
        description="Strengths that remain — a friend, hobby, project, humor, self-awareness, willingness to seek help."
    )

    # Clinical observations — extracted from conversation, NOT probed
    sleep_and_energy: str = Field(
        default="Not yet revealed",
        description="Sleep quality, hours, insomnia, energy levels — only what patient naturally mentioned."
    )
    somatic_complaints: str = Field(
        default="Not yet revealed",
        description="Physical symptoms — headaches, appetite changes, body aches — only what patient naturally mentioned."
    )
    social_world: str = Field(
        default="Not yet revealed",
        description="Relationships, isolation, support system — only what patient naturally mentioned."
    )
    emotional_landscape: str = Field(
        default="Not yet revealed",
        description="How they describe their emotional state, mood, anhedonia, numbness — extracted from their own words."
    )
    coping_and_escapes: str = Field(
        default="Not yet revealed",
        description="How they handle stress — avoidance, doomscrolling, smoking, gaming, drinking — only what naturally mentioned."
    )

    # What we still don't know
    clinical_blind_spots: List[str] = Field(
        default_factory=list,
        description="Areas with ZERO clinical signal so far. For the doctor's awareness, not for the companion to probe."
    )

    # Richness score — how deep is our understanding?
    narrative_richness: int = Field(
        default=0,
        description="0-100 score of how rich and deep our clinical understanding is. NOT about checking boxes — about depth of insight."
    )

class PassBTelemetry(BaseModel):
    patient_name: Optional[str] = Field(None, description="Patient's name extracted from dialogue if provided, otherwise null.")
    linguistic_analysis: LinguisticAnalysis
    affect_and_tone: AffectAndTone
    cognitive_distortions: List[str] = Field(
        default_factory=list, description="Distortions observed (Catastrophizing, All-or-Nothing, Personalization, etc.)."
    )
    somatic_indicators: SomaticIndicators
    safety_and_risk: SafetyAndRisk

    # NEW: Replaces domain_coverage + steering_directive
    insight_map: ClinicalInsightMap = Field(
        default_factory=ClinicalInsightMap,
        description="Fluid clinical insight map using 4 Ps framework. Filled from natural conversation."
    )

    conversation_mode: Literal["FOLLOW_THREAD", "GENTLE_BRIDGE", "HOLD_SPACE"] = Field(
        default="FOLLOW_THREAD",
        description="Mode for companion: FOLLOW_THREAD (react to what patient said), GENTLE_BRIDGE (conversation stalled), HOLD_SPACE (crisis)."
    )

    active_emotional_thread: str = Field(
        default="",
        description="What the patient is currently talking about / feeling. Brief description for the companion's awareness."
    )

    bridge_context: Optional[str] = Field(
        default=None,
        description="Only for GENTLE_BRIDGE mode: a soft, contextual suggestion connected to what was last discussed."
    )

    emotional_momentum: float = Field(
        default=0.5,
        description="0.0 (flat, disengaged) to 1.0 (intense sharing flow). Helps companion gauge energy."
    )

    session_action: Literal["CONTINUE", "INITIATE_WRAPUP", "EMERGENCY_DEESCALATE"] = Field(
        ..., description="Action recommendation: CONTINUE, INITIATE_WRAPUP (if richness >= 70 and 8+ turns), or EMERGENCY_DEESCALATE."
    )

    @property
    def narrative_richness(self) -> int:
        return self.insight_map.narrative_richness

# ==========================================
# PASS C: DOCTOR CLINICAL DOSSIER
# ==========================================

class ExecutiveSummary(BaseModel):
    patient_name: str
    session_duration_minutes: float
    total_turns: int
    provisional_diagnostic_impression: str
    acute_severity_status: Literal["Low", "Moderate", "High / Urgent"]
    clinical_synopsis: str

class MentalStatusExam(BaseModel):
    appearance_and_engagement: str
    speech_and_psychomotor: str
    mood_subjective: str
    affect_objective: str
    thought_process: str
    thought_content: str
    cognitive_distortions_detailed: List[str]

class SomaticProfile(BaseModel):
    sleep_architecture: str
    energy_and_neurovegetative: str
    somatic_complaints: List[str]

class DoctorDossier(BaseModel):
    session_id: str
    created_at: str
    executive_summary: ExecutiveSummary
    mental_status_exam: MentalStatusExam
    somatic_profile: SomaticProfile
    safety_and_risk: SafetyAndRisk
    affect_trajectory_summary: str
    attending_physician_consultation_angles: List[str]
    recommended_screening_instruments: List[str]

# ==========================================
# API & CHAT MODELS
# ==========================================

class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    timestamp: Optional[datetime] = None

class StartSessionRequest(BaseModel):
    patient_name: Optional[str] = None
    doctor_id: Optional[str] = "dr_default"

class StartSessionResponse(BaseModel):
    session_id: str
    greeting: str
    created_at: datetime

class SendMessageRequest(BaseModel):
    session_id: str
    message: str

class SendMessageResponse(BaseModel):
    reply: str
    narrative_richness: int
    session_action: str
    is_critical_alert: bool
    # Telemetry is hidden from patient UI but available to doctor
    telemetry: Optional[PassBTelemetry] = None
