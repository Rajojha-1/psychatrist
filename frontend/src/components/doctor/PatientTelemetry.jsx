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
        <p>Live psychiatric telemetry and clinical steering directives will display here.</p>
      </div>
    );
  }

  const tel = telemetry || session?.latest_telemetry;
  const patientName = session?.patient_name || tel?.patient_name || '—';
  const riskLevel = tel?.safety_and_risk?.level || session?.risk_level || '—';

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
                Battery: <strong>{tel?.domain_coverage?.completeness_score || session?.completeness_score || 0}%</strong>
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
                {tel.affect_and_tone.valence > 0 ? '+' : ''}
                {tel.affect_and_tone.valence.toFixed(2)}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Arousal / Agitation:</span>
              <span className="metric-value">
                {tel.affect_and_tone.arousal_agitation.toFixed(2)}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Cynicism / Masking:</span>
              <span className="metric-value">
                {(tel.affect_and_tone.masking_cynicism_level * 100).toFixed(0)}%
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Affect Stability:</span>
              <span className="metric-value" style={{ fontSize: '0.8rem' }}>
                {tel.affect_and_tone.affect_stability || 'Congruent'}
              </span>
            </div>
          </div>

          {/* 2. Safety & Triage Screener */}
          <div className="telemetry-card">
            <div className="card-header">
              <ShieldAlert size={16} color="var(--accent-red)" />
              <h4>Triage & Crisis Safety</h4>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Triage Category:</span>
              <StatusBadge level={tel.safety_and_risk.level} />
            </div>
            {tel.safety_and_risk.risk_markers?.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <span className="metric-name" style={{ display: 'block', marginBottom: '4px' }}>Risk Factors:</span>
                <div className="badge-wrap">
                  {tel.safety_and_risk.risk_markers.map((m, idx) => (
                    <span key={idx} className="risk-chip">{m}</span>
                  ))}
                </div>
              </div>
            )}
            {tel.safety_and_risk.verbatim_evidence?.length > 0 && (
              <div className="verbatim-quote-box">
                <em>"{tel.safety_and_risk.verbatim_evidence.join(', ')}"</em>
              </div>
            )}
          </div>

          {/* 3. Somatic & Neurovegetative Correlates */}
          <div className="telemetry-card">
            <div className="card-header">
              <Moon size={16} color="var(--accent-purple)" />
              <h4>Somatic & Sleep Architecture</h4>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Sleep Architecture:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.somatic_indicators.sleep_status}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Physical Fatigue:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.somatic_indicators.energy_and_fatigue}
              </span>
            </div>
            <div className="metric-metric-row">
              <span className="metric-name">Cognitive Distortions:</span>
              <span className="metric-value" style={{ fontSize: '0.82rem' }}>
                {tel.cognitive_distortions?.length > 0 ? tel.cognitive_distortions.join(', ') : 'None detected'}
              </span>
            </div>
          </div>

          {/* 4. Secret Steering Directive */}
          <div className="telemetry-card directive-card">
            <div className="card-header">
              <Compass size={16} color="var(--accent-teal)" />
              <h4>Pass B Steering Directive (AI Guide)</h4>
            </div>
            <div className="steering-directive-text">
              {tel.steering_directive}
            </div>
            <div className="directive-sub">
              Next Clinical Target: <strong>{tel.domain_coverage.next_domain_to_explore}</strong>
            </div>
          </div>

          {/* 5. 9-Domain Battery Full Breakdown */}
          <div className="telemetry-card full-width-card">
            <div className="card-header">
              <Brain size={16} color="var(--accent-teal)" />
              <h4>9-Domain Psychiatric Battery Progress ({tel.domain_coverage.completeness_score}%)</h4>
            </div>
            <div className="domains-grid">
              {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
                const covered = tel.domain_coverage[key] === true;
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
