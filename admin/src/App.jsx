import React, { useState, useEffect, useRef } from 'react';
import LoginCard from './components/auth/LoginCard';
import Header from './components/common/Header';
import LiveQueue from './components/queue/LiveQueue';
import TelemetryDashboard from './components/telemetry/TelemetryDashboard';
import DossierModal from './components/dossier/DossierModal';
import SessionArchive from './components/archive/SessionArchive';
import ClinicSettings from './components/settings/ClinicSettings';
import { getDoctorQueue, getSessionDetails, concludeSession, getDoctorReport } from './services/api';

const AUTH_STORAGE_KEY = 'horizon_admin_user';

export default function App() {
  // Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // App Navigation
  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'archive' | 'settings'

  // Clinical Queue & Telemetry State
  const [queue, setQueue] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [selectedSessionData, setSelectedSessionData] = useState(null);
  const [loadingQueue, setLoadingQueue] = useState(false);
  const [autoPoll, setAutoPoll] = useState(true);

  // Dossier Modal State
  const [dossierData, setDossierData] = useState(null);
  const [dossierModalOpen, setDossierModalOpen] = useState(false);
  const [loadingDossier, setLoadingDossier] = useState(false);

  // Save auth user
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    try {
      sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
    } catch (e) {
      console.warn('Could not save auth session:', e);
    }
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear auth session:', e);
    }
    setUser(null);
    setQueue([]);
    setSelectedSessionId(null);
    setSelectedSessionData(null);
  };

  // Poll clinical queue
  const fetchQueue = async () => {
    if (!user) return;
    try {
      setLoadingQueue(true);
      const data = await getDoctorQueue();
      setQueue(data || []);

      // Auto select first session if none selected
      if (!selectedSessionId && data && data.length > 0) {
        setSelectedSessionId(data[0].session_id);
      }
    } catch (err) {
      console.error('Queue poll error:', err);
    } finally {
      setLoadingQueue(false);
    }
  };

  // Fetch detailed telemetry for currently selected session
  const fetchSelectedSessionDetails = async (sid) => {
    if (!sid) return;
    try {
      const data = await getSessionDetails(sid);
      setSelectedSessionData(data);
    } catch (err) {
      console.error('Failed to fetch session telemetry:', err);
    }
  };

  // Initial queue fetch upon login
  useEffect(() => {
    if (user) {
      fetchQueue();
    }
  }, [user]);

  // Auto-polling interval (every 4 seconds)
  useEffect(() => {
    if (!user || !autoPoll) return;
    const interval = setInterval(() => {
      fetchQueue();
      if (selectedSessionId) {
        fetchSelectedSessionDetails(selectedSessionId);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [user, autoPoll, selectedSessionId]);

  // When selected session ID changes, load its telemetry immediately
  useEffect(() => {
    if (selectedSessionId) {
      fetchSelectedSessionDetails(selectedSessionId);
    }
  }, [selectedSessionId]);

  // Session selection handler
  const handleSelectSession = (sid) => {
    setSelectedSessionId(sid);
    fetchSelectedSessionDetails(sid);
    setActiveTab('live');
  };

  // Generate / View Dossier
  const handleGenerateDossier = async () => {
    if (!selectedSessionId) return;
    try {
      setLoadingDossier(true);
      const data = await concludeSession(selectedSessionId);
      setDossierData(data);
      setDossierModalOpen(true);
    } catch (err) {
      console.warn('Conclude fallback to getDoctorReport:', err);
      try {
        const rep = await getDoctorReport(selectedSessionId);
        setDossierData(rep);
        setDossierModalOpen(true);
      } catch (e) {
        alert('Could not synthesize dossier. Please ensure at least 2 chat messages exist in this intake session.');
      }
    } finally {
      setLoadingDossier(false);
      fetchQueue();
    }
  };

  // If not authenticated, render Login Card
  if (!user) {
    return <LoginCard onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-[#080e15] text-slate-100 overflow-hidden font-sans">
      {/* Top Command Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onLogout={handleLogout}
        onRefresh={() => {
          fetchQueue();
          if (selectedSessionId) fetchSelectedSessionDetails(selectedSessionId);
        }}
        refreshing={loadingQueue}
        autoPoll={autoPoll}
        setAutoPoll={setAutoPoll}
        activeQueueCount={queue.length}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'live' && (
          <>
            {/* Left Queue Sidebar */}
            <LiveQueue
              queue={queue}
              selectedSessionId={selectedSessionId}
              onSelectSession={handleSelectSession}
              loading={loadingQueue}
            />

            {/* Right Diagnostic Telemetry Monitor */}
            <TelemetryDashboard
              session={selectedSessionData || queue.find(q => q.session_id === selectedSessionId)}
              telemetry={selectedSessionData?.latest_telemetry}
              onGenerateDossier={handleGenerateDossier}
              loadingDossier={loadingDossier}
            />
          </>
        )}

        {activeTab === 'archive' && (
          <SessionArchive
            sessions={queue}
            onSelectSession={handleSelectSession}
            onGenerateDossier={handleGenerateDossier}
          />
        )}

        {activeTab === 'settings' && <ClinicSettings />}
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
