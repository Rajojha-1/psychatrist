import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  HeartPulse,
  Clock,
  Shield,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Info,
  Check
} from 'lucide-react';

export default function LandingHomePage({ onCheckIn, loading, error }) {
  const [tab, setTab] = useState('checkin'); // 'checkin' | 'why' | 'about'
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onCheckIn(name.trim());
  };

  const handleGoToCheckin = () => {
    setTab('checkin');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080c14] flex flex-col justify-between px-4 sm:px-8 py-6 select-none font-sans text-slate-200 overflow-hidden">
      {/* Subtle Ambient Glows - Sleek and tasteful */}
      <div
        className="absolute -top-24 left-[15%] w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(234, 138, 28, 0.16) 0%, rgba(217, 119, 6, 0.04) 50%, transparent 70%)',
          filter: 'blur(110px)',
          transform: 'translate3d(0,0,0)'
        }}
      />
      <div
        className="absolute top-[15%] right-[12%] w-[580px] h-[580px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.18) 0%, rgba(20, 184, 166, 0.05) 50%, transparent 75%)',
          filter: 'blur(120px)',
          transform: 'translate3d(0,0,0)'
        }}
      />

      {/* TOP HEADER & MINIMAL TABS */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex items-center justify-between pt-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.2)]">
            <HeartPulse size={16} />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">
            Horizon Health
          </span>
        </div>

        {/* Minimal Pill Tabs (Linear / Calm Style) */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
          <button
            onClick={() => setTab('checkin')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              tab === 'checkin'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Check In
          </button>
          <button
            onClick={() => setTab('why')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              tab === 'why'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Why Horizon
          </button>
          <button
            onClick={() => setTab('about')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              tab === 'about'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            About
          </button>
        </div>
      </header>

      {/* MAIN CENTERPIECE */}
      <main className="relative z-10 w-full max-w-2xl mx-auto my-auto py-10">
        {/* TAB 1: CHECK IN (DEFAULT) */}
        {tab === 'checkin' && (
          <div className="rounded-[28px] border border-white/[0.12] p-8 sm:p-12 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Waiting Room Companion</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-[1.2] mb-4">
              Take a breath.<br />
              <span className="text-slate-400 font-normal">Your doctor will see you shortly.</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
              No medical clipboards or 50-question checklists. Sophia is waiting in the room—chat casually about your day, or just sit quietly while you wait.
            </p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 min-w-0 bg-[#0c121e]/80 border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-slate-400 outline-none focus:border-teal-400/80 focus:ring-1 focus:ring-teal-400/40 transition-all shadow-inner"
                  placeholder="What can we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  autoFocus
                  maxLength={40}
                />
                <button
                  type="submit"
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-base whitespace-nowrap transition-all cursor-pointer hover:brightness-105 active:scale-[0.98] disabled:opacity-50"
                  style={{
                    backgroundColor: '#99f6e4',
                    color: '#064e3b',
                    boxShadow: '0 0 30px rgba(153, 246, 228, 0.5)'
                  }}
                  disabled={loading}
                >
                  <span>{loading ? 'Entering...' : 'Enter Waiting Room'}</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle size={15} className="text-rose-400 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Clock size={13} className="text-amber-400" />
                <span>Average wait: ~8 mins</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={13} className="text-teal-400" />
                <span>Private & confidential</span>
              </span>
            </div>
          </div>
        )}

        {/* TAB 2: WHY HORIZON */}
        {tab === 'why' && (
          <div className="rounded-[28px] border border-white/[0.12] p-8 sm:p-12 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-6">
              <span>Why We Don't Use Clipboards</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Waiting rooms suck.<br />
              <span className="text-slate-400 font-normal">We made them human.</span>
            </h2>

            <div className="space-y-5 text-sm text-slate-300 mb-8 leading-relaxed">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <strong className="text-white">Waiting room anxiety is real.</strong>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Sitting in silence watching the clock spikes your stress. Having to tick checkboxes about your trauma on a clipboard under fluorescent lights makes you feel like a case number.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <strong className="text-white">Sophia is a peer, not an interrogator.</strong>
                  <p className="text-slate-400 text-xs mt-0.5">
                    She doesn’t lecture, give unsolicited life advice, or sound like a clinical robot. She’s just someone waiting in the room with you. You can talk about your morning, your coffee, or your anxiety.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <strong className="text-white">Your doctor actually gets the picture.</strong>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Instead of spending the first 20 minutes of your session asking basic intake questions, your psychiatrist walks in already understanding what's going on—so your consultation can focus on real care.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleGoToCheckin}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all cursor-pointer"
            >
              <span>Ready? Enter the waiting room</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* TAB 3: ABOUT */}
        {tab === 'about' && (
          <div className="rounded-[28px] border border-white/[0.12] p-8 sm:p-12 transition-all duration-300"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
            }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-6">
              <span>About Horizon Clinic</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              A gentler start to therapy.
            </h2>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed mb-8">
              <p>
                Healthcare usually focuses entirely on the consultation room, ignoring the agonizing 15 minutes patients spend waiting beforehand. We turn that idle, tense time into a quiet space to settle your thoughts.
              </p>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="text-xs font-semibold text-teal-300">Privacy & Care</div>
                <p className="text-xs text-slate-400">
                  Everything you share is strictly confidential. In the background, your session generates a clinical dossier for your attending psychiatrist, highlighting your emotional state, stressors, and protective anchors so they can support you effectively.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-2.5 mb-6">
              <AlertCircle size={15} className="text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Crisis Support:</strong> If you are in immediate danger or experiencing thoughts of self-harm, please call or text <strong>988</strong> (Suicide & Crisis Lifeline) or your local emergency services.
              </span>
            </div>

            <button
              onClick={handleGoToCheckin}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs bg-teal-400 text-slate-950 hover:bg-teal-300 transition-all cursor-pointer"
            >
              <span>Back to Check In</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 pb-2">
        <div className="flex items-center gap-2">
          <span>Horizon Health</span>
          <span>•</span>
          <span>Gentle Psychiatric Waiting Space</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setTab('why')} className="hover:text-slate-200 transition-colors cursor-pointer">
            Why Horizon
          </button>
          <button onClick={() => setTab('about')} className="hover:text-slate-200 transition-colors cursor-pointer">
            About
          </button>
        </div>
      </footer>
    </div>
  );
}
