import React from 'react';
import {
  Activity,
  RotateCw,
  LogOut,
  Archive,
  Settings,
  Stethoscope,
  ShieldCheck,
  Radio
} from 'lucide-react';
import { LotusIcon } from '../auth/LoginCard';

export default function Header({
  activeTab,
  setActiveTab,
  user,
  onLogout,
  onRefresh,
  refreshing,
  autoPoll,
  setAutoPoll,
  activeQueueCount = 0
}) {
  return (
    <header className="h-16 px-6 bg-[#0a111a]/90 backdrop-blur-xl border-b border-white/[0.08] flex items-center justify-between z-30 flex-shrink-0">
      {/* Brand & Title */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.3)]">
            <LotusIcon className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 text-sm tracking-tight">Horizon Clinic</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300">
                Command Center
              </span>
            </div>
            <p className="text-[11px] text-slate-400">Psychiatric Intake Telemetry & Dossier Suite</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-white/10">
          <button
            onClick={() => setActiveTab('live')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'live'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_12px_rgba(20,184,166,0.25)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Activity size={14} />
            <span>Live Queue</span>
            {activeQueueCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-teal-400 text-slate-900 font-bold">
                {activeQueueCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('archive')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'archive'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_12px_rgba(20,184,166,0.25)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Archive size={14} />
            <span>Session Archive</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'settings'
                ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 shadow-[0_0_12px_rgba(20,184,166,0.25)]'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
            }`}
          >
            <Settings size={14} />
            <span>Clinic Settings</span>
          </button>
        </nav>
      </div>

      {/* Right Controls: Auto-poll, Refresh, User Profile, Logout */}
      <div className="flex items-center gap-3">
        {/* Live Auto-Poll Status Button */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111a27] border border-white/10 text-xs text-slate-300">
          <button
            type="button"
            onClick={() => setAutoPoll(!autoPoll)}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            title={autoPoll ? 'Pause Live Polling' : 'Resume Live Polling'}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                autoPoll
                  ? 'bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse'
                  : 'bg-slate-500'
              }`}
            />
            <span className="text-[11px] font-medium">
              {autoPoll ? 'Live Sync (4s)' : 'Paused'}
            </span>
          </button>

          <span className="text-slate-600">|</span>

          {/* Manual Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="text-slate-400 hover:text-teal-300 transition-colors p-0.5 disabled:opacity-50"
            title="Refresh Queue Now"
          >
            <RotateCw size={13} className={refreshing ? 'animate-spin text-teal-400' : ''} />
          </button>
        </div>

        {/* Active Clinician Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111a27] border border-white/10 text-xs">
          {user?.role === 'admin' ? (
            <ShieldCheck size={14} className="text-cyan-400" />
          ) : (
            <Stethoscope size={14} className="text-teal-400" />
          )}
          <span className="text-slate-200 font-medium text-xs">{user?.displayName || 'Clinician'}</span>
        </div>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
          title="Sign Out"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
