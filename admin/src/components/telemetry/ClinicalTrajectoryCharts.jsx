import React, { useState } from 'react';
import {
  Activity,
  TrendingDown,
  TrendingUp,
  Compass,
  AlertTriangle,
  Shield,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

export default function ClinicalTrajectoryCharts({
  telemetryHistory = [],
  currentTelemetry = {},
  session = {}
}) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [activeMetric, setActiveMetric] = useState('all'); // 'all' | 'valence' | 'arousal' | 'selfFocus'

  // Build clean history array (fallback to current telemetry if history is single)
  const history = (telemetryHistory && telemetryHistory.length > 0)
    ? telemetryHistory
    : (currentTelemetry && currentTelemetry.affect_and_tone ? [currentTelemetry] : []);

  if (history.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-6 border border-white/10 text-center py-10">
        <Activity size={28} className="mx-auto text-teal-400/40 mb-2.5 animate-pulse" />
        <h4 className="text-xs font-bold text-slate-300">Awaiting Clinical Trajectory Data</h4>
        <p className="text-[11px] text-slate-500 max-w-sm mx-auto mt-1">
          Turn-by-turn psychometric graphs will render here as the patient interacts with the waiting room companion.
        </p>
      </div>
    );
  }

  // --- CHART 1: RUSSELL'S CIRCUMPLEX (Valence vs Arousal) ---
  const width = 360;
  const height = 260;
  const pad = 36;
  const plotW = width - pad * 2;
  const plotH = height - pad * 2;

  // Convert (valence: -1 to +1, arousal: 0 to 1) to SVG coordinates
  const toCircumplexCoords = (val, aro) => {
    const v = Math.max(-1, Math.min(1, typeof val === 'number' ? val : 0));
    const a = Math.max(0, Math.min(1, typeof aro === 'number' ? aro : 0.5));
    const x = pad + ((v + 1) / 2) * plotW;
    const y = pad + (1 - a) * plotH; // 1 is top, 0 is bottom
    return { x, y };
  };

  const points = history.map((t, i) => {
    const affect = t.affect_and_tone || {};
    const coords = toCircumplexCoords(affect.valence ?? 0, affect.arousal_agitation ?? 0.5);
    const risk = t.safety_and_risk?.level || 'GREEN';
    return {
      ...coords,
      turn: i + 1,
      valence: affect.valence ?? 0,
      arousal: affect.arousal_agitation ?? 0.5,
      tone: affect.primary_tone || 'Observed',
      risk,
      cynicism: affect.masking_cynicism_level ?? 0,
      activeThread: t.active_emotional_thread || ''
    };
  });

  // Build path connecting turns
  const trajectoryPath = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // --- CHART 2: MULTI-STREAM TIMELINE ---
  const tWidth = 540;
  const tHeight = 170;
  const tPadX = 36;
  const tPadY = 24;
  const tPlotW = tWidth - tPadX * 2;
  const tPlotH = tHeight - tPadY * 2;

  const numTurns = points.length;
  const getTimelineX = (idx) => {
    if (numTurns <= 1) return tPadX + tPlotW / 2;
    return tPadX + (idx / (numTurns - 1)) * tPlotW;
  };

  // Build paths for timeline metrics
  const valencePath = points.map((p, i) => {
    const x = getTimelineX(i);
    // Valence (-1 to +1) mapped to plot height (0 to tPlotH)
    const norm = (p.valence + 1) / 2;
    const y = tPadY + (1 - norm) * tPlotH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const arousalPath = points.map((p, i) => {
    const x = getTimelineX(i);
    const norm = Math.max(0, Math.min(1, p.arousal));
    const y = tPadY + (1 - norm) * tPlotH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const selfFocusPath = history.map((t, i) => {
    const x = getTimelineX(i);
    const ratio = t.linguistic_analysis?.pronoun_density_self_focus ?? 0.3;
    const norm = Math.max(0, Math.min(1, ratio));
    const y = tPadY + (1 - norm) * tPlotH;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // 4 Ps Balance Analysis
  const insight = currentTelemetry.insight_map || {};
  const hasPrecipitating = !!(insight.precipitating_factors && !insight.precipitating_factors.includes('Not yet'));
  const hasPerpetuating = !!(insight.perpetuating_factors && !insight.perpetuating_factors.includes('Not yet'));
  const hasPredisposing = !!(insight.predisposing_factors && !insight.predisposing_factors.includes('Not yet'));
  const hasProtective = !!(insight.protective_factors && !insight.protective_factors.includes('Not yet'));

  const stressorScore = (hasPrecipitating ? 35 : 10) + (hasPerpetuating ? 40 : 10) + (hasPredisposing ? 25 : 5);
  const protectiveScore = hasProtective ? 60 : 15;
  const isDecompensating = stressorScore > protectiveScore + 25;

  return (
    <div className="space-y-6">
      {/* Header Badge */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Compass size={15} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-100 uppercase tracking-wider">
              Diagnostic Psychometrics & Affective Trajectory
            </h3>
            <p className="text-[10px] text-slate-400">
              Russell's Circumplex Model & Turn-by-Turn Computational Psychiatry Metrics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800/80 border border-white/10 text-teal-300">
            {points.length} Evaluated Turns
          </span>
        </div>
      </div>

      {/* Main Dual Grid: Circumplex (Left) + Timeline & Balance (Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* 1. RUSSELL'S CIRCUMPLEX 2D TRAJECTORY */}
        <div className="xl:col-span-5 glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                Affective Circumplex
                <span className="text-[10px] font-normal text-slate-500">(Valence vs. Arousal)</span>
              </h4>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Trace of patient's emotional trajectory across session
              </p>
            </div>
            {points.length > 0 && (
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                points[points.length - 1].valence < -0.4
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
              }`}>
                Current: {points[points.length - 1].tone}
              </span>
            )}
          </div>

          {/* Circumplex SVG Plot */}
          <div className="relative flex justify-center py-2">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full max-w-[360px] h-auto overflow-visible select-none"
            >
              <defs>
                {/* Background Quadrant Gradients */}
                <radialGradient id="highAgitationGlow" cx="0%" cy="0%" r="80%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="lowAgitationGlow" cx="0%" cy="100%" r="80%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="euthymicGlow" cx="100%" cy="100%" r="80%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>

                {/* Trajectory Stroke Gradient */}
                <linearGradient id="trajectoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="70%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>

              {/* Axis Rect Background with subtle glows */}
              <rect x={pad} y={pad} width={plotW} height={plotH} rx={12} fill="#070c14" stroke="rgba(255,255,255,0.07)" />
              <rect x={pad} y={pad} width={plotW / 2} height={plotH / 2} fill="url(#highAgitationGlow)" rx={12} />
              <rect x={pad} y={pad + plotH / 2} width={plotW / 2} height={plotH / 2} fill="url(#lowAgitationGlow)" rx={12} />
              <rect x={pad + plotW / 2} y={pad + plotH / 2} width={plotW / 2} height={plotH / 2} fill="url(#euthymicGlow)" rx={12} />

              {/* Center Crosshair Axes */}
              <line
                x1={pad + plotW / 2}
                y1={pad}
                x2={pad + plotW / 2}
                y2={pad + plotH}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="3 3"
              />
              <line
                x1={pad}
                y1={pad + plotH / 2}
                x2={pad + plotW}
                y2={pad + plotH / 2}
                stroke="rgba(255,255,255,0.12)"
                strokeDasharray="3 3"
              />

              {/* Quadrant Clinical Descriptions */}
              <text x={pad + 8} y={pad + 16} fill="rgba(244,63,94,0.6)" fontSize="8" fontWeight="600">
                PANIC / DISTRESS
              </text>
              <text x={pad + plotW - 8} y={pad + 16} textAnchor="end" fill="rgba(45,212,191,0.5)" fontSize="8" fontWeight="600">
                EUPHORIA / ACTIVATION
              </text>
              <text x={pad + 8} y={pad + plotH - 8} fill="rgba(167,139,250,0.6)" fontSize="8" fontWeight="600">
                DEPRESSED BLUNTING
              </text>
              <text x={pad + plotW - 8} y={pad + plotH - 8} textAnchor="end" fill="rgba(56,189,248,0.5)" fontSize="8" fontWeight="600">
                CALM / EUTHYMIC
              </text>

              {/* Axis Direction Labels */}
              <text x={pad + plotW / 2} y={pad - 10} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">
                + High Arousal (Agitation)
              </text>
              <text x={pad + plotW / 2} y={pad + plotH + 18} textAnchor="middle" fill="#64748b" fontSize="9">
                - Low Arousal (Lethargy)
              </text>
              <text x={pad - 8} y={pad + plotH / 2} textAnchor="end" dominantBaseline="middle" fill="#f43f5e" fontSize="9" fontWeight="bold">
                - Distress
              </text>
              <text x={pad + plotW + 8} y={pad + plotH / 2} dominantBaseline="middle" fill="#2dd4bf" fontSize="9" fontWeight="bold">
                + Content
              </text>

              {/* Trajectory Path Line */}
              {trajectoryPath && (
                <path
                  d={trajectoryPath}
                  fill="none"
                  stroke="url(#trajectoryGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-500"
                />
              )}

              {/* Turn Marker Points */}
              {points.map((pt, idx) => {
                const isLatest = idx === points.length - 1;
                const isFirst = idx === 0;
                const ptColor = pt.risk === 'RED_CRITICAL' || pt.risk === 'RED'
                  ? '#f43f5e'
                  : pt.valence < -0.3
                  ? '#fb7185'
                  : '#2dd4bf';

                return (
                  <g
                    key={idx}
                    className="cursor-pointer transition-transform hover:scale-125"
                    onMouseEnter={() => setActiveTooltip(pt)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Pulsing ring on latest turn */}
                    {isLatest && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="11"
                        fill="none"
                        stroke={ptColor}
                        strokeWidth="1.5"
                        className="animate-ping opacity-60"
                      />
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isLatest ? 7 : isFirst ? 5 : 4}
                      fill={isLatest ? ptColor : '#0f172a'}
                      stroke={ptColor}
                      strokeWidth={isLatest ? 2.5 : 2}
                    />
                    <text
                      x={pt.x}
                      y={pt.y - 8}
                      textAnchor="middle"
                      fill={isLatest ? '#f8fafc' : '#94a3b8'}
                      fontSize={isLatest ? '9' : '8'}
                      fontWeight="bold"
                    >
                      T{pt.turn}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay */}
            {activeTooltip && (
              <div
                className="absolute z-20 pointer-events-none p-2.5 rounded-xl bg-slate-900/95 border border-white/20 shadow-xl text-left text-xs"
                style={{
                  top: '12px',
                  right: '12px',
                  minWidth: '170px'
                }}
              >
                <div className="font-bold text-teal-300 flex justify-between items-center border-b border-white/10 pb-1 mb-1.5">
                  <span>Turn {activeTooltip.turn}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                    activeTooltip.risk.includes('RED') ? 'bg-rose-500/30 text-rose-300' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {activeTooltip.risk}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <div>Affect: <strong>{activeTooltip.tone}</strong></div>
                  <div>Valence: <strong>{activeTooltip.valence > 0 ? '+' : ''}{activeTooltip.valence.toFixed(2)}</strong></div>
                  <div>Arousal: <strong>{(activeTooltip.arousal * 100).toFixed(0)}%</strong></div>
                  {activeTooltip.activeThread && (
                    <div className="text-[10px] text-slate-400 mt-1 italic line-clamp-2">
                      "{activeTooltip.activeThread}"
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-2 border-t border-white/5">
            <span>● T1: Intake Start</span>
            <span className="text-teal-400 font-medium">● Latest: T{points.length} ({points[points.length - 1].tone})</span>
          </div>
        </div>

        {/* 2. MULTI-STREAM TIMELINE + 4 Ps FORMULATION BALANCE */}
        <div className="xl:col-span-7 space-y-6">
          {/* Multi-Stream Affect Timeline */}
          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-200">Turn-by-Turn Dynamic Telemetry</h4>
                <p className="text-[10px] text-slate-400">Valence, Agitation, & Linguistic Self-Focus trajectory</p>
              </div>

              {/* Metric filter pills */}
              <div className="flex gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-white/5 text-[10px]">
                <button
                  onClick={() => setActiveMetric('all')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${activeMetric === 'all' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveMetric('valence')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${activeMetric === 'valence' ? 'bg-teal-500/20 text-teal-300' : 'text-slate-400'}`}
                >
                  Valence
                </button>
                <button
                  onClick={() => setActiveMetric('arousal')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${activeMetric === 'arousal' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400'}`}
                >
                  Agitation
                </button>
                <button
                  onClick={() => setActiveMetric('selfFocus')}
                  className={`px-2 py-0.5 rounded-md font-medium transition ${activeMetric === 'selfFocus' ? 'bg-purple-500/20 text-purple-300' : 'text-slate-400'}`}
                >
                  Self-Focus
                </button>
              </div>
            </div>

            {/* Timeline SVG */}
            <div className="py-1">
              <svg viewBox={`0 0 ${tWidth} ${tHeight}`} className="w-full h-auto overflow-visible select-none">
                {/* Horizontal Reference Gridlines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = tPadY + ratio * tPlotH;
                  return (
                    <line
                      key={idx}
                      x1={tPadX}
                      y1={y}
                      x2={tPadX + tPlotW}
                      y2={y}
                      stroke="rgba(255,255,255,0.06)"
                      strokeDasharray={ratio === 0.5 ? '2 2' : 'none'}
                    />
                  );
                })}

                {/* Stream 1: Valence (Teal) */}
                {(activeMetric === 'all' || activeMetric === 'valence') && (
                  <path
                    d={valencePath}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                )}

                {/* Stream 2: Agitation / Arousal (Amber) */}
                {(activeMetric === 'all' || activeMetric === 'arousal') && (
                  <path
                    d={arousalPath}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                    strokeDasharray="4 2"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                )}

                {/* Stream 3: Self-Focus / Rumination (Purple) */}
                {(activeMetric === 'all' || activeMetric === 'selfFocus') && (
                  <path
                    d={selfFocusPath}
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                  />
                )}

                {/* Turn Points along timeline */}
                {points.map((pt, i) => {
                  const x = getTimelineX(i);
                  const isLatest = i === points.length - 1;
                  return (
                    <g key={i} className="cursor-pointer" onClick={() => setActiveTooltip(pt)}>
                      <line x1={x} y1={tPadY} x2={x} y2={tPadY + tPlotH} stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                      <circle cx={x} cy={tPadY + tPlotH} r="2" fill="#64748b" />
                      <text x={x} y={tPadY + tPlotH + 14} textAnchor="middle" fill={isLatest ? '#2dd4bf' : '#64748b'} fontSize="8" fontWeight={isLatest ? 'bold' : 'normal'}>
                        T{pt.turn}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Timeline Legend */}
            <div className="flex flex-wrap items-center justify-between text-[11px] pt-3 border-t border-white/5 text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
                  <span className="text-slate-300 font-medium">Emotional Valence</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-1 bg-amber-400 inline-block" />
                  <span className="text-slate-300 font-medium">Arousal / Agitation</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block" />
                  <span className="text-slate-300 font-medium">Self-Focus Pronouns</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-500 italic">Click turn to inspect</span>
            </div>
          </div>

          {/* 3. 4 Ps BIOPSYCHOSOCIAL STRESS vs ANCHOR BALANCE */}
          <div className="glass-card rounded-2xl p-5 border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-teal-400" />
                <h4 className="text-xs font-bold text-slate-200">
                  4 Ps Biopsychosocial Formulation Equilibrium
                </h4>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isDecompensating
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}>
                {isDecompensating ? 'Decompensation Risk: High' : 'Psychosocial Buffers: Maintained'}
              </span>
            </div>

            {/* Balance Bar Visualization */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-rose-300 font-medium flex items-center gap-1">
                    <TrendingDown size={13} /> Active Stressor Load (Precipitating + Perpetuating)
                  </span>
                  <span className="font-bold text-rose-300">{stressorScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-700"
                    style={{ width: `${Math.min(100, stressorScore)}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1.5">
                  <span className="text-teal-300 font-medium flex items-center gap-1">
                    <Shield size={13} /> Protective Anchors & External Support
                  </span>
                  <span className="font-bold text-teal-300">{protectiveScore}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-700"
                    style={{ width: `${Math.min(100, protectiveScore)}%` }}
                  />
                </div>
              </div>

              <p className="text-[10px] text-slate-400 pt-1 leading-relaxed">
                {isDecompensating
                  ? '⚠️ Clinical Warning: Current environmental stressors and workplace/social strain heavily outweigh identified protective anchors. Prioritize safety and immediate grounding during consultation.'
                  : '✓ Patient demonstrates intact help-seeking motivation and reflective capacity to anchor therapeutic exploration.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
