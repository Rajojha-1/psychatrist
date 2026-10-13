import React from 'react';

export function getRiskBadgeClass(level) {
  if (!level) return 'green';
  const l = String(level).toUpperCase();
  if (l.includes('RED') || l.includes('CRITICAL')) return 'red';
  if (l.includes('AMBER') || l.includes('YELLOW') || l.includes('MODERATE')) return 'amber';
  return 'green';
}

export default function StatusBadge({ level, label }) {
  const badgeClass = getRiskBadgeClass(level);
  return (
    <span className={`badge-risk ${badgeClass}`}>
      {label || level || 'GREEN'}
    </span>
  );
}
