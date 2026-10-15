import React, { useState, useRef } from 'react';
import {
  Shield,
  AlertCircle,
  Phone,
  MessageSquare,
  Lock,
  Heart,
  EyeOff,
  Activity,
  Search,
  Bell,
  MoreHorizontal
} from 'lucide-react';

import pillarWave from '../../assets/pillar_wave_clean.png';
import pillarSophia from '../../assets/pillar_sophia_clean.png';
import pillarMedal from '../../assets/pillar_medal_clean.png';

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
    <div className="w-full bg-[#000000] text-zinc-100 font-sans selection:bg-white/20 selection:text-white select-none relative overflow-x-hidden">
      
      {/* =========================================================================
          SCREEN 1: HERO SECTION (100vh, Exact Match to Picture 1)
          ========================================================================= */}
      <section
        id="hero"
        className="h-screen min-h-screen max-h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-6 pt-5 pb-6 overflow-hidden snap-start snap-always"
      >
        {/* Top Navbar */}
        <header className="relative z-20 w-full px-4 sm:px-8 flex items-center justify-between pt-1">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="group-hover:scale-105 transition-transform">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
            <span className="text-base font-semibold tracking-tight text-white">
              Horizon
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-300">
            <a href="#hero" className="hover:text-white transition-colors">Lounge</a>
            <a href="#why" className="hover:text-white transition-colors">Why Horizon</a>
            <a href="#trajectory" className="hover:text-white transition-colors">Clinical Engine</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>

          {/* Top Right Action Buttons (Log in + Enter Lounge) */}
          <div className="flex items-center gap-5">
            <button
              onClick={scrollToInput}
              className="hidden sm:inline-block text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              Log in
            </button>
            <button
              onClick={scrollToInput}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.25)] cursor-pointer"
            >
              Enter Lounge
            </button>
          </div>
        </header>

        {/* Hero Centerpiece: Shifted Higher Up Vertically */}
        <div className="relative z-10 w-full flex flex-col items-center text-center my-auto px-2 -translate-y-3 sm:-translate-y-5">
          {/* 1-Line Big Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.6rem] font-bold tracking-tight text-white leading-tight mb-2.5 text-center whitespace-nowrap max-w-full drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            A quieter way to wait for your psychiatrist.
          </h1>

          {/* Clean Subtext */}
          <p className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            No 50-question clinical checklists. Chat naturally with Sophia, an empathetic<br className="hidden sm:inline" /> waiting room peer, while your doctor prepares your care.
          </p>

          {/* Floating Dark Glass Console Window */}
          <div className="relative w-full max-w-[700px]">
            {/* Luminous Ethereal Auras Hugging Left & Right of Card */}
            <div
              className="absolute -left-36 top-1/2 -translate-y-1/2 w-[460px] h-[400px] rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle at 45% 50%, rgba(99, 102, 241, 0.65) 0%, rgba(139, 92, 246, 0.40) 35%, rgba(67, 56, 202, 0.15) 60%, transparent 80%)',
                filter: 'blur(55px)'
              }}
            />
            <div
              className="absolute -right-36 top-1/2 -translate-y-1/2 w-[460px] h-[400px] rounded-full pointer-events-none -z-10"
              style={{
                background: 'radial-gradient(circle at 55% 50%, rgba(245, 158, 11, 0.58) 0%, rgba(234, 88, 12, 0.36) 35%, rgba(180, 83, 9, 0.14) 60%, transparent 80%)',
                filter: 'blur(55px)'
              }}
            />

            {/* The Console Card */}
            <div
              className="w-full rounded-2xl border border-white/[0.12] p-7 sm:p-9 backdrop-blur-2xl transition-all duration-300 relative text-left"
              style={{
                background: 'rgba(14, 15, 21, 0.92)',
                boxShadow: '0 30px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.14)'
              }}
            >
              {/* Top Window Bar */}
              <div className="relative flex items-center justify-between pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600/70" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium text-white tracking-normal flex items-center gap-2 whitespace-nowrap">
                  <span className="text-white font-medium">Waiting Room Lounge</span>
                  <span className="text-zinc-500">•</span>
                  <span className="text-zinc-400 font-normal">~6 min wait</span>
                </div>
                <div className="w-8" />
              </div>

              {/* Glowing Waveform in Center */}
              <div className="py-7 sm:py-9 flex items-center justify-center relative">
                <svg viewBox="0 0 540 90" className="w-full h-22 sm:h-24 overflow-visible animate-wave-breathe">
                  <defs>
                    <linearGradient id="heroWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="25%" stopColor="#818cf8" />
                      <stop offset="48%" stopColor="#c084fc" />
                      <stop offset="68%" stopColor="#f472b6" />
                      <stop offset="85%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  {/* Soft Blurred Luminous Halo */}
                  <path
                    d="M 20 45 C 70 45, 95 35, 135 38 C 175 42, 190 62, 225 54 C 255 46, 265 14, 295 24 C 325 34, 340 60, 375 52 C 405 44, 425 36, 455 40 C 485 44, 505 45, 520 45"
                    fill="none"
                    stroke="url(#heroWaveGrad)"
                    strokeWidth="8"
                    opacity="0.45"
                    strokeLinecap="round"
                    style={{ filter: 'blur(5px)' }}
                  />
                  {/* Sharp Glowing Neon Wave */}
                  <path
                    d="M 20 45 C 70 45, 95 35, 135 38 C 175 42, 190 62, 225 54 C 255 46, 265 14, 295 24 C 325 34, 340 60, 375 52 C 405 44, 425 36, 455 40 C 485 44, 505 45, 520 45"
                    fill="none"
                    stroke="url(#heroWaveGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(192, 132, 252, 0.95)) drop-shadow(0 0 24px rgba(245, 158, 11, 0.70))'
                    }}
                  />
                </svg>
              </div>

              {/* Bottom Input & Action Pill Button */}
              <form onSubmit={handleSubmit} className="w-full mt-2">
                <div className="flex items-center gap-3 w-full">
                  <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-[#1a1b24]/90 border border-white/10 rounded-full px-6 py-3.5 text-white text-sm placeholder-zinc-500 outline-none focus:border-white/30 focus:ring-1 focus:ring-white/15 transition-all shadow-inner"
                    placeholder="What can we call you?"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    autoFocus
                    maxLength={40}
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 inline-flex items-center justify-center gap-1.5 px-7 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all cursor-pointer bg-white text-black hover:bg-zinc-200 active:scale-[0.98] shadow-[0_0_24px_rgba(255,255,255,0.35)] hover:shadow-[0_0_35px_rgba(255,255,255,0.55)] disabled:opacity-50"
                    disabled={loading}
                  >
                    <span>{loading ? 'Entering...' : 'Enter Lounge'}</span>
                    <span className="text-base font-bold">→</span>
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
        </div>

        {/* Minimal Bottom Spacer */}
        <div className="h-2" />
      </section>


      {/* =========================================================================
          SCREEN 2: CLINICAL TRAJECTORY DASHBOARD (100vh, 100% Vector Icons)
          ========================================================================= */}
      <section
        id="trajectory"
        className="h-screen min-h-screen max-h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-6 py-5 border-t border-white/[0.05] overflow-hidden snap-start snap-always"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-6%] w-[520px] h-[520px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.45) 0%, rgba(124, 58, 237, 0.25) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-6%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.40) 0%, rgba(234, 88, 12, 0.22) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />

        {/* 1-Line Big Heading */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-tight mb-2 text-center whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            Silent clinical intelligence. Zero interrogation.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            As you chat with Sophia, your emotional trajectory is mapped in real-time so your psychiatrist walks in with deep insight.
          </p>
        </div>

        {/* Main Dashboard Window: ZERO Emojis, 100% Vector Icons */}
        <div
          className="relative z-10 w-full max-w-6xl rounded-2xl border border-white/[0.10] p-5 sm:p-6 backdrop-blur-2xl"
          style={{
            background: 'rgba(12, 13, 19, 0.88)',
            boxShadow: '0 0 60px -10px rgba(99, 102, 241, 0.20), 0 0 60px -10px rgba(245, 158, 11, 0.16), 0 35px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)'
          }}
        >
          {/* Dashboard Header Bar: 100% Vector Icons */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-white/[0.08] border border-white/10 flex items-center justify-center text-white shadow-sm">
                <Activity size={13} className="text-white" />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Horizon Health</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/15 text-xs text-zinc-300">
              <Search size={11} className="text-zinc-400" />
              <span className="font-medium text-[11px]">Dashboard</span>
            </div>
            <div className="flex items-center gap-2.5 text-zinc-400">
              <button type="button" className="p-1 hover:text-white transition-colors cursor-pointer">
                <Bell size={13} />
              </button>
              <button type="button" className="p-1 hover:text-white transition-colors cursor-pointer">
                <MoreHorizontal size={14} />
              </button>
            </div>
          </div>

          {/* Top Half: Circumplex on Left, Metric Badges on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3">
            {/* Russell's Affective Circumplex (Col 8) */}
            <div className="md:col-span-8 rounded-xl border border-white/[0.08] bg-zinc-950/80 p-3 text-left relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-emerald-500/[0.14] blur-2xl pointer-events-none rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-amber-500/[0.15] blur-2xl pointer-events-none rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-500/[0.12] blur-2xl pointer-events-none rounded-bl-xl" />

              <div className="flex items-center justify-between text-[11px] text-zinc-300 mb-1 relative z-10">
                <span className="font-semibold text-zinc-200">Valence</span>
                <span className="font-semibold text-zinc-200">Arousal - High</span>
                <span className="text-transparent">Placeholder</span>
              </div>

              {/* 2D Circumplex Plot SVG */}
              <div className="relative w-full aspect-[2.6/1] flex items-center justify-center z-10">
                <svg viewBox="0 0 460 175" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="circGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="40%" stopColor="#34d399" />
                      <stop offset="80%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  <line x1="230" y1="10" x2="230" y2="165" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />
                  <line x1="20" y1="88" x2="440" y2="88" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" />

                  <text x="30" y="92" fill="#a1a1aa" fontSize="10">Pleasant ←</text>
                  <text x="430" y="92" textAnchor="end" fill="#a1a1aa" fontSize="10">→ Unpleasant</text>
                  <text x="230" y="171" textAnchor="middle" fill="#a1a1aa" fontSize="10">Arousal</text>

                  <path
                    d="M 110 140 Q 170 102 215 78 T 320 48"
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth="7"
                    opacity="0.45"
                    strokeLinecap="round"
                    style={{ filter: 'blur(4px)' }}
                  />

                  <path
                    d="M 110 140 Q 170 102 215 78 T 320 48"
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.9)) drop-shadow(0 0 16px rgba(245, 158, 11, 0.7))'
                    }}
                  />

                  <circle cx="110" cy="140" r="5" fill="#818cf8" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #818cf8)' }} />
                  <text x="110" y="158" textAnchor="middle" fill="#c7d2fe" fontSize="9" fontWeight="500">T-10 min</text>

                  <circle cx="190" cy="88" r="5" fill="#34d399" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #34d399)' }} />
                  <text x="190" y="75" textAnchor="middle" fill="#a7f3d0" fontSize="9" fontWeight="500">T-5 min</text>

                  <circle cx="260" cy="66" r="5" fill="#fbbf24" stroke="#000" strokeWidth="1.5" style={{ filter: 'drop-shadow(0 0 8px #fbbf24)' }} />
                  <text x="260" y="84" textAnchor="middle" fill="#fde68a" fontSize="9" fontWeight="500">T-2 min</text>

                  <circle cx="320" cy="48" r="12" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping opacity-60" />
                  <circle cx="320" cy="48" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #f59e0b)' }} />
                  <rect x="295" y="16" width="50" height="18" rx="4" fill="#18181b" stroke="#f59e0b" strokeWidth="1" style={{ filter: 'drop-shadow(0 0 6px rgba(245,158,11,0.6))' }} />
                  <text x="320" y="28" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Current</text>
                </svg>
              </div>
            </div>

            {/* Metric Badges (Col 4) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-2 text-left">
              <div
                className="rounded-xl border border-emerald-500/80 p-2.5 relative overflow-hidden"
                style={{
                  background: 'rgba(6, 78, 59, 0.22)',
                  boxShadow: '0 0 25px rgba(16, 185, 129, 0.35), inset 0 0 15px rgba(16, 185, 129, 0.12)'
                }}
              >
                <span className="text-[11px] text-emerald-200 font-medium">Valence</span>
                <div className="text-lg font-bold text-emerald-400 mt-0.5" style={{ textShadow: '0 0 12px rgba(52, 211, 153, 0.85)' }}>
                  +0.42 (Calm)
                </div>
              </div>

              <div
                className="rounded-xl border border-teal-500/30 p-2.5"
                style={{
                  background: 'rgba(19, 78, 74, 0.18)'
                }}
              >
                <span className="text-[11px] text-teal-200 font-medium">Agitation</span>
                <div className="text-lg font-bold text-teal-300 mt-0.5" style={{ textShadow: '0 0 10px rgba(45, 212, 191, 0.7)' }}>
                  -38%
                </div>
              </div>

              <div
                className="rounded-xl border border-amber-500/40 p-2.5"
                style={{
                  background: 'rgba(120, 53, 15, 0.20)'
                }}
              >
                <span className="text-[11px] text-amber-200 font-medium">4Ps Anchors</span>
                <div className="text-lg font-bold text-amber-400 mt-0.5" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.8)' }}>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Emotional Wave (Stream) Timeline Chart */}
          <div className="rounded-xl border border-white/[0.08] bg-zinc-950/80 p-3 text-left relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-zinc-200">Emotional wave (stream)</span>
              <span className="text-[11px] text-zinc-400">Last 30 minutes</span>
            </div>

            <div className="relative w-full aspect-[5.2/1] max-h-20">
              <svg viewBox="0 0 500 75" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="amberAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="greenAreaGrad" x1="0%" y1="0%" x2="0%" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                <line x1="20" y1="18" x2="480" y2="18" stroke="rgba(255,255,255,0.06)" />
                <line x1="20" y1="40" x2="480" y2="40" stroke="rgba(255,255,255,0.08)" strokeDasharray="2 2" />
                <line x1="20" y1="62" x2="480" y2="62" stroke="rgba(255,255,255,0.06)" />

                <path
                  d="M 20 20 C 100 18, 180 32, 260 50 C 340 64, 420 62, 480 60 L 480 70 L 20 70 Z"
                  fill="url(#amberAreaGrad)"
                />
                <path
                  d="M 20 20 C 100 18, 180 32, 260 50 C 340 64, 420 62, 480 60"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.95))' }}
                />

                <path
                  d="M 20 62 C 100 60, 180 50, 260 28 C 340 16, 420 16, 480 18 L 480 70 L 20 70 Z"
                  fill="url(#greenAreaGrad)"
                />
                <path
                  d="M 20 62 C 100 60, 180 50, 260 28 C 340 16, 420 16, 480 18"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 7px rgba(52, 211, 153, 0.95))' }}
                />

                <text x="20" y="72" fill="#71717a" fontSize="8">0</text>
                <text x="100" y="72" fill="#71717a" fontSize="8">5</text>
                <text x="180" y="72" fill="#71717a" fontSize="8">10</text>
                <text x="260" y="72" fill="#71717a" fontSize="8">15</text>
                <text x="340" y="72" fill="#71717a" fontSize="8">20</text>
                <text x="420" y="72" fill="#71717a" fontSize="8">25</text>
                <text x="480" y="72" fill="#71717a" fontSize="8">30</text>
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 3: WHY HORIZON (100vh, Master 3-Pillar Graphics)
          ========================================================================= */}
      <section
        id="why"
        className="h-screen min-h-screen max-h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-6 py-5 border-t border-white/[0.05] overflow-hidden snap-start snap-always"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-6%] w-[520px] h-[520px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.45) 0%, rgba(124, 58, 237, 0.25) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-6%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.40) 0%, rgba(234, 88, 12, 0.22) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />

        {/* 1-Line Big Heading */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mb-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-tight mb-2 text-center whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            A waiting room designed for human dignity.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Three simple reasons we threw away the clinical clipboards.
          </p>
        </div>

        {/* 3 Obsidian Glass Cards with Master Graphics */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {/* Card 1: De-escalate Anxiety (3D Fluid Calm Wave) */}
          <div
            className="rounded-2xl border border-white/[0.12] p-7 sm:p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_35px_rgba(56,189,248,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.85)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-5">
              De-escalate Anxiety
            </h3>

            <div className="w-full h-24 flex items-center justify-center my-auto">
              <img
                src={pillarWave}
                alt="De-escalate Anxiety Fluid Wave"
                className="w-48 h-auto object-contain mx-auto mix-blend-lighten filter drop-shadow-[0_0_15px_rgba(255,255,255,0.25)] select-none pointer-events-none"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-5">
              Calm wave indicator: Soothing and fluid interaction designed to reduce nervous system stress while waiting.
            </p>
          </div>

          {/* Card 2: A Peer, Not An Interrogator (Sophia Chat Bubble) */}
          <div
            className="rounded-2xl border border-white/[0.12] p-7 sm:p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.85)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-5">
              A Peer, Not An Interrogator
            </h3>

            <div className="w-full h-24 flex items-center justify-center my-auto">
              <img
                src={pillarSophia}
                alt="Sophia Peer Support Bubble"
                className="w-44 h-auto object-contain mx-auto mix-blend-lighten filter drop-shadow-[0_0_15px_rgba(255,255,255,0.20)] select-none pointer-events-none"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-5">
              Peer support interaction: A friendly, grounded companion sitting with you. Zero unsolicited advice, zero clinical checklists.
            </p>
          </div>

          {/* Card 3: Doctor Walks In Aligned (Clinical Readiness Seal Medal) */}
          <div
            className="rounded-2xl border border-white/[0.12] p-7 sm:p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_0_35px_rgba(245,158,11,0.20)]"
            style={{
              background: 'rgba(13, 14, 20, 0.85)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-5">
              Doctor Walks In Aligned
            </h3>

            <div className="w-full h-24 flex items-center justify-center my-auto">
              <img
                src={pillarMedal}
                alt="Clinical Readiness Medal"
                className="w-20 h-auto object-contain mx-auto mix-blend-lighten filter drop-shadow-[0_0_15px_rgba(255,255,255,0.30)] select-none pointer-events-none"
              />
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-5">
              Clinical readiness badge: Your psychiatrist receives an instant 4Ps formulation, so your appointment begins with deep human connection.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 4: ABOUT & 24/7 CRISIS SAFETY (100vh, High-Class Cards, ZERO Emojis)
          ========================================================================= */}
      <section
        id="about"
        className="h-screen min-h-screen max-h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-6 py-5 border-t border-white/[0.05] overflow-hidden snap-start snap-always"
      >
        {/* Luminous Ethereal Auras */}
        <div
          className="absolute top-1/2 -translate-y-1/2 left-[-6%] w-[520px] h-[520px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 45% 45%, rgba(99, 102, 241, 0.45) 0%, rgba(124, 58, 237, 0.25) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-[-6%] w-[500px] h-[500px] rounded-full pointer-events-none z-0"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(245, 158, 11, 0.42) 0%, rgba(234, 88, 12, 0.25) 40%, transparent 80%)',
            filter: 'blur(70px)'
          }}
        />

        {/* 1-Line Big Heading */}
        <div className="relative z-10 w-full flex flex-col items-center text-center mt-1 mb-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-tight mb-2 text-center whitespace-nowrap drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
            A gentler start to therapy.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
            Built to eliminate the most anxiety-inducing 15 minutes in modern healthcare.
          </p>
        </div>

        {/* Centerpiece Console Window: Premium High-Class Cards */}
        <div
          className="relative z-10 w-full max-w-6xl rounded-2xl border border-white/[0.10] p-6 sm:p-8 backdrop-blur-2xl my-auto"
          style={{
            background: 'rgba(12, 13, 19, 0.88)',
            boxShadow: '0 0 60px -10px rgba(99, 102, 241, 0.20), 0 0 60px -10px rgba(245, 158, 11, 0.18), 0 35px 90px -15px rgba(0, 0, 0, 0.98), inset 0 1px 0 0 rgba(255, 255, 255, 0.10)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Our Clinical Philosophy */}
            <div className="md:col-span-7 text-left space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  Our Clinical Philosophy
                </h3>
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-400/40 text-[11px] text-indigo-200 font-medium mt-2"
                  style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.25)'
                  }}
                >
                  <Shield size={12} className="text-indigo-300" />
                  <span>Patient privacy badge</span>
                </div>
              </div>

              {/* Zero Advertising Access Tile */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 shadow-inner">
                <div className="w-10 h-10 rounded-lg bg-white/[0.08] border border-white/15 flex items-center justify-center text-white shadow-sm">
                  <EyeOff size={18} />
                </div>
                <div>
                  <div className="text-base font-semibold text-white">
                    Zero Advertising Access
                  </div>
                  <div className="text-xs text-zinc-400">
                    No marketing trackers, third-party data broker access, or commercial profiling.
                  </div>
                </div>
              </div>

              {/* Empathetic intake values list with fine dividers */}
              <div className="pt-1">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider block mb-2.5">
                  Empathetic intake values
                </span>
                
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5 text-zinc-200 text-xs font-medium">
                      <Heart size={14} className="text-rose-400 drop-shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
                      <span>Compassionate Onboarding</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">CALM-FIRST</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5 text-zinc-200 text-xs font-medium">
                      <Heart size={14} className="text-indigo-400 drop-shadow-[0_0_6px_rgba(129,140,248,0.6)]" />
                      <span>Patient-Centric Approach</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">NON-CLINICAL</span>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <div className="flex items-center gap-2.5 text-zinc-200 text-xs font-medium">
                      <Lock size={14} className="text-emerald-400 drop-shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
                      <span>Confidential Care Path</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono">ENCRYPTED</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 24/7 Immediate Crisis Support (Glowing Amber Card) */}
            <div className="md:col-span-5">
              <div
                className="rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden animate-pulse-glow-amber"
                style={{
                  border: '1.5px solid rgba(245, 158, 11, 0.75)',
                  background: 'linear-gradient(135deg, rgba(234, 88, 12, 0.16) 0%, rgba(245, 158, 11, 0.08) 50%, rgba(15, 15, 20, 0.92) 100%)',
                  boxShadow: '0 0 45px rgba(245, 158, 11, 0.40), 0 0 90px rgba(234, 88, 12, 0.25), inset 0 0 25px rgba(245, 158, 11, 0.15)'
                }}
              >
                {/* Luminous Top Badge */}
                <span
                  className="px-4 py-1.5 rounded-full text-[11px] font-bold text-zinc-950 mb-3 tracking-wide"
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
                    className="flex-1 py-2.5 px-3 rounded-full border border-amber-500/50 hover:border-amber-400 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_18px_rgba(245,158,11,0.25)] active:scale-95"
                  >
                    <Phone size={13} className="text-amber-300" />
                    <span>Call</span>
                  </a>
                  <a
                    href="sms:988"
                    className="flex-1 py-2.5 px-3 rounded-full border border-amber-500/50 hover:border-amber-400 bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_18px_rgba(245,158,11,0.25)] active:scale-95"
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
        <footer className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-500 pt-2 pb-1 border-t border-white/[0.04]">
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
