import React, { useState } from 'react';
import {
  FileText,
  ShieldAlert,
  HeartPulse,
  Compass,
  CheckCircle,
  Circle,
  MessageSquare,
  Sparkles,
  Clock,
  User,
  Activity,
  Layers
} from 'lucide-react';

const DOMAIN_LABELS = {
  patient_identity: 'Patient Identity & Demographics',
  chief_stressor_context: 'Chief Stressor Context',
  workplace_or_environment: 'Workplace & Environmental Load',
  sleep_architecture: 'Sleep Architecture & Insomnia',
  somatic_physical_exhaustion: 'Somatic & Physical Exhaustion',
  cognitive_distortions_and_loops: 'Cognitive Loops & Rumination',
  anhedonia_and_emotional_range: 'Anhedonia & Affective Flattening',
  social_support_vs_isolation: 'Social Support vs Isolation',
  coping_mechanisms_and_escapes: 'Coping Mechanisms & Escapes'
};

export default function TelemetryDashboard({
  session,
  telemetry,
  onGenerateDossier,
  loadingDossier
}) {
  const [activeView, setActiveView] = useState('telemetry'); // 'telemetry' | 'transcript'

  if (!session) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4 shadow-[0_0_24px_rgba(20,184,166,0.15)]">
          <Activity size={28} />
        </div>
        <h3 className="text-base font-bold text-slate-200">No Patient Session Selected</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1.5">
          Select an active intake session from the left queue to inspect live diagnostic telemetry and synthesize dossiers.
        </p>
      </div>
    );
  }

  // Prefer direct session telemetry if passed or session.latest_telemetry
  const tel = telemetry || session.latest_telemetry || {};
  const coverage = tel.domain_coverage || {};
  const safety = tel.safety_and_risk || {};
  const affect = tel.affect_and_tone || {};
  const cognitive = tel.cognitive_observations || {};
  const directive = tel.steering_directive || '—';
  const accumulatedDomains = session.accumulated_domains || {};

  const isCritical = safety.level === 'RED_CRITICAL' || session.is_critical_alert;
  const isAmber = safety.level === 'AMBER';
  const completenessScore = session.completeness_score || coverage.completeness_score || 0;
  const messages = session.messages || [];

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Top Patient Command Banner */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 relative overflow-hidden">
        {/* Ambient subtle glow inside card */}
        <div
          className="absolute -right-16 -top-16 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: isCritical
              ? 'radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
            filter: 'blur(50px)'
          }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          {/* Patient Meta */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent border border-teal-500/30 flex items-center justify-center font-bold text-xl text-teal-300 shadow-[0_0_16px_rgba(20,184,166,0.25)]">
              {session.patient_name ? session.patient_name.charAt(0).toUpperCase() : '—'}
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl font-bold text-slate-100">
                  {session.patient_name || '—'}
                </h1>
                <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-400 border border-white/10">
                  Session #{session.session_id}
                </span>
                {session.status === 'READY_FOR_REPORT' && (
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Ready For Dossier
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-slate-500" />
                  Started: {session.created_at ? new Date(session.created_at).toLocaleTimeString() : '—'}
                </span>
                {session.doctor_id && (
                  <>
                    <span>•</span>
                    <span>Doctor: {session.doctor_id}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Action: Generate Psychiatric Dossier */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGenerateDossier}
              disabled={loadingDossier}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_26px_rgba(20,184,166,0.6)] active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FileText size={15} />
              <span>{loadingDossier ? 'Synthesizing...' : 'Generate Psychiatric Dossier'}</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Telemetry vs Transcript) */}
        <div className="flex items-center gap-2 mt-6 pt-5 border-t border-white/5">
          <button
            onClick={() => setActiveView('telemetry')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'telemetry'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers size={13} />
            <span>Clinical Telemetry & MSE Grid</span>
          </button>

          <button
            onClick={() => setActiveView('transcript')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'transcript'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare size={13} />
            <span>Live Conversation Stream ({messages.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: Clinical Telemetry Grid */}
      {activeView === 'telemetry' ? (
        <div className="space-y-6">
          {/* 9-Domain Clinical Coverage Card */}
          <div className="glass-card rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass size={17} className="text-teal-400" />
                <h3 className="text-sm font-bold text-slate-100">
                  9 Core Psychiatric Diagnostic Domains
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Intake Monotonic Progress:</span>
                <span className="font-bold text-teal-300">{completenessScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {Object.entries(DOMAIN_LABELS).map(([key, label]) => {
                const isCovered =
                  coverage[key] === true || accumulatedDomains[key] === true;

                return (
                  <div
                    key={key}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 transition-all ${
                      isCovered
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200 shadow-[0_0_12px_rgba(16,185,129,0.12)]'
                        : 'bg-[#0f1724]/60 border-white/5 text-slate-500'
                    }`}
                  >
                    <span className="text-xs font-medium truncate">{label}</span>
                    {isCovered ? (
                      <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Circle size={15} className="text-slate-600 flex-shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lower Triad: Safety & Risk, Affect & Tone, Active AI Steering */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Safety & Risk Alert */}
            <div
              className={`glass-card rounded-2xl p-5 border ${
                isCritical
                  ? 'border-rose-500/50 bg-rose-950/20'
                  : isAmber
                  ? 'border-amber-500/40 bg-amber-950/15'
                  : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert
                    size={16}
                    className={
                      isCritical
                        ? 'text-rose-400 animate-pulse'
                        : isAmber
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }
                  />
                  <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                    Safety & Risk Triage
                  </h4>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isCritical
                      ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 glow-crimson'
                      : isAmber
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40 glow-amber'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}
                >
                  {safety.level || '—'}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Risk Severity</span>
                  <span className="font-semibold text-slate-200">{safety.level || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Immediate Harm Intent</span>
                  <span className="font-semibold text-slate-200">
                    {safety.explicit_suicidal_intent ? 'CONFIRMED' : 'Not Detected'}
                  </span>
                </div>

                {safety.verbatim_quotes && safety.verbatim_quotes.length > 0 && (
                  <div className="pt-2">
                    <span className="text-[11px] text-slate-400 font-medium block mb-1">
                      Flagged Verbatim Statements:
                    </span>
                    <div className="space-y-1">
                      {safety.verbatim_quotes.map((quote, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-rose-500/10 border-l-2 border-rose-500 text-[11px] text-rose-200 italic"
                        >
                          "{quote}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. Affect, Tone & Thought Cadence */}
            <div className="glass-card rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <HeartPulse size={16} className="text-cyan-400" />
                <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wide">
                  Affect & Cognitive State
                </h4>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Primary Tone</span>
                  <span className="font-semibold text-cyan-300">{affect.primary_tone || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Emotional Range</span>
                  <span className="font-semibold text-slate-200">{affect.emotional_range || '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Cognitive Loop</span>
                  <span className="font-semibold text-slate-200">
                    {cognitive.dominant_distortion || '—'}
                  </span>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] text-slate-400 font-medium block mb-1">
                    Affective Description:
                  </span>
                  <p className="text-[11px] text-slate-300 leading-relaxed bg-[#0b131f] p-2 rounded-lg border border-white/5">
                    {affect.notes || '—'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. AI Stealth Companion Directive */}
            <div className="glass-card rounded-2xl p-5 border border-teal-500/20 bg-teal-500/5">
              <div className="flex items-center gap-2 mb-3">
                <Compass size={16} className="text-teal-400" />
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wide">
                  Active Steering Directive (Pass B)
                </h4>
              </div>

              <div className="p-3 rounded-xl bg-[#09121d] border border-teal-500/30 text-xs text-teal-200 leading-relaxed font-mono mb-3">
                {directive}
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">
                This clinical prompt is passed autonomously into Pass A to steer conversation towards uncovered diagnostic domains without breaking therapeutic conversational rapport.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VIEW 2: Live Conversation Stream */
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <MessageSquare size={16} className="text-teal-400" />
              <span>Full Waiting Room Transcript</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              Total Messages: {messages.length}
            </span>
          </div>

          <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
            {messages.length === 0 ? (
              <p className="text-xs text-slate-500 text-center py-8">
                No chat messages recorded yet in this intake session.
              </p>
            ) : (
              messages.map((msg, i) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={i}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <span className="text-[11px] text-slate-500 font-medium mb-1 px-1">
                      {isUser ? session.patient_name || 'Patient' : 'AI Companion'}
                    </span>
                    <div
                      className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                        isUser
                          ? 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-medium rounded-tr-sm shadow-[0_2px_12px_rgba(20,184,166,0.25)]'
                          : 'bg-[#15202e] text-slate-200 border border-white/10 rounded-tl-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
