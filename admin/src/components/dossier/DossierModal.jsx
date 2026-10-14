import React, { useState } from 'react';
import { X, Printer, Copy, Check, ShieldAlert, FileText, Stethoscope } from 'lucide-react';

export default function DossierModal({ isOpen, onClose, dossierData }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !dossierData) return null;

  const handleCopy = () => {
    try {
      const formatted = `
CONFIDENTIAL PSYCHIATRIC INTAKE DOSSIER
========================================
Patient Name: ${dossierData.patient_name || 'N/A'}
Session ID: ${dossierData.session_id || 'N/A'}
Generated: ${new Date().toLocaleString()}

1. CHIEF COMPLAINT
${dossierData.chief_complaint || 'N/A'}

2. HISTORY OF PRESENT ILLNESS (HPI)
${dossierData.history_of_present_illness || 'N/A'}

3. MENTAL STATUS EXAMINATION (MSE)
- General Appearance & Behavior: ${dossierData.mental_status_examination?.appearance_and_behavior || 'N/A'}
- Speech & Thought Process: ${dossierData.mental_status_examination?.speech_and_thought_process || 'N/A'}
- Mood & Affect: ${dossierData.mental_status_examination?.mood_and_affect || 'N/A'}
- Cognition & Orientation: ${dossierData.mental_status_examination?.cognition_and_sensorium || 'N/A'}
- Insight & Judgment: ${dossierData.mental_status_examination?.insight_and_judgment || 'N/A'}

4. PRELIMINARY DIAGNOSTIC CONSIDERATIONS (DSM-5-TR)
${(dossierData.diagnostic_considerations_dsm5 || []).map(d => `• ${d.code}: ${d.disorder} (${d.rationale})`).join('\n')}

5. CLINICAL RISK ASSESSMENT
• Level: ${dossierData.clinical_risk_assessment?.risk_level || 'N/A'}
• Summary: ${dossierData.clinical_risk_assessment?.summary || 'N/A'}

6. RECOMMENDED CLINICAL INTERVENTIONS
${(dossierData.recommended_immediate_interventions || []).map(r => `• ${r}`).join('\n')}
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

  const mse = dossierData.mental_status_examination || {};
  const risk = dossierData.clinical_risk_assessment || {};
  const diagnoses = dossierData.diagnostic_considerations_dsm5 || [];
  const interventions = dossierData.recommended_immediate_interventions || [];

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
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 uppercase tracking-wider">
                  Confidential / Clinical EHR
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Patient: <span className="font-semibold text-slate-200">{dossierData.patient_name || 'Patient'}</span> • ID: <span className="font-mono text-slate-300">{dossierData.session_id}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-all"
              title="Copy formatted text"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1.5 transition-all"
              title="Print Dossier"
            >
              <Printer size={14} />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-200 text-xs leading-relaxed">
          {/* Section 1: Chief Complaint */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2 flex items-center gap-2">
              <FileText size={14} />
              <span>1. Chief Complaint</span>
            </h3>
            <p className="text-slate-300 leading-relaxed font-medium">
              {dossierData.chief_complaint || '—'}
            </p>
          </div>

          {/* Section 2: HPI */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
              2. History of Present Illness (HPI)
            </h3>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
              {dossierData.history_of_present_illness || '—'}
            </p>
          </div>

          {/* Section 3: Mental Status Examination (MSE) */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              3. Mental Status Examination (MSE)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Appearance & Behavior
                </span>
                <p className="text-slate-200">{mse.appearance_and_behavior || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Speech & Thought Process
                </span>
                <p className="text-slate-200">{mse.speech_and_thought_process || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Mood & Affect
                </span>
                <p className="text-slate-200">{mse.mood_and_affect || '—'}</p>
              </div>

              <div className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Insight & Judgment
                </span>
                <p className="text-slate-200">{mse.insight_and_judgment || '—'}</p>
              </div>
            </div>
          </div>

          {/* Section 4: DSM-5-TR Considerations */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10 space-y-2.5">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
              4. Preliminary Diagnostic Considerations (DSM-5-TR)
            </h3>
            {diagnoses.length === 0 ? (
              <p className="text-slate-400 italic">No preliminary criteria met.</p>
            ) : (
              <div className="space-y-2">
                {diagnoses.map((diag, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#0a121c] border border-white/5 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {diag.code || 'DSM-5'}
                      </span>
                      <span className="font-bold text-slate-100">{diag.disorder}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed pl-1">
                      {diag.rationale}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 5: Risk Assessment */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert size={15} />
                <span>5. Clinical Risk Assessment</span>
              </h3>
              <span className="font-bold px-2.5 py-0.5 rounded-full text-[10px] bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Level: {risk.risk_level || '—'}
              </span>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium">
              {risk.summary || '—'}
            </p>
          </div>

          {/* Section 6: Recommended Interventions */}
          <div className="p-4 rounded-xl bg-[#111c2e]/70 border border-white/10">
            <h3 className="text-xs font-bold text-teal-300 uppercase tracking-wider mb-2">
              6. Recommended Immediate Interventions & Consultation Strategy
            </h3>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              {interventions.map((item, idx) => (
                <li key={idx} className="text-xs leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
