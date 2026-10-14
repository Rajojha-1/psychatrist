import React, { useState, useEffect } from 'react';
import CheckInCard from './components/patient/CheckInCard';
import WaitingRoomChat from './components/patient/WaitingRoomChat';
import DoctorPortal from './components/doctor/DoctorPortal';
import { startSession, sendChatMessage, getSession } from './services/api';
import './App.css';

const SESSION_STORAGE_KEY = 'mindbridge_patient_session';

export default function App() {
  // Navigation: 'patient' or 'doctor'
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'doctor' || window.location.pathname === '/doctor'
      ? 'doctor'
      : 'patient';
  });

  // Load any previously persisted session from localStorage
  const getSavedSession = () => {
    try {
      const raw = localStorage.getItem(SESSION_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const initialSession = getSavedSession();

  // Patient Sub-view: 'checkin' or 'chat'
  const [patientScreen, setPatientScreen] = useState(() => (initialSession?.sessionId ? 'chat' : 'checkin'));

  // Active Patient Session State (persisted across reloads)
  const [sessionId, setSessionId] = useState(() => initialSession?.sessionId || null);
  const [patientName, setPatientName] = useState(() => initialSession?.patientName || '');
  const [messages, setMessages] = useState(() => (Array.isArray(initialSession?.messages) ? initialSession.messages : []));
  const [inputValue, setInputValue] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingInit, setLoadingInit] = useState(false);
  const [initError, setInitError] = useState(null);
  const [chatError, setChatError] = useState(null);

  // Sync state changes with localStorage
  useEffect(() => {
    if (sessionId && patientScreen === 'chat') {
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          sessionId,
          patientName,
          messages,
          patientScreen: 'chat'
        }));
      } catch (err) {
        console.warn('Failed to save session to localStorage:', err);
      }
    }
  }, [sessionId, patientName, messages, patientScreen]);

  // On page mount / refresh: verify and sync session with backend
  useEffect(() => {
    if (sessionId) {
      getSession(sessionId)
        .then((data) => {
          if (data && Array.isArray(data.messages) && data.messages.length > 0) {
            setMessages(data.messages.map(m => ({ role: m.role, content: m.content })));
            if (data.patient_name && !patientName) {
              setPatientName(data.patient_name);
            }
          }
        })
        .catch((err) => {
          console.warn('Backend sync error (cached state used):', err);
        });
    }
  }, []);

  // Sync URL when toggling views (accessed directly via ?view=doctor)
  const handleSwitchToDoctor = () => {
    setView('doctor');
    const url = new URL(window.location.href);
    url.searchParams.set('view', 'doctor');
    window.history.pushState({}, '', url);
  };

  const handleSwitchToPatient = () => {
    setView('patient');
    const url = new URL(window.location.href);
    url.searchParams.delete('view');
    window.history.pushState({}, '', url);
  };

  // Patient Check-in Action
  const handleCheckIn = async (enteredName) => {
    try {
      setLoadingInit(true);
      setInitError(null);
      setPatientName(enteredName);

      const data = await startSession(enteredName);
      setSessionId(data.session_id);
      const initialGreeting = [
        { role: 'assistant', content: data.greeting }
      ];
      setMessages(initialGreeting);
      setPatientScreen('chat');

      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          sessionId: data.session_id,
          patientName: enteredName,
          messages: initialGreeting,
          patientScreen: 'chat'
        }));
      } catch (e) {
        console.warn('Could not persist check-in:', e);
      }
    } catch (err) {
      console.error('Failed to initialize intake room:', err);
      setInitError('Could not connect to the clinic server. Please check your network and try again.');
    } finally {
      setLoadingInit(false);
    }
  };

  // Patient Message Send Action
  const handleSendMessage = async () => {
    const text = inputValue.trim();
    if (!text || loadingChat || !sessionId) return;

    setChatError(null);
    const updatedMessages = [...messages, { role: 'user', content: text }];
    setMessages(updatedMessages);
    setInputValue('');

    setLoadingChat(true);
    try {
      const data = await sendChatMessage(sessionId, text);
      const withAssistantReply = [...updatedMessages, { role: 'assistant', content: data.reply }];
      setMessages(withAssistantReply);
      try {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
          sessionId,
          patientName,
          messages: withAssistantReply,
          patientScreen: 'chat'
        }));
      } catch (e) {
        console.warn('Could not persist chat update:', e);
      }
    } catch (err) {
      console.error('Chat transmission error:', err);
      setChatError({
        type: 'warning',
        message: 'Network issue communicating with companion. Please try re-sending.',
        canRetry: false
      });
      setMessages([
        ...updatedMessages,
        {
          role: 'assistant',
          content: "Sorry, spaced out there for a second. Go on though, what were you saying?"
        }
      ]);
    } finally {
      setLoadingChat(false);
    }
  };

  // Leave Waiting Room Action
  const handleExitRoom = () => {
    try {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear storage:', e);
    }
    setSessionId(null);
    setPatientName('');
    setMessages([]);
    setInputValue('');
    setChatError(null);
    setPatientScreen('checkin');
  };

  // ================= RENDER =================
  if (view === 'doctor') {
    return (
      <DoctorPortal
        onBackToPatientView={handleSwitchToPatient}
        activePatientSessionId={sessionId}
      />
    );
  }

  // Patient Facing Screens (Strictly zero doctor portal access)
  if (patientScreen === 'checkin') {
    return (
      <CheckInCard
        onCheckIn={handleCheckIn}
        loading={loadingInit}
        error={initError}
      />
    );
  }

  return (
    <WaitingRoomChat
      patientName={patientName}
      messages={messages}
      loading={loadingChat}
      inputValue={inputValue}
      setInputValue={setInputValue}
      onSendMessage={handleSendMessage}
      onExitRoom={handleExitRoom}
      errorBanner={chatError}
    />
  );
}
