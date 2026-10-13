import React, { useState, useEffect } from 'react';
import { Stethoscope, ArrowLeft } from 'lucide-react';
import PatientQueue from './PatientQueue';
import PatientTelemetry from './PatientTelemetry';
import DossierModal from './DossierModal';
import { getDoctorQueue, concludeSession, getDoctorReport } from '../../services/api';
import '../../styles/doctor.css';

export default function DoctorPortal({ onBackToPatientView, activePatientSessionId }) {
  const [queue, setQueue] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(activePatientSessionId || null);
  const [selectedSessionData, setSelectedSessionData] = useState(null);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [dossierData, setDossierData] = useState(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [loadingDossier, setLoadingDossier] = useState(false);

  const fetchQueue = async () => {
    try {
      setLoadingQueue(true);
      const data = await getDoctorQueue();
      setQueue(data || []);
      if (!selectedSessionId && data && data.length > 0) {
        setSelectedSessionId(data[0].session_id);
      }
    } catch (err) {
      console.error('Failed to poll queue:', err);
    } finally {
      setLoadingQueue(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectSession = (sid) => {
    setSelectedSessionId(sid);
    const found = queue.find(q => q.session_id === sid);
    setSelectedSessionData(found || null);
  };

  const handleGenerateDossier = async () => {
    if (!selectedSessionId) return;
    try {
      setLoadingDossier(true);
      const data = await concludeSession(selectedSessionId);
      setDossierData(data);
      setDossierModalOpen(true);
    } catch (err) {
      console.error('Conclude error, attempting report fetch:', err);
      try {
        const rep = await getDoctorReport(selectedSessionId);
        setDossierData(rep);
        setDossierModalOpen(true);
      } catch (e) {
        alert('Could not synthesize dossier. Please ensure at least 2 chat messages exist in this session.');
      }
    } finally {
      setLoadingDossier(false);
    }
  };

  return (
    <div className="doctor-portal-layout">
      {/* Top Doctor Navigation */}
      <header className="doctor-portal-header">
        <div className="portal-brand">
          <Stethoscope size={22} color="var(--accent-teal)" />
          <div>
            <h1 className="portal-title">Clinical Command Center</h1>
            <span className="portal-sub">Stealth Intake Telemetry & Live Diagnostic Monitor</span>
          </div>
        </div>

        <div className="portal-nav-actions">
          <button
            className="back-to-patient-btn"
            onClick={onBackToPatientView}
            title="Go to Patient Lounge View"
          >
            <ArrowLeft size={16} />
            <span>Patient Waiting Lounge</span>
          </button>
        </div>
      </header>

      {/* Main Workspace: Left Queue + Right Telemetry */}
      <div className="doctor-portal-workspace">
        <PatientQueue
          queue={queue}
          selectedSessionId={selectedSessionId}
          onSelectSession={handleSelectSession}
          onRefresh={fetchQueue}
          loading={loadingQueue}
        />

        <main className="doctor-main-content">
          <PatientTelemetry
            session={selectedSessionData || queue.find(q => q.session_id === selectedSessionId)}
            telemetry={null}
            onGenerateDossier={handleGenerateDossier}
            loadingDossier={loadingDossier}
          />
        </main>
      </div>

      {/* Dossier Modal */}
      <DossierModal
        isOpen={dossierModalOpen}
        onClose={() => setDossierModalOpen(false)}
        dossierData={dossierData}
      />
    </div>
  );
}
