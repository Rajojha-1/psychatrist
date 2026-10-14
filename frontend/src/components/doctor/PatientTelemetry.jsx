import React from 'react';
import {
  Brain,
  ShieldAlert,
  Moon,
  Activity,
  Compass,
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

const DOMAIN_LABELS = {
  patient_identity: 'Patient Identity & Rapport',
  chief_stressor_context: 'Chief Stressor Context',
  workplace_or_environment: 'Work / Environmental Stressors',
  sleep_architecture: 'Sleep Architecture & Insomnia',
  somatic_physical_exhaustion: 'Somatic & Physical Fatigue',
  cognitive_distortions_and_loops: 'Cognitive Distortions & Loops',
  anhedonia_and_emotional_range: 'Anhedonia & Emotional Blunting',
  social_support_vs_isolation: 'Social Support vs. Isolation',
  coping_mechanisms_and_escapes: 'Coping Mechanisms & Escapes'
};

const INSIGHT_LABELS = {
  precipitating_factors: 'Precipitating Factors (Why Now?)',
  perpetuating_factors: 'Perpetuating Factors (What Keeps It Going)',
  predisposing_factors: 'Predisposing Factors (Background Vulnerabilities)',
  protective_factors: 'Protective Factors (Strengths & Anchors)',
  sleep_and_energy: 'Sleep & Energy',
  somatic_complaints: 'Somatic Complaints',
  social_world: 'Social World & Support',
  emotional_landscape: 'Emotional Landscape',
  coping_and_escapes: 'Coping & Escapes'
};

const MODE_LABELS = {
  FOLLOW_THREAD: { title: 'Following Emotional Thread', desc: 'Companion is naturally reacting to patient narrative without steering.' },
  GENTLE_BRIDGE: { title: 'Gentle Bridge', desc: 'Natural conversational pause; companion softly bridges to unexplored ground.' },
  HOLD_SPACE: { title: 'Holding Space', desc: 'Patient in vulnerable moment; companion is offering human presence and support.' }
};

export default function PatientTelemetry({
  session,
  telemetry,
  onGenerateDossier,
  loadingDossier
}) {
  if (!session && !telemetry) {
    return (
      <div className="telemetry-empty-state">
        <Brain size={48} style={{ opacity: 0.3, marginBottom: '14px' }} />
        <h3>Select a Patient from the Waiting Queue</h3>
        <p>Live psychiatric telemetry and clinical insights will display here.</p>
      </div>
    );
  }

  const tel = telemetry || session?.latest_telemetry;
  const patientName = session?.patient_name || tel?.patient_name || '—';
  const riskLevel = tel?.safety_and_risk?.level || session?.risk_level || '—';
  const richness = tel?.narrative_richness ?? tel?.domain_coverage?.completeness_score ?? session?.narrative_richness ?? session?.completeness_score ?? 0;
  const isInsightMap = !!tel?.insight_map;

  return (
    <div className="telemetry-dashboard">
      {/* Patient Header Banner */}
      <header className="telemetry-header">
        <div className="telemetry-patient-meta">
          <div className="telemetry-avatar">
            {patientName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="telemetry-patient-title">
              {patientName}
              <span className="session-tag">Session #{session?.session_id}</span>
            </h2>
            <div className="telemetry-status-row">
              <StatusBadge level={riskLevel} />
              <span className="status-divider">•</span>
              <span className="telemetry-tone">
                Primary Affect: <strong>{tel?.affect_and_tone?.primary_tone || '—'}</strong>
              </span>
              <span className="status-divider">•</span>
              <span className="telemetry-comp">
                {isInsightMap ? 'Richness' : 'Battery'}: <strong>{richness}%</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="telemetry-header-actions">
          <button
            className="generate-dossier-primary-btn"
            onClick={onGenerateDossier}
            disabled={loadingDossier}
          >
            <FileText size={16} />
            <span>{loadingDossier ? 'Synthesizing...' : 'Generate Full Dossier'}</span>
          </button>
        </div>
      </header>

      {tel ? (
        <div className="telemetry-grid">
          {/* 1. Affect & Agitation Correlates */}
          <div className="telemetry-card">
            <div className="card-header">
              <Activity size={16} color="var(--accent-blue)" />
              <h4>Affective Valence & Agitation</h4>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Emotional Valence:</span>
              <span className="metric-value">
                {(tel.affect_and_tone?.valence || 0) > 0 ? '+' : ''}
                {(tel.affect_and_tone?.valence || 0).toFixed(2)}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Arousal / Agitation:</span>
              <span className="metric-value">
                {(tel.affect_and_tone?.arousal_agitation || 0).toFixed(2)}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Cynicism / Masking:</span>
              <span className="metric-value">
                {((tel.affect_and_tone?.masking_cynicism_level || 0) * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          {/* 2. Safety & Risk Signals */}
          <div className="telemetry-card">
            <div className="card-header">
              <ShieldAlert size={16} color="var(--accent-crimson)" />
              <h4>Safety & Critical Risk Signals</h4>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Self-Harm / Suicidal Risk:</span>
              <span className="metric-value">
                {tel.safety_and_risk?.self_harm_risk_signals ? (
                  <span style={{ color: 'var(--accent-crimson)', fontWeight: 600 }}>FLAGGED</span>
                ) : (
                  'Clear'
                )}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Psychosis / Reality Testing:</span>
              <span className="metric-value">
                {tel.safety_and_risk?.hallucination_or_delusion_cues ? (
                  <span style={{ color: 'var(--accent-amber)', fontWeight: 600 }}>FLAGGED</span>
                ) : (
                  'Clear'
                )}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Agitation Escalation:</span>
              <span className="metric-value">
                {tel.safety_and_risk?.escalation_warning ? 'Escalating' : 'Stable'}
              </span>
            </div>
          </div>

          {/* 3. Sleep & Somatic Profiles */}
          <div className="telemetry-card">
            <div className="card-header">
              <Moon size={16} color="var(--accent-purple)" />
              <h4>Somatic & Neurovegetative Markers</h4>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Sleep Architecture:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.somatic_indicators?.sleep_disturbances || 'No signs noted'}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Physical Fatigue:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.somatic_indicators?.energy_and_fatigue || 'Normal'}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Cognitive Distortions:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.cognitive_distortions?.length > 0 ? tel.cognitive_distortions.join(', ') : 'None detected'}
              </span>
            </div>
          </div>

          {/* 4. Conversation Mode / Steering Directive */}
          <div className="telemetry-card directive-card">
            <div className="card-header">
              <Compass size={16} color="var(--accent-teal)" />
              <h4>{tel.conversation_mode ? 'Pass B Observational Mode' : 'Pass B Steering Directive'}</h4>
            </div>
            <div className="steering-directive-text">
              {tel.conversation_mode ? (
                <>
                  <strong style={{ color: 'var(--accent-teal)' }}>
                    {MODE_LABELS[tel.conversation_mode]?.title || tel.conversation_mode}
                  </strong>
                  <p style={{ marginTop: '6px', fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
                    {MODE_LABELS[tel.conversation_mode]?.desc || ''}
                  </p>
                  {tel.active_emotional_thread && (
                    <div style={{ marginTop: '8px', fontSize: '0.82rem' }}>
                      Active Thread: <em>"{tel.active_emotional_thread}"</em>
                    </div>
                  )}
                </>
              ) : (
                tel.steering_directive || 'Observing conversation flow...'
              )}
            </div>
            {tel.domain_coverage?.next_domain_to_explore && (
              <div className="directive-sub">
                Next Clinical Target: <strong>{tel.domain_coverage.next_domain_to_explore}</strong>
              </div>
            )}
          </div>

          {/* 5. Clinical Insights or 9-Domain Battery */}
          <div className="telemetry-card full-width-card">
            <div className="card-header">
              <Brain size={16} color="var(--accent-teal)" />
              <h4>
                {isInsightMap
                  ? `Clinical Insight Map (${richness}%)`
                  : `9-Domain Psychiatric Battery Progress (${richness}%)`}
              </h4>
            </div>
            <div className="domains-grid">
              {isInsightMap
                ? Object.entries(INSIGHT_LABELS).map(([key, label]) => {
                    const insight = tel.insight_map?.[key];
                    const revealed = !!(insight && insight.trim() && insight !== 'Not yet surfaced' && insight !== 'None detected');
                    return (
                      <div
                        key={key}
                        className={`domain-chip ${revealed ? 'covered' : 'uncovered'}`}
                        title={insight || 'Not yet surfaced'}
                      >
                        {revealed ? (
                          <CheckCircle2 size={14} color="var(--accent-teal)" />
                        ) : (
                          <Circle size={14} style={{ opacity: 0.3 }} />
                        )}
                        <span>{label}</span>
                      </div>
                    );
                  })
                : Object.entries(DOMAIN_LABELS).map(([key, label]) => {
                    const covered = tel.domain_coverage?.[key] === true;
                    return (
                      <div key={key} className={`domain-chip ${covered ? 'covered' : 'uncovered'}`}>
                        {covered ? (
                          <CheckCircle2 size={14} color="var(--accent-teal)" />
                        ) : (
                          <Circle size={14} style={{ opacity: 0.3 }} />
                        )}
                        <span>{label}</span>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      ) : (
        <div className="telemetry-empty-state">
          <Brain size={36} style={{ opacity: 0.4, marginBottom: '10px' }} />
          <p>Awaiting patient's first conversational turn to synthesize clinical telemetry...</p>
        </div>
      )}
    </div>
  );
}
