import React, { useState } from 'react';
import { ShieldCheck, Stethoscope, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

export const LotusIcon = ({ className = "w-7 h-7" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 3.5C10.8 7 10.5 10.2 10.5 13.2C10.5 16 11.2 18 12 18.8C12.8 18 13.5 16 13.5 13.2C13.5 10.2 13.2 7 12 3.5Z" />
    <path d="M7.8 7.5C6.8 10.5 7.2 13.5 8.5 15.8C9.5 17.5 10.8 18.5 11.8 18.8C10.5 17 9.8 14.5 9.8 12C9.8 10 10.2 8.5 10.8 7.2C9.5 7 8.5 7.2 7.8 7.5Z" opacity="0.8" />
    <path d="M16.2 7.5C17.2 10.5 16.8 13.5 15.5 15.8C14.5 17.5 13.2 18.5 12.2 18.8C13.5 17 14.2 14.5 14.2 12C14.2 10 13.8 8.5 13.2 7.2C14.5 7 15.5 7.2 16.2 7.5Z" opacity="0.8" />
    <path d="M4.5 13C3.8 15 4.5 17.2 6.2 18.5C8 19.5 10 19.2 11.5 18.8C9.2 18.2 7.5 17 6.5 15.2C5.8 14 5.2 13.2 4.5 13Z" opacity="0.6" />
    <path d="M19.5 13C20.2 15 19.5 17.2 17.8 18.5C16 19.5 14 19.2 12.5 18.8C14.8 18.2 16.5 17 17.5 15.2C18.2 14 18.8 13.2 19.5 13Z" opacity="0.6" />
  </svg>
);

export default function LoginCard({ onLoginSuccess }) {
  const [role, setRole] = useState('doctor'); // 'doctor' | 'admin'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    setError(null);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const validDoctorUser = import.meta.env.VITE_DOCTOR_USER ? import.meta.env.VITE_DOCTOR_USER.trim().toLowerCase() : '';
    const validDoctorPass = import.meta.env.VITE_DOCTOR_PASSWORD ? import.meta.env.VITE_DOCTOR_PASSWORD.trim() : '';
    const validAdminUser = import.meta.env.VITE_ADMIN_USER ? import.meta.env.VITE_ADMIN_USER.trim().toLowerCase() : '';
    const validAdminPass = import.meta.env.VITE_ADMIN_PASSWORD ? import.meta.env.VITE_ADMIN_PASSWORD.trim() : '';

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    if (!inputUser || !inputPass) {
      setError('Please provide both username and password.');
      setSubmitting(false);
      return;
    }

    if (validDoctorUser && inputUser === validDoctorUser && inputPass === validDoctorPass) {
      onLoginSuccess({
        role: 'doctor',
        displayName: 'Attending Psychiatrist',
        username: inputUser
      });
      return;
    }

    if (validAdminUser && inputUser === validAdminUser && inputPass === validAdminPass) {
      onLoginSuccess({
        role: 'admin',
        displayName: 'Clinic Administrator',
        username: inputUser
      });
      return;
    }

    setError('Invalid credentials.');
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen w-screen bg-[#080e15] flex items-center justify-center relative overflow-hidden p-4">
      {/* Ambient background glow */}
      <div
        className="absolute top-[20%] right-[25%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, rgba(14, 116, 144, 0.12) 40%, transparent 70%)',
          filter: 'blur(110px)'
        }}
      />
      <div
        className="absolute bottom-[10%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%)',
          filter: 'blur(100px)'
        }}
      />

      {/* Login Card */}
      <div className="w-full max-w-md glass-card rounded-2xl p-8 shadow-2xl relative z-10 border border-white/10">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent border border-teal-500/30 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
            <LotusIcon className="w-8 h-8 text-teal-300" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Horizon Clinic</h1>
          <p className="text-xs text-slate-400 mt-1">Clinical Command Center & Administration</p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#0b121e] rounded-xl border border-white/5 mb-6">
          <button
            type="button"
            onClick={() => handleSelectRole('doctor')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'doctor'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Stethoscope size={14} />
            Doctor / Clinician
          </button>
          <button
            type="button"
            onClick={() => handleSelectRole('admin')}
            className={`flex items-center justify-center gap-2 py-2 text-xs font-semibold rounded-lg transition-all ${
              role === 'admin'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck size={14} />
            Administrator
          </button>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-5 px-3.5 py-2.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle size={15} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Username
            </label>
            <div className="relative flex items-center">
              <User size={16} className="absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={role === 'doctor' ? 'doctor' : 'admin'}
                className="w-full bg-[#0a1019] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition-all"
                autoComplete="username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3.5 text-slate-500 pointer-events-none" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a1019] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:ring-1 focus:ring-teal-500/40 transition-all"
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-[#041014] bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 shadow-[0_0_20px_rgba(20,184,166,0.4)] hover:shadow-[0_0_28px_rgba(20,184,166,0.6)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>Access Command Center</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
