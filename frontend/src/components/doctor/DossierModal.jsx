import React from 'react';
import { Stethoscope, Printer, X } from 'lucide-react';
import StatusBadge, { getRiskBadgeClass } from '../common/StatusBadge';

export default function DossierModal({
  isOpen,
  onClose,
  dossierData
}) {
  if (!isOpen || !dossierData) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="dossier-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="dossier-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Stethoscope size={20} color="var(--accent-blue)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              CONFIDENTIAL PSYCHIATRIC CLINICAL DOSSIER
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="hud-toggle-pill"
              onClick={() => window.print()}
              title="Print Dossier"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>
            <button onClick={onClose} aria-label="Close modal">
              <X size={20} color="var(--text-secondary)" />
            </button>
          </div>
        </div>

        <div className="dossier-modal-body">
          {/* 1. Executive Summary */}
          <div className="dossier-section">
            <div className="dossier-sec-title">1. Executive Summary & Diagnostic Impression</div>
            <p style={{ fontSize: '0.92rem', marginBottom: '8px' }}>
              <strong>Patient Name:</strong> {dossierData.executive_summary?.patient_name || 'Intake Patient'} &nbsp;•&nbsp;
              <strong>Session Turns:</strong> {dossierData.executive_summary?.total_turns || 0}
            </p>
            <p style={{ fontSize: '0.92rem', marginBottom: '8px' }}>
              <strong>Provisional Diagnosis:</strong> {dossierData.executive_summary?.provisional_diagnostic_impression}
            </p>
            <p style={{ fontSize: '0.92rem', marginBottom: '8px' }}>
              <strong>Acute Severity:</strong>{' '}
              <span className={`badge-risk ${getRiskBadgeClass(dossierData.executive_summary?.acute_severity_status)}`}>
                {dossierData.executive_summary?.acute_severity_status}
              </span>
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
              {dossierData.executive_summary?.clinical_synopsis}
            </p>
          </div>

          {/* 2. MSE Breakdown */}
          <div className="dossier-section">
            <div className="dossier-sec-title">2. Mental Status Examination (MSE)</div>
            <div className="mse-grid">
              <div><strong>Appearance & Engagement:</strong> {dossierData.mental_status_exam?.appearance_and_engagement}</div>
              <div><strong>Speech & Flow:</strong> {dossierData.mental_status_exam?.speech_and_psychomotor}</div>
              <div><strong>Subjective Mood:</strong> {dossierData.mental_status_exam?.mood_subjective}</div>
              <div><strong>Objective Affect:</strong> {dossierData.mental_status_exam?.affect_objective}</div>
              <div><strong>Thought Process:</strong> {dossierData.mental_status_exam?.thought_process}</div>
              <div><strong>Thought Content:</strong> {dossierData.mental_status_exam?.thought_content}</div>
            </div>
          </div>

          {/* 3. Somatic Profile */}
          {dossierData.somatic_profile && (
            <div className="dossier-section">
              <div className="dossier-sec-title">3. Somatic & Neurovegetative Profile</div>
              <div className="mse-grid">
                <div><strong>Sleep Architecture:</strong> {dossierData.somatic_profile.sleep_architecture}</div>
                <div><strong>Energy & Fatigue:</strong> {dossierData.somatic_profile.energy_and_neurovegetative}</div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <strong>Somatic Complaints:</strong>{' '}
                  {dossierData.somatic_profile.somatic_complaints?.length > 0
                    ? dossierData.somatic_profile.somatic_complaints.join(', ')
                    : 'None explicitly reported'}
                </div>
              </div>
            </div>
          )}

          {/* 4. Safety Screener */}
          {dossierData.safety_and_risk && (
            <div className="dossier-section">
              <div className="dossier-sec-title">4. Safety & Crisis Risk Screener</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.92rem' }}><strong>Risk Category:</strong></span>
                <StatusBadge level={dossierData.safety_and_risk.level} />
              </div>
              {dossierData.safety_and_risk.risk_markers?.length > 0 && (
                <p style={{ fontSize: '0.88rem', marginBottom: '6px' }}>
                  <strong>Risk Markers:</strong> {dossierData.safety_and_risk.risk_markers.join(', ')}
                </p>
              )}
              {dossierData.safety_and_risk.verbatim_evidence?.length > 0 && (
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  <strong>Verbatim Evidence:</strong> <em>"{dossierData.safety_and_risk.verbatim_evidence.join('; ')}"</em>
                </p>
              )}
            </div>
          )}

          {/* 5. Affect Trajectory */}
          {dossierData.affect_trajectory_summary && (
            <div className="dossier-section">
              <div className="dossier-sec-title">5. Affect Trajectory & Temporal Dynamics</div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {dossierData.affect_trajectory_summary}
              </p>
            </div>
          )}

          {/* 6. Consultation Talking Points */}
          <div className="dossier-section">
            <div className="dossier-sec-title">6. High-Yield Doctor Consultation Talking Points</div>
            <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#bae6fd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {dossierData.attending_physician_consultation_angles?.map((angle, idx) => (
                <li key={idx}>{angle}</li>
              ))}
            </ul>
          </div>

          {/* 7. Recommended Screening Instruments */}
          {dossierData.recommended_screening_instruments?.length > 0 && (
            <div className="dossier-section">
              <div className="dossier-sec-title">7. Recommended Clinical Screening Instruments</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                {dossierData.recommended_screening_instruments.map((inst, idx) => (
                  <span
                    key={idx}
                    style={{
                      background: 'rgba(56, 189, 248, 0.1)',
                      color: '#38bdf8',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      border: '1px solid rgba(56, 189, 248, 0.2)'
                    }}
                  >
                    {inst}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
