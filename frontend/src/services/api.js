// API service module for Stealth Psychiatric Intake

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:8000' : '';

export async function startSession(patientName = null, doctorId = 'dr_default') {
  const res = await fetch(`${API_BASE}/api/session/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      patient_name: patientName ? patientName.trim() : null,
      doctor_id: doctorId
    })
  });
  if (!res.ok) {
    throw new Error(`Failed to start session: ${res.statusText}`);
  }
  return await res.json();
}

export async function sendChatMessage(sessionId, message) {
  if (!sessionId) throw new Error('Missing session_id');
  const res = await fetch(`${API_BASE}/api/session/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      message: message.trim()
    })
  });
  if (!res.ok) {
    throw new Error(`Failed to send message: ${res.statusText}`);
  }
  return await res.json();
}

export async function getDoctorQueue() {
  const res = await fetch(`${API_BASE}/api/doctor/queue`);
  if (!res.ok) {
    throw new Error(`Failed to fetch queue: ${res.statusText}`);
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
    throw new Error(`Failed to fetch report: ${res.statusText}`);
  }
  return await res.json();
}
