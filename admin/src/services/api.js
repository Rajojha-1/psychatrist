function getApiBase() {
  // When running in a browser over HTTPS, calling an insecure HTTP URL directly
  // triggers browser Mixed Content blocking. Route through Vercel's rewrite proxy instead ('').
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    const envBase = import.meta.env.VITE_API_BASE || '';
    if (envBase.startsWith('https://')) {
      return envBase.replace(/\/+$/, '');
    }
    return '';
  }

  const base = import.meta.env.VITE_API_BASE || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:8000' : '');
  return base.replace(/\/+$/, '');
}

const API_BASE = getApiBase();

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
