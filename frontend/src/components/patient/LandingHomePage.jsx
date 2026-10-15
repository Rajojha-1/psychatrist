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
    <div className="w-full bg-[#000000] text-zinc-100 font-sans selection:bg-white/20 selection:text-white select-none">
      
      {/* =========================================================================
          SCREEN 1: HERO SECTION (Waiting Lounge Console - Matching Picture 1)
          ========================================================================= */}
      <section
        id="hero"
        className="min-h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-8 py-6 overflow-hidden"
      >
        {/* Ambient Ethereal Glows: Soft Indigo (Left) & Warm Amber (Right) */}
        <div
          className="absolute -top-32 left-[15%] w-[640px] h-[520px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 45% 40%, rgba(99, 102, 241, 0.16) 0%, rgba(139, 92, 246, 0.06) 45%, transparent 70%)',
            filter: 'blur(120px)'
          }}
        />
        <div
          className="absolute top-[10%] right-[12%] w-[580px] h-[520px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 55% 45%, rgba(234, 138, 28, 0.13) 0%, rgba(217, 119, 6, 0.04) 50%, transparent 70%)',
            filter: 'blur(120px)'
          }}
        />

        {/* Top Navbar */}
        <header className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-between pt-2">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/10 flex items-center justify-center text-white shadow-[0_0_16px_rgba(255,255,255,0.08)] group-hover:scale-105 transition-transform">
              <HeartPulse size={15} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              Horizon
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-zinc-400">
            <a href="#hero" className="hover:text-white transition-colors">Lounge</a>
            <a href="#trajectory" className="hover:text-white transition-colors">Clinical Engine</a>
            <a href="#why" className="hover:text-white transition-colors">Why Horizon</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </nav>

          {/* Top Right Action Button */}
          <button
            onClick={scrollToInput}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_18px_rgba(255,255,255,0.15)] cursor-pointer"
          >
            Enter Lounge
          </button>
        </header>

        {/* Hero Centerpiece: Headline & Floating Console Window */}
        <div className="relative z-10 w-full max-w-2xl mx-auto my-auto flex flex-col items-center text-center py-6">
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-tight text-white leading-[1.14] mb-4">
            A quieter way to wait for your psychiatrist.
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed mb-8">
            No 50-question clinical checklists. Chat naturally with Sophia, an empathetic waiting room peer, while your doctor prepares your care.
          </p>

          {/* Floating Dark Glass Console Window */}
          <div
            className="w-full max-w-lg rounded-2xl border border-white/[0.08] p-6 sm:p-7 backdrop-blur-2xl transition-all duration-300"
            style={{
              background: 'rgba(15, 15, 20, 0.75)',
              boxShadow: '0 30px 90px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Top Window Control Dots */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-zinc-700/60" />
                <span className="w-2 h-2 rounded-full bg-zinc-700/60" />
                <span className="w-2 h-2 rounded-full bg-zinc-700/60" />
              </div>
              <div className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Waiting Room Lounge • ~6 min wait</span>
              </div>
              <div className="w-8" />
            </div>

            {/* Soothing Calming Breathing Waveform (Indigo to Amber Gradient) */}
            <div className="py-5 flex items-center justify-center">
              <svg viewBox="0 0 400 64" className="w-full h-16 overflow-visible animate-wave-breathe">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                    <stop offset="35%" stopColor="#c084fc" stopOpacity="0.9" />
                    <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.7" />
                  </linearGradient>
                  <filter id="waveGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path
                  d="M 10 32 C 70 32, 90 8, 140 18 C 180 26, 195 54, 230 40 C 265 26, 290 8, 330 24 C 360 36, 380 32, 390 32"
                  fill="none"
                  stroke="url(#waveGradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  filter="url(#waveGlow)"
                />
              </svg>
            </div>

            {/* Check-In Pill Input & White Button */}
            <form onSubmit={handleSubmit} className="w-full mt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 min-w-0 bg-zinc-900/60 border border-white/10 rounded-full px-5 py-3.5 text-white text-sm placeholder-zinc-500 outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-all"
                  placeholder="What can we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  autoFocus
                  maxLength={40}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all cursor-pointer bg-white text-black hover:bg-zinc-200 active:scale-[0.98] shadow-[0_0_24px_rgba(255,255,255,0.18)] disabled:opacity-50"
                  disabled={loading}
                >
                  <span>{loading ? 'Entering...' : 'Enter Lounge'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-3.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2 text-left">
                <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scroll Down Prompt */}
        <a
          href="#trajectory"
          className="relative z-10 flex flex-col items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors pt-4 pb-2"
        >
          <span>Explore clinical architecture</span>
          <ChevronDown size={14} className="animate-bounce" />
        </a>
      </section>


      {/* =========================================================================
          SCREEN 2: CLINICAL TRAJECTORY DASHBOARD (Option A)
          ========================================================================= */}
      <section
        id="trajectory"
        className="min-h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-8 py-16 border-t border-white/[0.05] overflow-hidden"
      >
        {/* Soft Ambient Glows */}
        <div
          className="absolute top-[25%] left-[8%] w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />
        <div
          className="absolute top-[35%] right-[8%] w-[580px] h-[500px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(234, 138, 28, 0.10) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-3">
            Silent clinical intelligence. Zero interrogation.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            As you chat with Sophia, your emotional trajectory is mapped in real-time so your psychiatrist walks in with deep insight.
          </p>
        </div>

        {/* Main Dashboard Window (Matching Option A) */}
        <div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/[0.08] p-5 sm:p-7 backdrop-blur-2xl"
          style={{
            background: 'rgba(14, 14, 19, 0.85)',
            boxShadow: '0 30px 90px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Dashboard Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px]">
                🌅
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">Horizon Health</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-xs text-zinc-400">
              <span>🔍 Dashboard</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500 text-xs">
              <span>🔔</span>
              <span>•••</span>
            </div>
          </div>

          {/* Top Half: Circumplex on Left, Metric Badges on Right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-5">
            {/* Russell's Affective Circumplex (Col 8) */}
            <div className="md:col-span-8 rounded-xl border border-white/[0.06] bg-zinc-950/60 p-4 text-left">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                <span className="font-medium text-zinc-300">Valence</span>
                <span className="font-semibold text-zinc-200">Arousal - High</span>
                <span className="text-transparent">Placeholder</span>
              </div>

              {/* 2D Circumplex Plot SVG */}
              <div className="relative w-full aspect-[2/1] flex items-center justify-center">
                <svg viewBox="0 0 460 210" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="circGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#818cf8" />
                      <stop offset="45%" stopColor="#34d399" />
                      <stop offset="85%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>

                  {/* Axes Crosshair */}
                  <line x1="230" y1="15" x2="230" y2="195" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                  <line x1="20" y1="105" x2="440" y2="105" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

                  {/* Axis Text Labels */}
                  <text x="30" y="110" fill="#71717a" fontSize="10">Pleasant ←</text>
                  <text x="430" y="110" textAnchor="end" fill="#71717a" fontSize="10">→ Unpleasant</text>
                  <text x="230" y="202" textAnchor="middle" fill="#71717a" fontSize="10">Arousal</text>

                  {/* Dynamic Trajectory Curve */}
                  <path
                    d="M 110 160 Q 170 120 215 90 T 320 60"
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Points along trajectory */}
                  {/* T-10m */}
                  <circle cx="110" cy="160" r="5" fill="#818cf8" stroke="#000" strokeWidth="1.5" />
                  <text x="110" y="178" textAnchor="middle" fill="#a1a1aa" fontSize="9">T-10 min</text>

                  {/* T-5m */}
                  <circle cx="190" cy="100" r="5" fill="#34d399" stroke="#000" strokeWidth="1.5" />
                  <text x="190" y="88" textAnchor="middle" fill="#a1a1aa" fontSize="9">T-5 min</text>

                  {/* T-2m */}
                  <circle cx="260" cy="78" r="5" fill="#fbbf24" stroke="#000" strokeWidth="1.5" />
                  <text x="260" y="96" textAnchor="middle" fill="#a1a1aa" fontSize="9">T-2 min</text>

                  {/* Current point (glowing) */}
                  <circle cx="320" cy="60" r="10" fill="none" stroke="#f59e0b" strokeWidth="1.5" className="animate-ping opacity-60" />
                  <circle cx="320" cy="60" r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                  <rect x="295" y="32" width="50" height="18" rx="4" fill="#18181b" stroke="rgba(255,255,255,0.15)" />
                  <text x="320" y="44" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">Current</text>
                </svg>
              </div>
            </div>

            {/* Metric Badges (Col 4) */}
            <div className="md:col-span-4 flex flex-col justify-between gap-3 text-left">
              {/* Badge 1: Valence */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
                <span className="text-[11px] text-zinc-400 font-medium">Valence</span>
                <div className="text-xl font-semibold text-emerald-400 mt-0.5">
                  +0.42 (Calm)
                </div>
              </div>

              {/* Badge 2: Agitation */}
              <div className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-3.5">
                <span className="text-[11px] text-zinc-400 font-medium">Agitation</span>
                <div className="text-xl font-semibold text-zinc-200 mt-0.5">
                  -38%
                </div>
              </div>

              {/* Badge 3: 4Ps Anchors */}
              <div className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-3.5">
                <span className="text-[11px] text-zinc-400 font-medium">4Ps Anchors</span>
                <div className="text-xl font-semibold text-amber-400 mt-0.5">
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Half: Emotional Wave (Stream) Timeline Chart */}
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950/60 p-4 text-left">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-medium text-zinc-300">Emotional wave (stream)</span>
              <span className="text-[11px] text-zinc-500">Last 30 minutes</span>
            </div>

            <div className="relative w-full aspect-[4/1] max-h-24">
              <svg viewBox="0 0 500 80" className="w-full h-full overflow-visible">
                {/* Horizontal Gridlines */}
                <line x1="20" y1="20" x2="480" y2="20" stroke="rgba(255,255,255,0.04)" />
                <line x1="20" y1="45" x2="480" y2="45" stroke="rgba(255,255,255,0.06)" strokeDasharray="2 2" />
                <line x1="20" y1="70" x2="480" y2="70" stroke="rgba(255,255,255,0.04)" />

                {/* Stream 1: Agitation Dropping (Amber) */}
                <path
                  d="M 20 22 C 100 20, 180 35, 260 55 C 340 70, 420 68, 480 66"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Stream 2: Valence Rising / Calming (Green) */}
                <path
                  d="M 20 68 C 100 66, 180 55, 260 30 C 340 18, 420 18, 480 20"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Time Markers */}
                <text x="20" y="78" fill="#52525b" fontSize="8">0</text>
                <text x="100" y="78" fill="#52525b" fontSize="8">5</text>
                <text x="180" y="78" fill="#52525b" fontSize="8">10</text>
                <text x="260" y="78" fill="#52525b" fontSize="8">15</text>
                <text x="340" y="78" fill="#52525b" fontSize="8">20</text>
                <text x="420" y="78" fill="#52525b" fontSize="8">25</text>
                <text x="480" y="78" fill="#52525b" fontSize="8">30</text>
              </svg>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 3: WHY HORIZON (3B - 3 Obsidian Pillar Cards)
          ========================================================================= */}
      <section
        id="why"
        className="min-h-screen w-full relative flex flex-col justify-center items-center px-4 sm:px-8 py-16 border-t border-white/[0.05] overflow-hidden"
      >
        {/* Soft Ambient Ethereal Glows */}
        <div
          className="absolute top-[30%] left-[10%] w-[540px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />
        <div
          className="absolute top-[30%] right-[10%] w-[540px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(234, 138, 28, 0.12) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-3">
            A waiting room designed for human dignity.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Three simple reasons we threw away the clinical clipboards.
          </p>
        </div>

        {/* 3 Obsidian Glass Cards (Matching 3B) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Card 1: De-escalate Anxiety */}
          <div
            className="rounded-2xl border border-white/[0.08] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-white/20"
            style={{
              background: 'rgba(15, 15, 20, 0.75)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              De-escalate Anxiety
            </h3>

            {/* Calm Wave Graphic */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <svg viewBox="0 0 160 50" className="w-36 h-14 overflow-visible">
                <path
                  d="M 10 25 C 40 25, 55 5, 80 25 C 105 45, 120 25, 150 25"
                  fill="none"
                  stroke="#a1a1aa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="opacity-80"
                />
              </svg>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Calm wave indicator: Soothing and fluid interaction designed to reduce nervous system stress while waiting.
            </p>
          </div>

          {/* Card 2: A Peer, Not An Interrogator */}
          <div
            className="rounded-2xl border border-white/[0.08] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-white/20"
            style={{
              background: 'rgba(15, 15, 20, 0.75)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              A Peer, Not An Interrogator
            </h3>

            {/* Sophia Chat Bubble Graphic */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800/80 border border-white/10 text-xs text-zinc-200 shadow-md">
                <MessageSquare size={14} className="text-zinc-400" />
                <span className="font-medium">Sophia</span>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Peer support interaction: A friendly, grounded companion sitting with you. Zero unsolicited advice, zero clinical checklists.
            </p>
          </div>

          {/* Card 3: Doctor Walks In Aligned */}
          <div
            className="rounded-2xl border border-white/[0.08] p-8 flex flex-col items-center text-center backdrop-blur-2xl transition-all duration-300 hover:border-white/20"
            style={{
              background: 'rgba(15, 15, 20, 0.75)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">
              Doctor Walks In Aligned
            </h3>

            {/* Clinical Readiness Medal Graphic */}
            <div className="w-full h-24 flex items-center justify-center my-auto">
              <div className="w-12 h-12 rounded-full bg-white/[0.06] border border-white/15 flex items-center justify-center text-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                <Award size={22} />
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mt-6">
              Clinical readiness badge: Your psychiatrist receives an instant 4Ps formulation, so your appointment begins with deep human connection.
            </p>
          </div>
        </div>
      </section>


      {/* =========================================================================
          SCREEN 4: ABOUT & 24/7 CRISIS SAFETY (Matching Picture 4)
          ========================================================================= */}
      <section
        id="about"
        className="min-h-screen w-full relative flex flex-col justify-between items-center px-4 sm:px-8 py-16 border-t border-white/[0.05] overflow-hidden"
      >
        {/* Soft Ambient Ethereal Glows */}
        <div
          className="absolute top-[20%] left-[10%] w-[580px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />
        <div
          className="absolute top-[25%] right-[10%] w-[580px] h-[480px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(234, 138, 28, 0.12) 0%, transparent 65%)',
            filter: 'blur(130px)'
          }}
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center mt-4 mb-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.16] mb-3">
            A gentler start to therapy.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
            Built to eliminate the most anxiety-inducing 15 minutes in modern healthcare.
          </p>
        </div>

        {/* Centerpiece Console Window (Matching Picture 4) */}
        <div
          className="relative z-10 w-full max-w-4xl rounded-2xl border border-white/[0.08] p-8 sm:p-10 backdrop-blur-2xl my-auto"
          style={{
            background: 'rgba(15, 15, 20, 0.85)',
            boxShadow: '0 30px 90px -15px rgba(0, 0, 0, 0.95), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Column: Our Clinical Philosophy */}
            <div className="md:col-span-7 text-left space-y-5">
              <div>
                <h3 className="text-xl font-semibold text-white tracking-tight">
                  Our Clinical Philosophy
                </h3>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] text-zinc-300 font-medium mt-2">
                  <Shield size={11} className="text-zinc-400" />
                  <span>Patient privacy badge</span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300">
                  <EyeOff size={16} />
                </div>
                <span className="text-base font-semibold text-white">
                  Zero Advertising Access
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-zinc-400 pt-1">
                <span className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider block">
                  Empathetic intake values
                </span>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Heart size={13} className="text-zinc-500" />
                  <span>Compassionate Onboarding</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Heart size={13} className="text-zinc-500" />
                  <span>Patient-Centric Approach</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-300">
                  <Lock size={13} className="text-zinc-500" />
                  <span>Confidential Care Path</span>
                </div>
              </div>
            </div>

            {/* Right Column: 24/7 Immediate Crisis Support (Glowing Amber Box) */}
            <div className="md:col-span-5">
              <div
                className="rounded-2xl border border-amber-500/30 p-6 flex flex-col items-center text-center relative overflow-hidden"
                style={{
                  background: 'rgba(234, 138, 28, 0.04)',
                  boxShadow: '0 0 35px rgba(234, 138, 28, 0.12)'
                }}
              >
                <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-[11px] font-semibold text-amber-200 mb-3">
                  24/7 Immediate Crisis Support
                </span>

                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white my-1">
                  988
                </div>
                <p className="text-xs text-zinc-400 mb-5">
                  Suicide & Crisis Lifeline
                </p>

                <div className="flex items-center gap-3 w-full">
                  <a
                    href="tel:988"
                    className="flex-1 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Phone size={13} />
                    <span>Call</span>
                  </a>
                  <a
                    href="sms:988"
                    className="flex-1 py-2.5 px-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <MessageSquare size={13} />
                    <span>Text</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <footer className="relative z-10 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 pt-6 pb-2 border-t border-white/[0.04]">
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
