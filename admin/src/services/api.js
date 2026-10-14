// API Service for Horizon Clinic Clinical Command Center & Admin Portal

const rawBase = import.meta.env.VITE_API_BASE || (window.location.hostname === 'localhost' ? 'http://localhost:8000' : '');
const API_BASE = rawBase.replace(/\/+$/, '');

export async function checkBackendHealth() {
  try {
    const res = await fetch(`${API_BASE}/api/doctor/queue`, { method: 'GET' });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getDoctorQueue() {
  const res = await fetch(`${API_BASE}/api/doctor/queue`);
  if (!res.ok) {
    throw new Error(`Failed to fetch clinical queue: ${res.statusText}`);
  }
  return await res.json();
}

export async function getSessionDetails(sessionId) {
  if (!sessionId) throw new Error('Missing session_id');
  const res = await fetch(`${API_BASE}/api/session/${sessionId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch session: ${res.statusText}`);
  }
  return await res.json();
}

export async function concludeSession(sessionId) {
  if (!sessionId) throw new Error('Missing session_id');
  const res = await fetch(`${API_BASE}/api/session/conclude?session_id=${sessionId}`, {
    method: 'POST'
  });
  if (!res.ok) {
    throw new Error(`Failed to conclude session: ${res.statusText}`);
  }
  return await res.json();
}

export async function getDoctorReport(sessionId) {
  if (!sessionId) throw new Error('Missing session_id');
  const res = await fetch(`${API_BASE}/api/doctor/report/${sessionId}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch synthesized dossier: ${res.statusText}`);
  }
  return await res.json();
}
