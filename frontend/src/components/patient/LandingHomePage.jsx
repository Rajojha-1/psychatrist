import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  HeartPulse,
  Brain,
  Shield,
  Sparkles,
  Compass,
  MessageSquare,
  Clock,
  CheckCircle2,
  Lock,
  Users,
  Activity,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

export default function LandingHomePage({ onCheckIn, loading, error, onDoctorAccess }) {
  const [name, setName] = useState('');
  const checkInInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onCheckIn(name.trim());
  };

  const scrollToHeroCheckin = () => {
    const el = document.getElementById('checkin-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (checkInInputRef.current) {
      setTimeout(() => {
        checkInInputRef.current?.focus();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070b12] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Ambient Lighting Orbs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Warm Amber Glow (Top Left) */}
        <div
          className="absolute -top-32 left-[10%] w-[580px] h-[580px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(234, 138, 28, 0.22) 0%, rgba(217, 119, 6, 0.08) 45%, transparent 70%)',
            filter: 'blur(120px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        {/* Luminous Turquoise Glow (Center Right) */}
        <div
          className="absolute top-[8%] right-[8%] w-[680px] h-[680px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(45, 212, 191, 0.24) 0%, rgba(20, 184, 166, 0.08) 50%, transparent 75%)',
            filter: 'blur(130px)',
            transform: 'translate3d(0, 0, 0)'
          }}
        />
        {/* Subtle Violet Hue (Mid Page) */}
        <div
          className="absolute top-[45%] left-[5%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)',
            filter: 'blur(140px)'
          }}
        />
      </div>

      {/* TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[#070b12]/75 border-b border-white/[0.07] px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.25)] group-hover:scale-105 transition-transform">
              <HeartPulse size={19} className="animate-pulse" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
                Horizon Health
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-teal-500/15 border border-teal-500/30 text-teal-300">
                  Clinic
                </span>
              </span>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-normal">Next-Gen Psychiatric Intake</p>
            </div>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-300">
            <a href="#home" className="hover:text-teal-300 transition-colors">Home</a>
            <a href="#why-horizon" className="hover:text-teal-300 transition-colors">Why Horizon</a>
            <a href="#how-it-works" className="hover:text-teal-300 transition-colors">How It Works</a>
            <a href="#mental-health" className="hover:text-teal-300 transition-colors">Mental Health Framework</a>
            <a href="#about" className="hover:text-teal-300 transition-colors">About</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            {onDoctorAccess && (
              <button
                onClick={onDoctorAccess}
                className="hidden sm:inline-flex text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/10 transition"
              >
                Clinician Portal
              </button>
            )}
            <button
              onClick={scrollToHeroCheckin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-teal-400 text-slate-950 hover:bg-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.4)] transition-all active:scale-95 cursor-pointer"
            >
              <span>Enter Waiting Room</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative z-10 pt-12 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-teal-300 text-xs font-semibold mb-6 shadow-sm">
            <Sparkles size={13} className="text-teal-400" />
            <span>Compassionate Clinical Care Begins Before You Speak to Your Doctor</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.14] mb-6">
            A tranquil space to unpack your mind while you wait.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-4">
            No sterile 50-question clinical checklists. No repeating painful trauma to staff over and over.
            Settle into our serene waiting space, take a quiet breath, and chat naturally with your peer companion <strong className="text-teal-300 font-semibold">Sophia</strong> while your psychiatrist prepares your care.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-teal-400" />
              <span>100% Confidential & Secure</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-amber-400" />
              <span>Average Wait Time: 8 Mins</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5">
              <Shield size={14} className="text-teal-400" />
              <span>Zero Interrogation Anxiety</span>
            </span>
          </div>
        </div>

        {/* HERO INTERACTIVE CHECK-IN CARD */}
        <div
          id="checkin-form"
          className="relative z-20 max-w-2xl mx-auto rounded-3xl border border-white/[0.14] p-6 sm:p-10 mb-16 shadow-2xl transition-all"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
            boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">Patient Check-In</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to Horizon Clinic.
          </h2>
          <p className="text-sm text-slate-300 mb-6">
            What can we call you while you relax in the waiting room?
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <input
                ref={checkInInputRef}
                type="text"
                className="flex-1 min-w-0 bg-[#0e1420]/80 border border-white/15 rounded-2xl px-5 py-4 text-white text-base placeholder-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/30 transition-all shadow-inner"
                placeholder="Enter your name or preferred nickname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                autoFocus
                maxLength={40}
              />
              <button
                type="submit"
                className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl font-bold text-base whitespace-nowrap transition-all cursor-pointer hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
                style={{
                  backgroundColor: '#99f6e4',
                  color: '#064e3b',
                  boxShadow: '0 0 32px rgba(153, 246, 228, 0.6)'
                }}
                disabled={loading}
              >
                <span>{loading ? 'Preparing Room...' : 'Enter Waiting Room'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle size={16} className="flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-white/5">
            <span>● Attending psychiatrist is currently in session</span>
            <span className="text-teal-400 font-medium">Session ID is generated securely</span>
          </div>
        </div>

        {/* HERO IMAGE SHOWCASE */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.8)]">
          <div className="relative aspect-[16/9] w-full max-h-[560px] overflow-hidden">
            <img
              src="/hero_sanctuary.jpg"
              alt="Horizon Mental Health Sanctuary Waiting Space"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-1000"
            />
            {/* Soft dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b12] via-transparent to-black/20 pointer-events-none" />

            {/* Floating Glassmorphic Badges on Image */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 pointer-events-none">
              <div className="bg-slate-900/80 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300">
                  <Compass size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Affective Circumplex Model</h4>
                  <p className="text-[11px] text-slate-300">Continuous Valence & Arousal tracking</p>
                </div>
              </div>

              <div className="hidden sm:flex bg-slate-900/80 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl shadow-xl items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300">
                  <Brain size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">4 Ps Biopsychosocial Formulation</h4>
                  <p className="text-[11px] text-slate-300">Predisposing, Precipitating, Perpetuating, Protective</p>
                </div>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-white/15 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Peer Grounding Presence</h4>
                  <p className="text-[11px] text-slate-300">Calming pre-visit anticipatory dread</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHY USE HORIZON (WHY USE IT SECTION) */}
      <section id="why-horizon" className="relative z-10 py-20 px-6 lg:px-12 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Why Horizon Health</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
              Why traditional clinical intake breaks down — and how we fix it.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              When a patient sits in a cold clinic clutching a clipboard, anticipatory anxiety spikes. Clinical questions feel like an interrogation, leading to masking and missed psychiatric nuances.
            </p>
          </div>

          {/* Side by Side Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* The Traditional Waiting Room (Pain Points) */}
            <div className="rounded-3xl border border-rose-500/20 bg-rose-950/10 p-8 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-6">
                  <span>The Traditional Clinic Experience</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Cold, Clinical, & Interrogative</h3>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-base mt-0.5">✕</span>
                    <span><strong>Rigid 50-Item Questionnaires:</strong> Patients rush through impersonal checkboxes that fail to capture the real human story.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-base mt-0.5">✕</span>
                    <span><strong>Repeating Trauma Over & Over:</strong> Patients must re-tell their darkest struggles to receptionists, nurses, and doctors consecutively.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-base mt-0.5">✕</span>
                    <span><strong>Heightened Waiting Anxiety:</strong> Sitting in silence watching the clock spikes agitation and physiological stress response.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-rose-400 font-bold text-base mt-0.5">✕</span>
                    <span><strong>Rushed 15-Minute Consultations:</strong> Psychiatrists spend valuable appointment time on administrative intake instead of therapeutic alliance.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-rose-500/15 text-xs text-rose-300 font-medium">
                Result: Patients feel labeled rather than understood.
              </div>
            </div>

            {/* The Horizon Way (Benefits) */}
            <div className="rounded-3xl border border-teal-500/30 bg-teal-950/15 p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(20,184,166,0.1)]">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-6">
                  <span>The Horizon Health Sanctuary</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">Warm, Conversational, & Attuned</h3>
                <ul className="space-y-4 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Natural Peer Conversation:</strong> Chat casually with Sophia about your day or sleep without judgment or corporate clinical jargon.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Unsolicited Advice:</strong> Sophia holds space—she never offers patronizing life-coaching or clichéd positive affirmations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Silent Psychiatric Telemetry:</strong> In the background, our clinical observer synthesizes a board-certified 4Ps diagnostic dossier.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Immediate Doctor Alignment:</strong> Your psychiatrist steps in already knowing your emotional baseline and triggers.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-8 pt-4 border-t border-teal-500/20 text-xs text-teal-300 font-medium flex items-center justify-between">
                <span>Result: Deep therapeutic connection from minute one.</span>
                <span className="text-teal-400">✓ Biopsychosocial Care</span>
              </div>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Shield size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Psychological Grounding</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                By exchanging genuine, low-pressure dialogue with a waiting room peer, nervous system agitation down-regulates before clinical evaluation.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                <Layers size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Multi-Stream Telemetry</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Extracts emotional valence, autonomic arousal, and linguistic self-focus pronoun density to reveal distress patterns invisible on paper forms.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                <Lock size={20} />
              </div>
              <h4 className="text-base font-bold text-white mb-2">Confidential & Ephemeral</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Intake data is synthesized strictly for your attending psychiatrist's clinical dossier. You have complete autonomy over what you share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MENTAL HEALTH & CLINICAL FRAMEWORK SECTION (MENTAL HEADING) */}
      <section id="mental-health" className="relative z-10 py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Clinical Psychiatry Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
              Groundbreaking Biopsychosocial & Affective Psychometrics.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Modern mental health isn't about slapping diagnostic labels on people. It's about mapping the intricate balance between life stressors, biology, and protective anchors.
            </p>
          </div>

          {/* 4 Ps Framework Cards */}
          <div className="mb-14">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-6 flex items-center gap-2">
              <Compass size={15} />
              <span>The 4 Ps Formulation Model (Psychiatric Standard)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* 1. Predisposing */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-teal-500/40 transition-colors">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Background
                </span>
                <h4 className="text-base font-bold text-white mt-3 mb-2">Predisposing Factors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Historical and biological foundations: family psychiatric history, childhood experiences, temperament, and genetic predispositions that shaped current baseline resilience.
                </p>
              </div>

              {/* 2. Precipitating */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-teal-500/40 transition-colors">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Why Now?
                </span>
                <h4 className="text-base font-bold text-white mt-3 mb-2">Precipitating Factors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The acute catalyst: recent bereavement, sudden job loss, relationship rupture, or workplace burnout that overwhelmed coping reserves and triggered this visit.
                </p>
              </div>

              {/* 3. Perpetuating */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-teal-500/40 transition-colors">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Maintenance
                </span>
                <h4 className="text-base font-bold text-white mt-3 mb-2">Perpetuating Factors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The continuous feedback loops: chronic insomnia, rumination, social withdrawal, or negative cognitive distortions that keep the depressive or anxious state alive.
                </p>
              </div>

              {/* 4. Protective */}
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 hover:border-teal-500/40 transition-colors">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Anchors
                </span>
                <h4 className="text-base font-bold text-white mt-3 mb-2">Protective Factors</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The lifelines: intact insight, love for children or pets, stable friendships, hobbies, or personal values that provide the foundation for clinical recovery.
                </p>
              </div>
            </div>
          </div>

          {/* Russell's Circumplex & Tone Spectrum Banner */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-teal-950/30 via-slate-900/60 to-purple-950/30 p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4">
                <Activity size={14} />
                <span>Continuous Psychometrics</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Russell's Affective Circumplex</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Instead of forcing complex emotions into crude binary buckets, Horizon plots turn-by-turn conversational affect across a 2-dimensional continuum: <strong>Valence</strong> (pleasure vs. displeasure) and <strong>Arousal</strong> (agitation vs. blunting).
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-rose-300 border border-rose-500/20">Panic / High Distress</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-purple-300 border border-purple-500/20">Depressive Blunting</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-teal-300 border border-teal-500/20">Calm / Euthymic</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-amber-300 border border-amber-500/20">Agitated Activation</span>
              </div>
            </div>

            <div className="flex-shrink-0 text-center lg:text-right">
              <button
                onClick={scrollToHeroCheckin}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 hover:brightness-110 shadow-[0_0_30px_rgba(45,212,191,0.4)] transition-all cursor-pointer"
              >
                <span>Experience It Yourself</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative z-10 py-20 px-6 lg:px-12 border-t border-white/5 bg-slate-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Simple & Seamless</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
              How the waiting room session flows.
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Three effortless steps from your phone or clinic tablet to an enlightened consultation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-300 text-lg font-bold mb-6">
                  01
                </div>
                <h3 className="text-lg font-bold text-white mb-3">One-Click Check-In</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Type in your preferred name or nickname. No insurance cards, no 20-digit national IDs, and no tedious login passwords required upfront.
                </p>
              </div>
              <div className="text-[11px] text-teal-400 font-semibold flex items-center gap-1">
                <span>Takes less than 5 seconds</span>
                <ChevronRight size={12} />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative rounded-3xl border border-teal-500/30 bg-teal-950/10 p-8 flex flex-col justify-between shadow-[0_0_30px_rgba(20,184,166,0.1)]">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-300 text-lg font-bold mb-6">
                  02
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Decompress with Sophia</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Settle into the waiting room chat. Sophia is an empathetic peer waiting room companion. Talk about your day, your stress, your caffeine, or just take a minute to breathe.
                </p>
              </div>
              <div className="text-[11px] text-teal-300 font-semibold flex items-center gap-1">
                <span>Zero clinical interrogation</span>
                <ChevronRight size={12} />
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-8 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-300 text-lg font-bold mb-6">
                  03
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Attuned Doctor Consultation</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  When your psychiatrist calls you into the office, they have already received a synthesized clinical dossier. Your consultation starts at the heart of what matters.
                </p>
              </div>
              <div className="text-[11px] text-amber-400 font-semibold flex items-center gap-1">
                <span>Deeper healing & focus</span>
                <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ABOUT SECTION */}
      <section id="about" className="relative z-10 py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mt-2 mb-4">
              Humanizing the most stressful 15 minutes in healthcare.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Horizon Health was founded on a simple observation: patients experience their highest spikes of anticipatory dread while sitting in the waiting room. By transforming this idle time into a calm sanctuary, we heal the intake experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/50 rounded-3xl border border-white/10 p-8 sm:p-12">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Built with Clinicians, for Patients</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                We believe computational linguistics and affective computing should never feel like cold surveillance. Every element of Horizon Health is designed to protect patient dignity, foster psychological safety, and give doctors the rich context they need to deliver world-class care.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">100%</div>
                  <div className="text-[10px] text-slate-400 uppercase">Non-Interrogative</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">4 Ps</div>
                  <div className="text-[10px] text-slate-400 uppercase">Formulation</div>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-300">&lt; 8 min</div>
                  <div className="text-[10px] text-slate-400 uppercase">Avg Decompression</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0c121d] p-6 text-xs text-slate-300 space-y-3">
              <div className="flex items-center gap-2 text-teal-400 font-bold">
                <Sparkles size={15} />
                <span>Our Core Principles</span>
              </div>
              <p className="text-slate-300">
                1. <strong>No Toxic Positivity:</strong> We never offer hollow pep talks or unsolicited motivational slogans.
              </p>
              <p className="text-slate-300">
                2. <strong>Patient Autonomy:</strong> Speak as much or as little as you like. Silence is welcomed.
              </p>
              <p className="text-slate-300">
                3. <strong>Clinical Rigor:</strong> We adhere strictly to board-certified psychiatric formulation paradigms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CRISIS SUPPORT NOTICE BANNER */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pb-12">
        <div className="rounded-2xl border border-amber-500/25 bg-amber-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200">
          <div className="flex items-center gap-3">
            <AlertCircle size={18} className="text-amber-400 flex-shrink-0" />
            <span>
              <strong>Immediate Crisis Notice:</strong> If you are experiencing acute distress, suicidal ideation, or a medical emergency, please call or text <strong>988</strong> (Suicide & Crisis Lifeline) or contact local emergency services immediately.
            </span>
          </div>
          <span className="text-[11px] font-mono text-amber-300/80 uppercase tracking-wider whitespace-nowrap">
            24/7 Available
          </span>
        </div>
      </div>

      {/* 7. FOOTER */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#05080e] py-12 px-6 lg:px-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <HeartPulse size={13} />
            </div>
            <span className="font-semibold text-slate-300">Horizon Health Clinic</span>
            <span>• Stealth Psychiatric Intake & Telemetry</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-slate-300 transition-colors">Home</a>
            <a href="#why-horizon" className="hover:text-slate-300 transition-colors">Why Horizon</a>
            <a href="#mental-health" className="hover:text-slate-300 transition-colors">Mental Health</a>
            <a href="#about" className="hover:text-slate-300 transition-colors">About</a>
            {onDoctorAccess && (
              <button onClick={onDoctorAccess} className="hover:text-teal-300 transition-colors">
                Clinician Portal
              </button>
            )}
          </div>

          <div>
            © {new Date().getFullYear()} Horizon Health Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
