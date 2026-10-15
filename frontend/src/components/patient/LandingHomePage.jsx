import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  HeartPulse,
  Clock,
  Shield,
  Sparkles,
  AlertCircle,
  Phone,
  MessageSquare,
  Lock,
  Heart,
  Award,
  ChevronDown,
  EyeOff
} from 'lucide-react';

export default function LandingHomePage({ onCheckIn, loading, error }) {
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onCheckIn(name.trim());
  };

  const scrollToInput = () => {
    const el = document.getElementById('hero');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setTimeout(() => {
      inputRef.current?.focus();
    }, 400);
  };

  return (
    <div className="w-full bg-[#000000] text-zinc-100 font-sans selection:bg-white/20 selection:text-white select-none relative">
      
      {/* =========================================================================
          SCREEN 1: HERO SECTION (Waiting Lounge Console - Matching Picture 1)
          ========================================================================= */}
      <section
        id="hero"
        className="min-h-screen h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-8 py-6 overflow-hidden snap-start"
      >
        {/* Luminous Ethereal Auras: Deep Indigo/Violet (Left) & Warm Amber (Right) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-10%] sm:left-[2%] w-[480px] sm:w-[680px] h-[480px] sm:h-[620px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.48) 0%, rgba(124, 58, 237, 0.26) 42%, rgba(67, 56, 202, 0.08) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[2%] w-[460px] sm:w-[650px] h-[460px] sm:h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.40) 0%, rgba(234, 88, 12, 0.22) 42%, rgba(180, 83, 9, 0.06) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />

        {/* Top Navbar */}
        <header className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between pt-2">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,255,255,0.12)] group-hover:scale-105 transition-transform">
              <HeartPulse size={15} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Horizon
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">Lounge</a>
            <a href="#why" className="hover:text-white transition-colors">Why Horizon</a>
            <a href="#trajectory" className="hover:text-white transition-colors">Clinical Engine</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>

          {/* Top Right Action Button */}
          <button
            onClick={scrollToInput}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_22px_rgba(255,255,255,0.30)] cursor-pointer"
          >
            Enter Lounge
          </button>
        </header>

        {/* Hero Centerpiece: Headline & Floating Console Window */}
        <div className="relative z-10 w-full max-w-2xl mx-auto my-auto flex flex-col items-center text-center py-4">
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.14] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            A quieter way to wait for your psychiatrist.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-8">
            No 50-question clinical checklists. Chat naturally with Sophia, an empathetic waiting room peer, while your doctor prepares your care.
          </p>

          {/* Floating Dark Glass Console Window (Matching Picture 1 with Aura Glow) */}
          <div
            className="w-full max-w-lg rounded-2xl border border-white/[0.12] p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300 relative"
            style={{
              background: 'rgba(12, 13, 19, 0.82)',
              boxShadow: '0 0 60px -10px rgba(99, 102, 241, 0.22), 0 0 60px -10px rgba(245, 158, 11, 0.20), 0 35px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            {/* Top Window Control Dots */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-600/80" />
                <span className="w-2 h-2 rounded-full bg-zinc-600/80" />
                <span className="w-2 h-2 rounded-full bg-zinc-600/80" />
              </div>
              <div className="text-[11px] font-medium text-zinc-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span>Waiting Room Lounge • ~6 min wait</span>
              </div>
              <div className="w-8" />
            </div>

            {/* Glowing Neon Calming Breathing Waveform (Sky Blue -> Violet -> Pink -> Amber) */}
            <div className="py-5 flex items-center justify-center relative">
              <svg viewBox="0 0 400 64" className="w-full h-16 overflow-visible animate-wave-breathe">
                <defs>
                  <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="25%" stopColor="#818cf8" />
                    <stop offset="50%" stopColor="#c084fc" />
                    <stop offset="75%" stopColor="#f472b6" />
                    <stop offset="90%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                {/* Diffuse Ambient Glow Wave Stroke */}
                <path
                  d="M 10 32 C 70 32, 90 8, 140 18 C 180 26, 195 54, 230 40 C 265 26, 290 8, 330 24 C 360 36, 380 32, 390 32"
                  fill="none"
                  stroke="url(#heroWaveGrad)"
                  strokeWidth="8"
                  opacity="0.45"
                  strokeLinecap="round"
                  style={{ filter: 'blur(5px)' }}
                />
                {/* Sharp Glowing Wave Stroke */}
                <path
                  d="M 10 32 C 70 32, 90 8, 140 18 C 180 26, 195 54, 230 40 C 265 26, 290 8, 330 24 C 360 36, 380 32, 390 32"
                  fill="none"
                  stroke="url(#heroWaveGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(192, 132, 252, 0.9)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.6))'
                  }}
                />
              </svg>
            </div>

            {/* Check-In Pill Input & White Glow Button */}
            <form onSubmit={handleSubmit} className="w-full mt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 min-w-0 bg-[#14151e]/90 border border-white/15 rounded-full px-5 py-3.5 text-white text-sm placeholder-zinc-500 outline-none focus:border-white/40 focus:ring-2 focus:ring-white/10 transition-all shadow-inner"
                  placeholder="What can we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  autoFocus
                  maxLength={40}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all cursor-pointer bg-white text-black hover:bg-zinc-200 active:scale-[0.98] shadow-[0_0_26px_rgba(255,255,255,0.40)] hover:shadow-[0_0_36px_rgba(255,255,255,0.60)] disabled:opacity-50"
                  disabled={loading}
                >
                  <span>{loading ? 'Entering...' : 'Enter Lounge'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {error && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle size={13} />
                  <span>{error}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="relative z-10 flex flex-col items-center gap-1 text-[11px] text-zinc-500 pb-2">
          <span>Explore Platform</span>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </section>


      {/* =========================================================================
          SCREEN 2: CLINICAL TRAJECTORY DASHBOARD (Approved Option A)
          ========================================================================= */}
      <section
        id="trajectory"
        className="min-h-screen h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-8 py-8 border-t border-white/[0.05] overflow-hidden snap-start"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-10%] sm:left-[2%] w-[480px] sm:w-[680px] h-[480px] sm:h-[620px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.44) 0%, rgba(124, 58, 237, 0.24) 42%, rgba(67, 56, 202, 0.06) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[2%] w-[460px] sm:w-[650px] h-[460px] sm:h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.38) 0%, rgba(234, 88, 12, 0.20) 42%, rgba(180, 83, 9, 0.05) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Silent clinical intelligence. Zero interrogation.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            As you chat with Sophia, your emotional trajectory is mapped in real-time so your psychiatrist walks in with deep insight.
          </p>
        </div>

        {/* Main Dashboard Window (Matching Option A) */}
        <div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/[0.10] p-5 sm:p-7 backdrop-blur-2xl"
          style={{
            background: 'rgba(12, 13, 19, 0.88)',
            boxShadow: '0 0 60px -10px rgba(99, 102, 241, 0.20), 0 0 60px -10px rgba(245, 158, 11, 0.16), 0 35px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)'
          }}
        >
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px]">
                🌅
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Horizon Health</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/15 text-xs text-zinc-300">
              <span>🔍 Dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-xs">
              <span>🔔</span>
              <span>•••</span>
            </div>
          </div>

          {/* Top Half: Circumplex on Left, Metric Badges on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
            {/* Russell's Affective Circumplex (Col 8) */}
            <div className="md:col-span-8 rounded-xl border border-white/[0.08] bg-zinc-950/80 p-3.5 text-left relative overflow-hidden">
              {/* Quadrant Ambient Glow Fills (Matching Option A) */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-emerald-500/[0.14] blur-2xl pointer-events-none rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/[0.15] blur-2xl pointer-events-none rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/[0.12] blur-2xl pointer-events-none rounded-bl-xl" />

              <div className="flex items-center justify-between text-[11px] text-zinc-300 mb-1 relative z-10">
                <span className="font-semibold text-zinc-200">Valence</span>
                <span className="font-semibold text-zinc-200">Arousal - High</span>
                <span className="text-transparent">Placeholder</span>
              </div>

              {/* 2D Circumplex Plot SVG */}
              <div className="relative w-full aspect-[2.2/1] flex items-center justify-center z-10">
                <svg viewBox="0 0 460 200" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="circGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="40%" stopColor="#34d399" />
                      <stop offset="80%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Axes Crosshair */}
                  <line x1="230" y1="10" x2="230" y2="190" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                  <line x1="20" y1="100" x2="440" y2="100" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />

                  {/* Axis Text Labels */}
                  <text x="30" y="104" fill="#a1a1aa" fontSize="10">Pleasant ←</text>
                  <text x="430" y="104" textAnchor="end" fill="#a1a1aa" fontSize="10">→ Unpleasant</text>
                  <text x="230" y="196" textAnchor="middle" fill="#a1a1aa" fontSize="10">Arousal</text>

                  {/* Dynamic Trajectory Curve Diffuse Glow */}
                  <path
                    d="M 110 155 Q 170 115 215 88 T 320 58"
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth="7"
                    opacity="0.45"
                    strokeLinecap="round"
                    style={{ filter: 'blur(4px)' }}
                  />

                  {/* Dynamic Trajectory Curve Sharp Stroke */}
                  <path
                    d="M 110 155 Q 170 115 215 88 T 320 58"
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.9)) drop-shadow(0 0 16px rgba(245, 158, 11, 0.7))'
                    }}
                  />

                  {/* Points along trajectory */}
                  {/* T-10m */}
                  <circle cx="110" cy="155" r="5" fill="#818cf8" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #818cf8)' }} />
                  <text x="110" y="174" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="500">T-10 min</text>

                  {/* T-5m */}
                  <circle cx="190" cy="98" r="5" fill="#34d399" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
                  <text x="190" y="85" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="500">T-5 min</text>

                  {/* T-2m */}
                  <circle cx="260" cy="76" r="5" fill="#fbbf24" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #fbbf24)' }} />
                  <text x="260" y="94" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="500">T-2 min</text>

                  {/* Current point (glowing orange beacon) */}
                  <circle cx="320" cy="58" r="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping opacity-60" />
                  <circle cx="320" cy="58" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #f59e0b)' }} />
                  <rect x="295" y="26" width="50" height="18" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' }} />
                  <text x="320" y="38" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Current</text>
                </svg>
              </div>
            </div>

            {/* Metric Badges (Col 4 - Matching Option A with Vivid Glows) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-2.5 text-left">
              {/* Badge 1: Valence (Glowing Emerald Card) */}
              <div
                className="rounded-xl border border-emerald-500/80 p-3 relative overflow-hidden"
                style={{
                  background: 'rgba(6, 78, 59, 0.22)',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.35), inset 0 0 15px rgba(16, 185, 129, 0.12)'
                }}
              >
                <span className="text-[11px] text-emerald-200 font-medium">Valence</span>
                <div className="text-xl font-bold text-emerald-400 mt-0.5" style={{ textShadow: '0 0 12px rgba(52, 211, 153, 0.85)' }}>
                  +0.42 (Calm)
                </div>
              </div>

              {/* Badge 2: Agitation */}
              <div
                className="rounded-xl border border-teal-500/30 p-3"
                style={{
                  background: 'rgba(19, 78, 74, 0.18)'
                }}
              >
                <span className="text-[11px] text-teal-200 font-medium">Agitation</span>
                <div className="text-xl font-bold text-teal-300 mt-0.5" style={{ textShadow: '0 0 10px rgba(45, 212, 191, 0.7)' }}>
                  -38%
                </div>
              </div>

              {/* Badge 3: 4Ps Anchors */}
              <div
                className="rounded-xl border border-amber-500/40 p-3"
                style={{
                  background: 'rgba(120, 53, 15, 0.20)'
                }}
              >
                <span className="text-[11px] text-amber-200 font-medium">4Ps Anchors</span>
                <div className="text-xl font-bold text-amber-400 mt-0.5" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }}>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Emotional Wave (Stream) Timeline Chart with Neon Glows & Area Fills */}
          <div className="rounded-xl border border-white/[0.08] bg-zinc-950/80 p-3.5 text-left relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-zinc-200">Emotional wave (stream)</span>
              <span className="text-[11px] text-zinc-400">Last 30 minutes</span>
            </div>

            <div className="relative w-full aspect-[4.5/1] max-h-24">
              <svg viewBox="0 0 500 80" className="w-full h-full overflow-visible">
                <defs>
                  {/* Amber area fill gradient */}
                  <linearGradient id="amberAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                  {/* Green area fill gradient */}
                  <linearGradient id="greenAreaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Gridlines */}
                <line x1="20" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.06)" />
                <line x1="20" y1="45" x2="480" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                <line x1="20" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.06)" />

                {/* Stream 1 Area (Amber) */}
                <path
                  d="M 20 22 C 100 20, 180 35, 260 55 C 340 70, 420 68, 480 66 L 480 75 L 20 75 Z"
                  fill="url(#amberAreaGrad)"
                />
                {/* Stream 1 Glowing Stroke: Agitation Dropping (Amber) */}
                <path
                  d="M 20 22 C 100 20, 180 35, 260 55 C 340 70, 420 68, 480 66"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.95))' }}
                />

                {/* Stream 2 Area (Green) */}
                <path
                  d="M 20 68 C 100 66, 180 55, 260 30 C 340 18, 420 18, 480 20 L 480 75 L 20 75 Z"
                  fill="url(#greenAreaGrad)"
                />
                {/* Stream 2 Glowing Stroke: Valence Rising / Calming (Green) */}
                <path
                  d="M 20 68 C 100 66, 180 55, 260 30 C 340 18, 420 18, 480 20"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 7px rgba(52, 211, 153, 0.95))' }}
                />

                {/* Time Markers */}
                <text x="20" y="78" fill="#71717a" fontSize="8">0</text>
                <text x="100" y="78" fill="#71717a" fontSize="8">5</text>
                <text x="180" y="78" fill="#71717a" fontSize="8">10</text>
                <text x="260" y="78" fill="#71717a" fontSize="8">15</text>
                <text x="340" y="78" fill="#71717a" fontSize="8">20</text>
                <text x="420" y="78" fill="#71717a" fontSize="8">25</text>
                <text x="480" y="78" fill="#71717a" fontSize="8">30</text>
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 3: WHY HORIZON (Approved Picture 3B - 3 Obsidian Pillar Cards)
          ========================================================================= */}
      <section
        id="why"
        className="min-h-screen h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-8 py-8 border-t border-white/[0.05] overflow-hidden snap-start"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-10%] sm:left-[2%] w-[480px] sm:w-[680px] h-[480px] sm:h-[620px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.46) 0%, rgba(124, 58, 237, 0.25) 42%, rgba(67, 56, 202, 0.08) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[2%] w-[460px] sm:w-[650px] h-[460px] sm:h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.40) 0%, rgba(234, 88, 12, 0.22) 42%, rgba(180, 83, 9, 0.06) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            A waiting room designed for human dignity.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Three simple reasons we threw away the clinical clipboards.
          </p>
        </div>

        {/* 3 Obsidian Glass Cards (Matching 3B with Specular Glows) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Card 1: De-escalate Anxiety */}
          <div
            className="rounded-2xl border border-white/[0.12] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.82)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              De-escalate Anxiety
            </h3>

            {/* Glowing Calm Wave Ribbon Graphic */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <svg viewBox="0 0 160 50" className="w-40 h-16 overflow-visible">
                <defs>
                  <linearGradient id="cardWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="50%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
                {/* Secondary soft diffuse ribbon */}
                <path
                  d="M 10 25 C 40 25, 55 5, 80 25 C 105 45, 120 25, 150 25"
                  fill="none"
                  stroke="url(#cardWaveGrad)"
                  strokeWidth="8"
                  opacity="0.35"
                  strokeLinecap="round"
                  style={{ filter: 'blur(4px)' }}
                />
                {/* Crisp luminous wave */}
                <path
                  d="M 10 25 C 40 25, 55 5, 80 25 C 105 45, 120 25, 150 25"
                  fill="none"
                  stroke="url(#cardWaveGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 10px rgba(56, 189, 248, 0.75))' }}
                />
              </svg>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Calm wave indicator: Soothing and fluid interaction designed to reduce nervous system stress while waiting.
            </p>
          </div>

          {/* Card 2: A Peer, Not An Interrogator */}
          <div
            className="rounded-2xl border border-white/[0.12] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.82)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              A Peer, Not An Interrogator
            </h3>

            {/* Sophia Chat Bubble Graphic with Purple/Indigo Glow */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <div
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border border-purple-500/40 text-xs text-zinc-100"
                style={{
                  background: 'rgba(24, 24, 34, 0.95)',
                  boxShadow: '0 0 25px rgba(168, 85, 247, 0.30)'
                }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <MessageSquare size={14} className="text-purple-300" />
                <span className="font-semibold tracking-wide">Sophia</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Peer support interaction: A friendly, grounded companion sitting with you. Zero unsolicited advice, zero clinical checklists.
            </p>
          </div>

          {/* Card 3: Doctor Walks In Aligned */}
          <div
            className="rounded-2xl border border-white/[0.12] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.82)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Doctor Walks In Aligned
            </h3>

            {/* Clinical Readiness Medal Graphic with Gold/Amber Glow */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <div
                className="w-13 h-13 rounded-full border border-amber-500/50 flex items-center justify-center text-amber-300"
                style={{
                  background: 'rgba(120, 53, 15, 0.25)',
                  boxShadow: '0 0 25px rgba(245, 158, 11, 0.35)'
                }}
              >
                <Award size={24} />
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Clinical readiness badge: Your psychiatrist receives an instant 4Ps formulation, so your appointment begins with deep human connection.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 4: ABOUT & 24/7 CRISIS SAFETY (Approved Picture 4)
          ========================================================================= */}
      <section
        id="about"
        className="min-h-screen h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-8 py-8 border-t border-white/[0.05] overflow-hidden snap-start"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-10%] sm:left-[2%] w-[480px] sm:w-[680px] h-[480px] sm:h-[620px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.44) 0%, rgba(124, 58, 237, 0.24) 42%, rgba(67, 56, 202, 0.08) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-10%] sm:right-[2%] w-[460px] sm:w-[650px] h-[460px] sm:h-[600px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.42) 0%, rgba(234, 88, 12, 0.25) 42%, rgba(180, 83, 9, 0.06) 72%, transparent 88%)',
            filter: 'blur(75px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-2 mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            A gentler start to therapy.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Built to eliminate the most anxiety-inducing 15 minutes in modern healthcare.
          </p>
        </div>

        {/* Centerpiece Console Window (Matching Picture 4) */}
        <div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/[0.10] p-7 sm:p-9 backdrop-blur-2xl my-auto"
          style={{
            background: 'rgba(12, 13, 19, 0.88)',
            boxShadow: '0 0 60px -10px rgba(99, 102, 241, 0.20), 0 0 60px -10px rgba(245, 158, 11, 0.18), 0 35px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Our Clinical Philosophy */}
            <div className="md:col-span-7 text-left space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Our Clinical Philosophy
                </h3>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-400/40 text-[10px] text-indigo-200 font-medium mt-2"
                  style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.25)'
                  }}
                >
                  <Shield size={11} className="text-indigo-300" />
                  <span>Patient privacy badge</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-lg bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,255,255,0.10)]">
                  <EyeOff size={18} />
                </div>
                <span className="text-base font-semibold text-white">
                  Zero Advertising Access
                </span>
              </div>

              <div className="space-y-2 text-xs text-zinc-400 pt-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block">
                  Empathetic intake values
                </span>
                <div className="flex items-center gap-2 text-zinc-200">
                  <Heart size={14} className="text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                  <span>Compassionate Onboarding</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-200">
                  <Heart size={14} className="text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                  <span>Patient-Centric Approach</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-200">
                  <Lock size={14} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                  <span>Confidential Care Path</span>
                </div>
              </div>
            </div>

            {/* Right Column: 24/7 Immediate Crisis Support (THE VIVID GLOWING CARD from Picture 4) */}
            <div className="md:col-span-5">
              <div
                className="rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden animate-pulse-glow-amber"
                style={{
                  border: '2px solid rgba(245, 158, 11, 0.85)',
                  background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.15) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(15, 15, 20, 0.90) 100%)',
                  boxShadow: '0 0 45px rgba(245, 158, 11, 0.40), 0 0 90px rgba(234, 88, 12, 0.25), inset 0 0 25px rgba(245, 158, 11, 0.15)'
                }}
              >
                {/* Luminous Top Badge */}
                <span
                  className="px-3.5 py-1.5 rounded-full text-[11px] font-bold text-zinc-950 mb-3 tracking-wide"
                  style={{
                    background: 'linear-gradient(90deg, #ea580c 0%, #f59e0b 100%)',
                    boxShadow: '0 0 20px rgba(245, 158, 11, 0.65)'
                  }}
                >
                  24/7 Immediate Crisis Support
                </span>

                <div
                  className="text-5xl sm:text-6xl font-extrabold tracking-tight text-white my-1"
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.6), 0 0 35px rgba(245, 158, 11, 0.4)'
                  }}
                >
                  988
                </div>
                <p className="text-xs font-medium text-amber-200/90 mb-5">
                  Suicide & Crisis Lifeline
                </p>

                <div className="flex items-center gap-3 w-full">
                  <a
                    href="tel:988"
                    className="flex-1 py-2.5 px-3 rounded-full border border-amber-500/50 hover:border-amber-400 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_18px_rgba(245,158,11,0.25)] active:scale-95"
                  >
                    <Phone size={13} className="text-amber-300" />
                    <span>Call</span>
                  </a>
                  <a
                    href="sms:988"
                    className="flex-1 py-2.5 px-3 rounded-full border border-amber-500/50 hover:border-amber-400 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-[0_0_18px_rgba(245,158,11,0.25)] active:scale-95"
                  >
                    <MessageSquare size={13} className="text-amber-300" />
                    <span>Text</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 pt-4 pb-2 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 font-medium">Horizon Health</span>
            <span>•</span>
            <span>Gentle Psychiatric Waiting Space</span>
          </div>
          <div>
            © {new Date().getFullYear()} Horizon Health Technologies. All rights reserved.
          </div>
        </footer>
      </section>

    </div>
  );
}
