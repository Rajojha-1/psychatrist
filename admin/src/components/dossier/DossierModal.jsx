import React, { useState } from 'react';
import { X, Printer, Copy, Check, ShieldAlert, FileText, Stethoscope, AlertTriangle, Activity, Brain } from 'lucide-react';

export default function DossierModal({ isOpen, onClose, dossierData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !dossierData) return null;

  const exec = dossierData.executive_summary || {};
  const mse = dossierData.mental_status_exam || dossierData.mental_status_examination || {};
  const risk = dossierData.safety_and_risk || dossierData.clinical_risk_assessment || {};
  const somatic = dossierData.somatic_profile || {};
  const patientName = exec.patient_name || dossierData.patient_name || 'Patient';
  const chiefComplaint = exec.clinical_synopsis || dossierData.chief_complaint || '—';
  const provisionalDiagnosis = exec.provisional_diagnostic_impression || dossierData.provisional_diagnosis || '—';
  const acuteSeverity = exec.acute_severity_status || risk.level || risk.risk_level || '—';
  const riskLevel = risk.level || risk.risk_level || acuteSeverity;
  const riskMarkers = risk.risk_markers || [];
  const verbatimEvidence = risk.verbatim_evidence || [];
  const consultationAngles = dossierData.attending_physician_consultation_angles || dossierData.recommended_immediate_interventions || [];
  const screeningInstruments = dossierData.recommended_screening_instruments || [];
  const cognitiveDistortions = mse.cognitive_distortions_detailed || [];

  const handleCopy = () => {
    try {
      const formatted = `
CONFIDENTIAL PSYCHIATRIC CLINICAL DOSSIER
========================================
Patient Name: ${patientName}
Session ID: ${dossierData.session_id || 'N/A'}
Generated: ${new Date().toLocaleString()}

1. EXECUTIVE SUMMARY & PROVISIONAL DIAGNOSIS
• Provisional Diagnosis: ${provisionalDiagnosis}
• Acute Severity: ${acuteSeverity}
• Clinical Synopsis: ${chiefComplaint}

2. MENTAL STATUS EXAMINATION (MSE)
• Appearance & Engagement: ${mse.appearance_and_engagement || mse.appearance_and_behavior || 'N/A'}
• Speech & Psychomotor: ${mse.speech_and_psychomotor || mse.speech_and_thought_process || 'N/A'}
• Mood (Subjective): ${mse.mood_subjective || 'N/A'}
• Affect (Objective): ${mse.affect_objective || mse.mood_and_affect || 'N/A'}
• Thought Process: ${mse.thought_process || 'N/A'}
• Thought Content: ${mse.thought_content || 'N/A'}
• Cognitive Distortions: ${cognitiveDistortions.join(', ') || 'None noted'}

3. SOMATIC PROFILE
• Sleep Architecture: ${somatic.sleep_architecture || 'N/A'}
• Energy & Neurovegetative: ${somatic.energy_and_neurovegetative || 'N/A'}
• Physical Symptoms: ${(somatic.somatic_complaints || []).join(', ') || 'None'}

4. CLINICAL RISK & SAFETY ASSESSMENT
• Risk Level: ${riskLevel}
• Risk Markers: ${riskMarkers.join(', ') || 'None reported'}
• Verbatim Evidence: ${verbatimEvidence.map(e => `"${e}"`).join('; ')}

5. ATTENDING PHYSICIAN CONSULTATION ANGLES
${consultationAngles.map(a => `• ${a}`).join('\n')}

6. RECOMMENDED SCREENING INSTRUMENTS
${screeningInstruments.join(', ')}
      `.trim();

      navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn('Clipboard copy error:', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isCritical = riskLevel === 'RED_CRITICAL' || riskLevel === 'CRITICAL' || acuteSeverity.includes('Urgent');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#0c1421] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#111c2e] border-b border-white/10 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300">
              <Stethoscope size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-100 tracking-tight">
                  Confidential Psychiatric Intake Dossier
                </h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                  isCritical 
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                    : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
                }`}>
                  {isCritical ? 'CRITICAL / URGENT ATTENTION' : 'CONFIDENTIAL / CLINICAL EHR'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Patient: <span className="font-semibold text-slate-200">{patientName}</span> • ID: <span className="font-mono text-slate-300">{dossierData.session_id}</span>
                {exec.session_duration_minutes && <span> • Duration: {exec.session_duration_minutes}m</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy formatted text"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print Dossier"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 text-xs leading-relaxed">
          {/* Section 1: Executive Summary & Clinical Synopsis */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <FileText size={14} />
                <span>1. Executive Summary & Diagnostic Impression</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                isCritical
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : 'bg-teal-500/20 text-teal-300 border-teal-500/30'
              }`}>
                {acuteSeverity}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-[#0a121c] border border-white/5 space-y-2">
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Provisional Diagnostic Impression:</span>
                <span className="text-sm font-bold text-teal-200">{provisionalDiagnosis}</span>
              </div>
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-0.5">Clinical Synopsis:</span>
                <p className="text-slate-300 leading-relaxed font-normal">{chiefComplaint}</p>
              </div>
            </div>
          </div>

          {/* Section 2: Clinical Risk & Safety Assessment */}
          <div className={`p-4 rounded-xl border space-y-3 ${
            isCritical 
              ? 'bg-rose-950/20 border-rose-500/30' 
              : 'bg-[#111c2e]/70 border-white/10'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={15} />
                <span>2. Clinical Safety & Risk Markers</span>
              </h3>
              <span className="font-bold px-2.5 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/40">
                {riskLevel}
              </span>
            </div>

            {riskMarkers.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {riskMarkers.map((marker, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
                    <AlertTriangle size={12} />
                    <span>{marker}</span>
                  </span>
                ))}
              </div>
            )}

            {verbatimEvidence.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-semibold text-rose-300/80 block">Verbatim Patient Disclosures:</span>
                <div className="space-y-1">
                  {verbatimEvidence.map((quote, idx) => (
                    <blockquote key={idx} className="pl-3 py-1 border-l-2 border-rose-500 text-rose-200 italic font-medium bg-rose-500/5 rounded-r">
                      "{quote}"
                    </blockquote>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Mental Status Examination (MSE) */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Brain size={14} />
              <span>3. Mental Status Examination (MSE)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Appearance & Engagement
                </span>
                <p className="text-slate-200">{mse.appearance_and_engagement || mse.appearance_and_behavior || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Speech & Psychomotor
                </span>
                <p className="text-slate-200">{mse.speech_and_psychomotor || mse.speech_and_thought_process || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Mood (Subjective)
                </span>
                <p className="text-slate-200 font-medium italic">"{mse.mood_subjective || '—'}"</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Affect (Objective)
                </span>
                <p className="text-slate-200">{mse.affect_objective || mse.mood_and_affect || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Thought Process
                </span>
                <p className="text-slate-200">{mse.thought_process || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Thought Content & Themes
                </span>
                <p className="text-slate-200">{mse.thought_content || '—'}</p>
              </div>
            </div>

            {cognitiveDistortions.length > 0 && (
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1.5">Identified Cognitive Distortions:</span>
                <div className="flex flex-wrap gap-1.5">
                  {cognitiveDistortions.map((distortion, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 text-[11px] font-medium">
                      {distortion}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 4: Somatic & Neurovegetative Profile */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
              <Activity size={14} />
              <span>4. Somatic & Neurovegetative Profile</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Sleep Architecture:</span>
                <p className="text-slate-200">{somatic.sleep_architecture || '—'}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Energy & Exhaustion:</span>
                <p className="text-slate-200">{somatic.energy_and_neurovegetative || '—'}</p>
              </div>
            </div>
            {somatic.somatic_complaints && somatic.somatic_complaints.length > 0 && (
              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Reported Physical Sensations:</span>
                <div className="flex flex-wrap gap-2">
                  {somatic.somatic_complaints.map((comp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs">
                      {comp}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section 5: Consultation Angles for Doctor */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-2">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              5. Attending Physician Suggested Inquiries & Angles
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              {consultationAngles.map((angle, idx) => (
                <li key={idx} className="text-xs leading-relaxed pl-1">
                  {angle}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 6: Recommended Clinical Screening Instruments */}
          {screeningInstruments.length > 0 && (
            <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-2">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                6. Recommended Validated Screening Instruments
              </h3>
              <div className="flex flex-wrap gap-2">
                {screeningInstruments.map((instrument, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 text-xs font-bold">
                    {instrument}
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
