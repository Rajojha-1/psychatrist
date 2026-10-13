from typing import List, Optional, Literal
from pydantic import BaseModel, Field
from datetime import datetime

# ==========================================
# PASS B: CLINICAL EVALUATION TELEMETRY
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
        ..., description="Sleep assessment: e.g. 'Severe sleep-onset insomnia', 'Early morning waking', 'Disrupted / restless', 'Adequate', 'Not yet discussed'."
    )
    energy_and_fatigue: str = Field(
        ..., description="Physical energy level: e.g. 'Severe somatic exhaustion', 'Mild burnout', 'Normal', 'Unassessed'."
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

class DomainCoverage(BaseModel):
    patient_identity: bool = Field(..., description="True if patient's name or identity is known.")
    chief_stressor_context: bool = Field(..., description="True if core presenting trigger/stressor has surfaced.")
    workplace_or_environment: bool = Field(..., description="True if workplace/school/environmental conflict is discussed.")
    sleep_architecture: bool = Field(..., description="True if sleep quality, hours, wakefulness or nightmares are explored.")
    somatic_physical_exhaustion: bool = Field(..., description="True if physical fatigue, bodily aches, or appetite are explored.")
    cognitive_distortions_and_loops: bool = Field(..., description="True if internal self-talk, rumination, or catastrophic loops are mapped.")
    anhedonia_and_emotional_range: bool = Field(..., description="True if ability to enjoy things or numbness has been evaluated.")
    social_support_vs_isolation: bool = Field(..., description="True if presence of friends/family or feeling alone is known.")
    coping_mechanisms_and_escapes: bool = Field(..., description="True if how they handle stress (escapes, habits) is explored.")
    next_domain_to_explore: str = Field(..., description="The single highest-priority unexplored clinical domain to target next.")
    completeness_score: int = Field(
        ..., description="Overall diagnostic intake completeness percentage (0 to 100). Minimum 8-10 turns required to hit 80%."
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
    domain_coverage: DomainCoverage
    steering_directive: str = Field(
        ..., description="Secret operational directive for Pass A's next turn. Guides the conversational AI on what to explore next casually without revealing clinical intent."
    )
    session_action: Literal["CONTINUE", "INITIATE_WRAPUP", "EMERGENCY_DEESCALATE"] = Field(
        ..., description="Action recommendation: CONTINUE, INITIATE_WRAPUP (if completeness >= 80%), or EMERGENCY_DEESCALATE."
    )

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
    completeness_score: int
    session_action: str
    is_critical_alert: bool
    # Telemetry is hidden from patient UI but available to doctor
    telemetry: Optional[PassBTelemetry] = None
