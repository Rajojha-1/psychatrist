import React, { useState, useEffect } from 'react';
import CheckInCard from './components/patient/CheckInCard';
import WaitingRoomChat from './components/patient/WaitingRoomChat';
import DoctorPortal from './components/doctor/DoctorPortal';
import { startSession, sendChatMessage } from './services/api';
import './App.css';

export default function App() {
  // Navigation: 'patient' or 'doctor'
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'doctor' || window.location.pathname === '/doctor'
      ? 'doctor'
      : 'patient';
  });

  // Patient Sub-view: 'checkin' or 'chat'
  const [patientScreen, setPatientScreen] = useState('checkin');

  // Active Patient Session State
  const [sessionId, setSessionId] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loadingChat, setLoadingChat] = useState(false);
  const [loadingInit, setLoadingInit] = useState(false);
  const [initError, setInitError] = useState(null);
  const [chatError, setChatError] = useState(null);

  // Sync URL when toggling views
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
      setMessages([
        { role: 'assistant', content: data.greeting }
      ]);
      setPatientScreen('chat');
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
      setMessages([...updatedMessages, { role: 'assistant', content: data.reply }]);
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

  // Patient Facing Screens
  if (patientScreen === 'checkin') {
    return (
      <CheckInCard
        onCheckIn={handleCheckIn}
        loading={loadingInit}
        error={initError}
        onDoctorAccess={handleSwitchToDoctor}
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
      onDoctorAccess={handleSwitchToDoctor}
    />
  );
}
