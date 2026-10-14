import React, { useState, useEffect } from 'react';
import { Settings, Server, Cpu, Shield, Users, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { checkBackendHealth } from '../../services/api';

export default function ClinicSettings() {
  const [backendOnline, setBackendOnline] = useState(null);
  const [checking, setChecking] = useState(false);

  const testHealth = async () => {
    setChecking(true);
    const ok = await checkBackendHealth();
    setBackendOnline(ok);
    setChecking(false);
  };

  useEffect(() => {
    testHealth();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Settings Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Settings size={18} className="text-teal-400" />
            <span>Clinic & Intake System Settings</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Global psychiatric intake configurations, LLM steering parameters, and clinic telemetry backend status.
          </p>
        </div>

        <button
          onClick={testHealth}
          disabled={checking}
          className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <RefreshCw size={13} className={checking ? 'animate-spin text-teal-400' : ''} />
          <span>Test API Connectivity</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Backend & Server Status */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <Server size={18} className="text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-100">Intake Backend Service</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09111c] border border-white/5">
              <span className="text-slate-400">Connection Status</span>
              {backendOnline === null ? (
                <span className="text-slate-400">Checking...</span>
              ) : backendOnline ? (
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={14} /> ONLINE (Port 8000)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                  <AlertCircle size={14} /> UNREACHABLE
                </span>
              )}
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09111c] border border-white/5">
              <span className="text-slate-400">Endpoint URL</span>
              <span className="font-mono text-slate-300 text-[11px]">
                {import.meta.env.VITE_API_BASE || 'http://localhost:8000'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#09111c] border border-white/5">
              <span className="text-slate-400">Database Storage Mode</span>
              <span className="text-slate-200 font-medium">MongoDB (with local memory fallback)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Dual-Pass Architecture Configuration */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <Cpu size={18} className="text-teal-400" />
            <h3 className="text-sm font-bold text-slate-100">Dual-Pass Intelligence Architecture</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-[#09111c] border border-white/5">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">Pass A: Empathetic AI Companion</span>
                <span className="text-teal-300 font-mono text-[11px]">Patient-Facing</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Naturalistic waiting room conversation. Never displays psychiatric terminology or diagnostic criteria to the patient.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#09111c] border border-white/5">
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-200">Pass B: Evaluator & Psychiatric Director</span>
                <span className="text-cyan-300 font-mono text-[11px]">Clinical Telemetry</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Structured JSON turn-by-turn evaluator tracking 9 MSE diagnostic domains, tone cadence, and autonomous steering directives.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Safety & Crisis Triage Rules */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <Shield size={18} className="text-rose-400" />
            <h3 className="text-sm font-bold text-slate-100">Clinical Safety & Crisis Protocol</h3>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Pass B checks every user message for implicit or explicit self-harm, suicidal ideation, or psychomotor agitation.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300">
              <span className="font-bold">RED_CRITICAL:</span> Triggers immediate audio-visual badge on doctor queue and prioritizes patient.
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <span className="font-bold">AMBER:</span> Passive ideation or high anxiety; steering directive adapts to gentle grounding.
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <span className="font-bold">GREEN:</span> Standard waiting room conversation; normal intake progression.
            </div>
          </div>
        </div>

        {/* Card 4: Doctor / Clinician Roster */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center gap-2.5">
            <Users size={18} className="text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Active Clinician Credentials</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#09111c] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200">Doctor / Clinician Login</span>
                <p className="text-[11px] text-slate-500">Configured via VITE_DOCTOR_USER / VITE_DOCTOR_PASSWORD</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-teal-300 px-2 py-0.5 rounded bg-teal-500/20">
                ACTIVE
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#09111c] border border-white/5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-200">Clinic Administrator Login</span>
                <p className="text-[11px] text-slate-500">Configured via VITE_ADMIN_USER / VITE_ADMIN_PASSWORD</p>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/20">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
