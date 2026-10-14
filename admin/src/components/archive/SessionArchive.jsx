import React, { useState } from 'react';
import { Archive, Search, FileText, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SessionArchive({ sessions, onSelectSession, onGenerateDossier }) {
  const [search, setSearch] = useState('');

  const archivedSessions = (sessions || []).filter(s =>
    (s.patient_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.session_id || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Archive Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Archive size={18} className="text-teal-400" />
            <span>Patient Intake Session Archive</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Historical psychiatric intake transcripts, diagnostic telemetry records, and synthesized clinical dossiers.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search archive..."
            className="w-full bg-[#0a111a] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/60"
          />
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {archivedSessions.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 text-xs">
            <Archive size={32} className="mx-auto mb-2 opacity-50" />
            <p>No archived intake sessions found.</p>
          </div>
        ) : (
          archivedSessions.map((s) => {
            const isCritical = s.is_critical_alert || s.risk_level === 'RED_CRITICAL';
            return (
              <div
                key={s.session_id}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between gap-4 hover:border-teal-500/40 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center font-bold text-sm text-slate-200">
                        {s.patient_name ? s.patient_name.charAt(0).toUpperCase() : '—'}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100">{s.patient_name || '—'}</h4>
                        <span className="text-[10px] text-slate-500 font-mono">ID: {s.session_id}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : s.risk_level === 'AMBER'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {s.risk_level || '—'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between text-[11px]">
                      <span>Intake Completion:</span>
                      <span className="font-semibold text-teal-300">{s.completeness_score || 0}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full"
                        style={{ width: `${s.completeness_score || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                      <span>Status: {s.status || '—'}</span>
                      <span>Total msgs: {s.total_messages || 0}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                  <button
                    onClick={() => onSelectSession(s.session_id)}
                    className="flex-1 py-2 px-3 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    Inspect Telemetry
                  </button>

                  <button
                    onClick={() => {
                      onSelectSession(s.session_id);
                      onGenerateDossier();
                    }}
                    className="py-2 px-3 rounded-xl text-xs font-semibold text-teal-300 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 transition-all flex items-center gap-1.5"
                    title="View Synthesized Dossier"
                  >
                    <FileText size={14} />
                    <span>Dossier</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
