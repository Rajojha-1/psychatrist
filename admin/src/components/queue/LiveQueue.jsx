import React, { useState } from 'react';
import { Search, AlertTriangle, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function LiveQueue({
  queue,
  selectedSessionId,
  onSelectSession,
  loading
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);

  const filteredQueue = (queue || []).filter(item => {
    const matchesSearch =
      (item.patient_name || 'Anonymous').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.session_id || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterRiskOnly) {
      return matchesSearch && (item.is_critical_alert || item.risk_level === 'RED_CRITICAL');
    }
    return matchesSearch;
  });

  const criticalCount = (queue || []).filter(
    item => item.is_critical_alert || item.risk_level === 'RED_CRITICAL'
  ).length;

  return (
    <aside className="w-80 md:w-88 bg-[#0a111a] border-r border-white/[0.08] flex flex-col flex-shrink-0 h-full overflow-hidden">
      {/* Queue Header & Filters */}
      <div className="p-4 border-b border-white/[0.06] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-100 tracking-tight">Active Queue</h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
              {queue.length}
            </span>
          </div>

          {criticalCount > 0 && (
            <button
              onClick={() => setFilterRiskOnly(!filterRiskOnly)}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold transition-all ${
                filterRiskOnly
                  ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                  : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
              }`}
            >
              <AlertTriangle size={12} />
              <span>{criticalCount} Critical</span>
            </button>
          )}
        </div>

        {/* Search input */}
        <div className="relative flex items-center">
          <Search size={14} className="absolute left-3 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patient or ID..."
            className="w-full bg-[#111927] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
          />
        </div>
      </div>

      {/* Queue Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {filteredQueue.length === 0 ? (
          <div className="py-12 px-4 text-center">
            <Clock size={28} className="mx-auto text-slate-600 mb-2 opacity-60" />
            <p className="text-xs text-slate-400 font-medium">No active patients in queue</p>
            <p className="text-[11px] text-slate-600 mt-1">
              {searchTerm ? 'Try adjusting your search criteria' : 'Waiting room check-ins will appear here'}
            </p>
          </div>
        ) : (
          filteredQueue.map((item) => {
            const isSelected = item.session_id === selectedSessionId;
            const isCritical = item.is_critical_alert || item.risk_level === 'RED_CRITICAL';
            const isAmber = item.risk_level === 'AMBER';
            const score = item.narrative_richness || item.completeness_score || 0;

            return (
              <div
                key={item.session_id}
                onClick={() => onSelectSession(item.session_id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-[#132032] border-teal-500/60 shadow-[0_0_18px_rgba(20,184,166,0.2)]'
                    : 'bg-[#101824] hover:bg-[#141e2e] border-white/[0.06] hover:border-white/15'
                } ${isCritical ? 'border-rose-500/50 bg-rose-950/20' : ''}`}
              >
                {/* Top Row: Avatar, Name, Status Pill */}
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isCritical
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                          : isSelected
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                          : 'bg-slate-800 text-slate-300 border border-white/10'
                      }`}
                    >
                      {item.patient_name ? item.patient_name.charAt(0).toUpperCase() : '—'}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-100 truncate">
                        {item.patient_name || '—'}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono tracking-tight">
                        ID: {item.session_id}
                      </div>
                    </div>
                  </div>

                  {/* Risk Badge */}
                  <div>
                    {isCritical ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 glow-crimson animate-pulse">
                        CRITICAL
                      </span>
                    ) : isAmber ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 glow-amber">
                        MODERATE
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                        NORMAL
                      </span>
                    )}
                  </div>
                </div>

                {/* Completeness Battery Gauge */}
                <div className="space-y-1 mb-2.5">
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>Clinical Intake Coverage</span>
                    <span className="font-semibold text-slate-300">{score}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${score}%`,
                        background:
                          score >= 80
                            ? 'linear-gradient(90deg, #10b981, #34d399)'
                            : score >= 40
                            ? 'linear-gradient(90deg, #0ea5e9, #38bdf8)'
                            : 'linear-gradient(90deg, #6366f1, #818cf8)'
                      }}
                    />
                  </div>
                </div>

                {/* Card Footer: Total Messages & Primary Tone */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <MessageSquare size={11} className="text-slate-500" />
                    <span>{item.total_messages || 0} msgs</span>
                  </div>

                  <span className="truncate max-w-[120px] text-slate-400">
                    {item.primary_tone || '—'}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
