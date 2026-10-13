import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import '../../styles/checkin.css';

export default function CheckInCard({ onCheckIn, loading, error, onDoctorAccess }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || loading) return;
    onCheckIn(name.trim());
  };

  return (
    <div className="checkin-container">
      {/* Background ambient lighting glow */}
      <div className="ambient-glow amber-glow" />
      <div className="ambient-glow teal-glow" />

      <div className="checkin-card">
        <div className="clinic-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>Horizon Health Waiting Lounge</span>
        </div>

        <h1 className="checkin-title">
          Welcome to Horizon Health. Settle in, your appointment is shortly.
        </h1>

        <p className="checkin-subtitle">
          What can we call you while you wait?
        </p>

        <form onSubmit={handleSubmit} className="checkin-form">
          <div className="input-group">
            <input
              type="text"
              className="checkin-input"
              placeholder="Enter your name or nickname"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              autoFocus
              maxLength={40}
            />
            <button
              type="submit"
              className="checkin-btn"
              disabled={!name.trim() || loading}
            >
              <span>{loading ? 'Preparing Room...' : 'Enter Waiting Room'}</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>

        {error && (
          <div className="checkin-error">
            {error}
          </div>
        )}

        <div className="checkin-footer">
          <span>Doctor will be with you shortly • Relax and take your time</span>
        </div>
      </div>

      {/* Discreet Doctor Access in bottom corner */}
      {onDoctorAccess && (
        <button
          className="doctor-portal-link"
          onClick={onDoctorAccess}
          title="Clinical Staff Access"
        >
          Clinical Staff Portal →
        </button>
      )}
    </div>
  );
}
