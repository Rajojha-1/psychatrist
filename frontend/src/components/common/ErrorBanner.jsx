import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function ErrorBanner({ message, type = 'error', onRetry }) {
  if (!message) return null;

  return (
    <div className={`error-banner ${type === 'warning' ? 'warning' : ''}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <AlertCircle size={16} />
        <span>{message}</span>
      </div>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
