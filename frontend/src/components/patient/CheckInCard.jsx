import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function CheckInCard({ onCheckIn, loading, error, onDoctorAccess }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onCheckIn(name.trim());
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0d14] flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden select-none font-sans">
      {/* Ambient Lighting Orbs - Exactly matching Image 1 */}
      {/* 1. Warm Amber Glow (Top Left) */}
      <div
        className="absolute -top-10 left-[15%] w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(234, 138, 28, 0.38) 0%, rgba(217, 119, 6, 0.15) 40%, transparent 70%)',
          filter: 'blur(90px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* 2. Luminous Turquoise Glow (Top/Center Right behind button) */}
      <div
        className="absolute top-[10%] right-[12%] w-[540px] h-[540px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.35) 0%, rgba(20, 184, 166, 0.12) 45%, transparent 70%)',
          filter: 'blur(100px)',
          transform: 'translate3d(0, 0, 0)'
        }}
      />

      {/* Frosted Glassmorphism Card */}
      <div
        className="relative z-10 w-full max-w-[740px] rounded-[28px] border border-white/[0.12] p-8 sm:p-14 transition-all"
        style={{
          background: 'rgba(255, 255, 255, 0.035)',
          backdropFilter: 'blur(36px)',
          WebkitBackdropFilter: 'blur(36px)',
          boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.7), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)'
        }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] font-bold text-white tracking-tight leading-[1.22] mb-5">
          Welcome to Horizon Health. Settle in, your appointment is shortly.
        </h1>

        <p className="text-base sm:text-lg text-gray-300 font-normal mb-8">
          What can we call you while you wait?
        </p>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
            <input
              type="text"
              className="flex-1 min-w-0 bg-[#0e131d]/60 border border-white/10 rounded-2xl px-5 py-4 text-white text-base placeholder-gray-400 outline-none focus:border-teal-300/80 focus:ring-1 focus:ring-teal-300/40 transition-all shadow-inner"
              placeholder="Enter your name or nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoFocus
              maxLength={40}
            />
            <button
              type="submit"
              className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-base whitespace-nowrap transition-all cursor-pointer hover:brightness-105 active:scale-[0.98]"
              style={{
                backgroundColor: '#99f6e4',
                color: '#064e3b',
                boxShadow: '0 0 35px rgba(153, 246, 228, 0.65)'
              }}
              disabled={loading}
            >
              <span>{loading ? 'Preparing Room...' : 'Enter Waiting Room'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Bottom Center Status Caption */}
      <div className="absolute bottom-7 left-0 right-0 text-center text-xs sm:text-sm text-gray-400 font-normal tracking-wide">
        Doctor is currently in session • Average wait time: 8 mins
      </div>
    </div>
  );
}
