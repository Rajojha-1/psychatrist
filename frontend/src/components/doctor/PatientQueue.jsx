import React, { useState, useEffect } from 'react';
import { Users, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export default function PatientQueue({
  queue,
  selectedSessionId,
  onSelectSession,
  onRefresh,
  loading
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQueue = queue.filter(item => {
    const nameMatch = item.patient_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const idMatch = item.session_id?.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || idMatch;
  });

  return (
    <aside className="doctor-queue-sidebar">
      <div className="queue-header">
        <div className="queue-title-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} color="var(--accent-teal)" />
            <h3 className="queue-title">Waiting Patient Queue</h3>
          </div>
          <button
            className="queue-refresh-btn"
            onClick={onRefresh}
            disabled={loading}
            title="Refresh queue"
          >
            <RefreshCw size={15} className={loading ? 'spin' : ''} />
          </button>
        </div>

        <div className="queue-stats">
          <span>{queue.length} Active Intakes</span>
          {queue.some(p => p.is_critical_alert || p.risk_level === 'RED_CRITICAL') && (
            <span className="queue-critical-flag">
              <AlertTriangle size={12} />
              <span>Critical Alerts Active</span>
            </span>
          )}
        </div>

        <input
          type="text"
          className="queue-search-input"
          placeholder="Filter patients by name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="queue-list">
        {filteredQueue.length === 0 ? (
          <div className="queue-empty">
            <Clock size={28} style={{ opacity: 0.4, marginBottom: '8px' }} />
            <p>No waiting patients</p>
            <span>Sessions will appear here when patients enter the waiting room</span>
          </div>
        ) : (
          filteredQueue.map((item) => {
            const isSelected = item.session_id === selectedSessionId;
            const isCritical = item.is_critical_alert || item.risk_level === 'RED_CRITICAL';

            return (
              <div
                key={item.session_id}
                className={`queue-card ${isSelected ? 'selected' : ''} ${isCritical ? 'critical-border' : ''}`}
                onClick={() => onSelectSession(item.session_id)}
              >
                <div className="queue-card-top">
                  <div className="patient-avatar-circle">
                    {item.patient_name ? item.patient_name.charAt(0).toUpperCase() : 'P'}
                  </div>
                  <div className="patient-meta">
                    <span className="patient-name">{item.patient_name || 'Anonymous Intake'}</span>
                    <span className="session-id">ID: #{item.session_id}</span>
                  </div>
                  <StatusBadge level={item.risk_level} />
                </div>

                <div className="queue-card-bottom">
                  <div className="battery-mini-bar">
                    <div className="battery-label">
                      <span>Battery</span>
                      <span>{item.completeness_score}%</span>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${Math.min(100, item.completeness_score)}%` }}
                      />
                    </div>
                  </div>

                  <div className="queue-card-footer">
                    <span className="tone-indicator">{item.primary_tone || 'In intake'}</span>
                    <span className="msg-counter">{item.total_messages || 0} msgs</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
