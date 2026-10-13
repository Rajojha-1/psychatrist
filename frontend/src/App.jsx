import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Plus,
  Stethoscope,
  Activity,
  X,
  ShieldAlert,
  Moon,
  Brain,
  FileText,
  CheckCircle2,
  AlertCircle,
  Eye,
  Printer,
  ChevronRight
} from 'lucide-react';
import './App.css';

const API_BASE = import.meta.env.VITE_API_BASE ?? (window.location.hostname === 'localhost' ? 'http://localhost:8000' : '');

export default function App() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [telemetry, setTelemetry] = useState(null);
  const [hudOpen, setHudOpen] = useState(false);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [dossierData, setDossierData] = useState(null);
  const [loadingDossier, setLoadingDossier] = useState(false);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Initialize intake session on mount
  useEffect(() => {
    startNewSession();
  }, []);

  const startNewSession = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/session/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctor_id: 'dr_default' })
      });
      const data = await res.json();
      setSessionId(data.session_id);
      setMessages([
        { role: 'assistant', content: data.greeting }
      ]);
      setTelemetry(null);
      setDossierData(null);
    } catch (err) {
      console.error('Failed to start session:', err);
      setMessages([
        { role: 'assistant', content: "Hey, take a seat and settle in. Waiting rooms are always pretty dull—what can I call you by the way?" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    const text = inputValue.trim();
    if (!text || loading) return;

    const newMsgs = [...messages, { role: 'user', content: text }];
    setMessages(newMsgs);
    setInputValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/session/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId || 'DEFAULT',
          message: text
        })
      });

      if (!res.ok) throw new Error('Failed to send message');
      const data = await res.json();

      setMessages([...newMsgs, { role: 'assistant', content: data.reply }]);
      if (data.telemetry) {
        setTelemetry(data.telemetry);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...newMsgs,
        { role: 'assistant', content: "Fair enough. Waiting around can be pretty dull honestly. Did you have a long drive getting here?" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
  };

  const fetchDossier = async () => {
    if (!sessionId) return;
    setLoadingDossier(true);
    try {
      const res = await fetch(`${API_BASE}/api/session/conclude?session_id=${sessionId}`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to generate report');
      const data = await res.json();
      setDossierData(data);
      setDossierModalOpen(true);
    } catch (err) {
      console.error('Dossier error:', err);
      // Fallback preview
      try {
        const repRes = await fetch(`${API_BASE}/api/doctor/report/${sessionId}`);
        const repData = await repRes.json();
        setDossierData(repData);
        setDossierModalOpen(true);
      } catch (e) {
        alert('Could not synthesize report. Please ensure at least 2 messages are sent.');
      }
    } finally {
      setLoadingDossier(false);
    }
  };

  return (
    <div className="app-layout">
      {/* ================= SIDEBAR ================= */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={startNewSession}>
            <Plus size={18} />
            <span>New Waiting Session</span>
          </button>
        </div>

        <div className="sidebar-content">
          <div className="sidebar-section-title">Active Intake</div>
          <div className="history-item active">
            <Activity size={16} color="var(--accent-teal)" />
            <span>Waiting Room Session #{sessionId || '...'}</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button
            className="doctor-hud-btn"
            onClick={() => setHudOpen(!hudOpen)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Stethoscope size={16} />
              <span>Doctor Monitor HUD</span>
            </div>
            <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
              {hudOpen ? 'HIDE' : 'VIEW'}
            </span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CHAT AREA ================= */}
      <main className="chat-main">
        {/* Top Navbar */}
        <header className="top-navbar">
          <div className="navbar-left">
            <div className="app-title-badge">
              <span className="status-dot"></span>
              <span>Intake Companion</span>
              <span className="waiting-room-tag">Waiting Room AI</span>
            </div>
          </div>

          <div className="navbar-right">
            <button
              className={`hud-toggle-pill ${hudOpen ? 'active' : ''}`}
              onClick={() => setHudOpen(!hudOpen)}
            >
              <Eye size={14} />
              <span>{hudOpen ? 'Hide Clinical Telemetry' : 'Doctor HUD'}</span>
            </button>
          </div>
        </header>

        {/* Message Stream */}
        <div className="messages-container">
          <div className="messages-wrapper">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="message-avatar companion">
                    AI
                  </div>
                )}
                <div className="message-bubble">
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="message-avatar user">
                    You
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="message-row assistant">
                <div className="message-avatar companion">
                  AI
                </div>
                <div className="typing-bubble">
                  <span className="dot-pulse"></span>
                  <span className="dot-pulse"></span>
                  <span className="dot-pulse"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Bottom Input Dock */}
        <div className="input-dock">
          <form className="input-box-wrapper" onSubmit={handleSendMessage}>
            <textarea
              ref={textareaRef}
              className="chat-textarea"
              placeholder="Message your waiting companion..."
              rows={1}
              value={inputValue}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!inputValue.trim() || loading}
            >
              <Send size={18} />
            </button>
          </form>
          <div className="input-disclaimer">
            Waiting for your doctor's appointment? Relax and chat freely.
          </div>
        </div>
      </main>

      {/* ================= SECRET DOCTOR CLINICAL HUD ================= */}
      <aside className={`doctor-hud-drawer ${hudOpen ? 'open' : ''}`}>
        <div className="hud-header">
          <div className="hud-title">
            <Stethoscope size={18} />
            <span>CLINICAL MONITOR (OBSERVER)</span>
          </div>
          <button onClick={() => setHudOpen(false)}>
            <X size={18} color="var(--text-secondary)" />
          </button>
        </div>

        <div className="hud-content">
          {telemetry ? (
            <>
              {/* Patient Identity & Tone */}
              <div className="hud-card">
                <div className="hud-card-title">Patient Affect & State</div>
                <div className="metric-row">
                  <span className="metric-label">Identified:</span>
                  <span className="metric-val">{telemetry.patient_name || 'Anonymous Intake'}</span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Observed Tone:</span>
                  <span className="metric-val" style={{ color: 'var(--accent-blue)' }}>
                    {telemetry.affect_and_tone.primary_tone}
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Valence / Arousal:</span>
                  <span className="metric-val">
                    {telemetry.affect_and_tone.valence > 0 ? '+' : ''}{telemetry.affect_and_tone.valence.toFixed(2)} / {telemetry.affect_and_tone.arousal_agitation.toFixed(2)}
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Cynicism / Masking:</span>
                  <span className="metric-val">{(telemetry.affect_and_tone.masking_cynicism_level * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Triage & Safety */}
              <div className="hud-card">
                <div className="hud-card-title">Safety & Triage Rating</div>
                <div className="metric-row">
                  <span className="metric-label">Risk Category:</span>
                  <span className={`badge-risk ${telemetry.safety_and_risk.level.toLowerCase()}`}>
                    {telemetry.safety_and_risk.level}
                  </span>
                </div>
                {telemetry.safety_and_risk.verbatim_evidence?.length > 0 && (
                  <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Evidence: <em>"{telemetry.safety_and_risk.verbatim_evidence.join(', ')}"</em>
                  </div>
                )}
              </div>

              {/* 9-Domain Battery Progress */}
              <div className="hud-card">
                <div className="hud-card-title">Psychiatric Intake Battery</div>
                <div className="metric-row">
                  <span className="metric-label">Battery Completion:</span>
                  <span className="metric-val" style={{ color: 'var(--accent-teal)' }}>
                    {telemetry.domain_coverage.completeness_score}%
                  </span>
                </div>
                <div className="metric-row">
                  <span className="metric-label">Next Target Domain:</span>
                  <span className="metric-val" style={{ color: 'var(--accent-purple)', fontSize: '0.8rem' }}>
                    {telemetry.domain_coverage.next_domain_to_explore}
                  </span>
                </div>
              </div>

              {/* Cognitive & Somatic */}
              <div className="hud-card">
                <div className="hud-card-title">Cognitive & Somatic Correlates</div>
                <div className="metric-row">
                  <span className="metric-label">Distortions:</span>
                  <span className="metric-val" style={{ fontSize: '0.8rem' }}>
                    {telemetry.cognitive_distortions?.length > 0 ? telemetry.cognitive_distortions.join(', ') : 'None detected'}
                  </span>
                </div>
                <div className="metric-row" style={{ marginTop: '6px' }}>
                  <span className="metric-label">Sleep:</span>
                  <span className="metric-val" style={{ fontSize: '0.8rem' }}>
                    {telemetry.somatic_indicators.sleep_status}
                  </span>
                </div>
              </div>

              {/* Hidden Steering Directive */}
              <div className="hud-card">
                <div className="hud-card-title">Secret Steering Directive (Pass B → Pass A)</div>
                <div className="directive-box">
                  {telemetry.steering_directive}
                </div>
              </div>

              {/* Dossier Generator Button */}
              <button
                className="generate-dossier-btn"
                onClick={fetchDossier}
                disabled={loadingDossier}
              >
                <FileText size={16} />
                <span>{loadingDossier ? 'Synthesizing...' : 'Generate Full Doctor Dossier'}</span>
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-tertiary)' }}>
              <Brain size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p style={{ fontSize: '0.85rem' }}>Awaiting first patient interaction to calculate clinical telemetry...</p>
            </div>
          )}
        </div>
      </aside>

      {/* ================= CONFIDENTIAL DOSSIER MODAL ================= */}
      {dossierModalOpen && dossierData && (
        <div className="modal-overlay" onClick={() => setDossierModalOpen(false)}>
          <div className="dossier-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="dossier-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Stethoscope size={20} color="var(--accent-blue)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>CONFIDENTIAL PSYCHIATRIC CLINICAL DOSSIER</h3>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  className="hud-toggle-pill"
                  onClick={() => window.print()}
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
                <button onClick={() => setDossierModalOpen(false)}>
                  <X size={20} color="var(--text-secondary)" />
                </button>
              </div>
            </div>

            <div className="dossier-modal-body">
              {/* Executive Summary */}
              <div className="dossier-section">
                <div className="dossier-sec-title">1. Executive Summary & Diagnostic Impression</div>
                <p style={{ fontSize: '0.92rem', marginBottom: '8px' }}>
                  <strong>Provisional Diagnosis:</strong> {dossierData.executive_summary?.provisional_diagnostic_impression}
                </p>
                <p style={{ fontSize: '0.92rem', marginBottom: '8px' }}>
                  <strong>Acute Severity:</strong> <span className={`badge-risk ${dossierData.executive_summary?.acute_severity_status?.toLowerCase().includes('high') ? 'red' : 'green'}`}>{dossierData.executive_summary?.acute_severity_status}</span>
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {dossierData.executive_summary?.clinical_synopsis}
                </p>
              </div>

              {/* MSE Breakdown */}
              <div className="dossier-section">
                <div className="dossier-sec-title">2. Mental Status Examination (MSE)</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.86rem' }}>
                  <div><strong>Appearance & Engagement:</strong> {dossierData.mental_status_exam?.appearance_and_engagement}</div>
                  <div><strong>Speech & Flow:</strong> {dossierData.mental_status_exam?.speech_and_psychomotor}</div>
                  <div><strong>Subjective Mood:</strong> {dossierData.mental_status_exam?.mood_subjective}</div>
                  <div><strong>Objective Affect:</strong> {dossierData.mental_status_exam?.affect_objective}</div>
                  <div><strong>Thought Process:</strong> {dossierData.mental_status_exam?.thought_process}</div>
                  <div><strong>Thought Content:</strong> {dossierData.mental_status_exam?.thought_content}</div>
                </div>
              </div>

              {/* Consultation Talking Points */}
              <div className="dossier-section">
                <div className="dossier-sec-title">3. High-Yield Doctor Consultation Talking Points</div>
                <ul style={{ paddingLeft: '20px', fontSize: '0.88rem', color: '#bae6fd', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {dossierData.attending_physician_consultation_angles?.map((angle, idx) => (
                    <li key={idx}>{angle}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
