import React, { useRef, useEffect } from 'react';
import { HeartHandshake, LogOut, ShieldCheck } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInputDock from './ChatInputDock';
import ErrorBanner from '../common/ErrorBanner';
import '../../styles/chat.css';

export default function WaitingRoomChat({
  patientName,
  messages,
  loading,
  inputValue,
  setInputValue,
  onSendMessage,
  onExitRoom,
  errorBanner,
  onRetryInit,
  onDoctorAccess
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="patient-chat-layout">
      {/* Ambient background glow */}
      <div className="ambient-glow patient-glow-1" />
      <div className="ambient-glow patient-glow-2" />

      {/* Top Calm Navbar */}
      <header className="patient-navbar">
        <div className="navbar-brand">
          <div className="brand-icon">
            <HeartHandshake size={20} />
          </div>
          <div className="brand-info">
            <span className="brand-name">Horizon Health</span>
            <span className="brand-sub">Private Waiting Lounge</span>
          </div>
        </div>

        {/* Ambient status without queue/interview feel */}
        <div className="ambient-status-pill">
          <span className="ambient-dot" />
          <span className="ambient-text">Waiting Room Companion • Active</span>
        </div>

        <div className="navbar-actions">
          <button
            className="exit-room-btn"
            onClick={onExitRoom}
            title="Leave waiting room"
          >
            <LogOut size={16} />
            <span>Leave Room</span>
          </button>
        </div>
      </header>

      {/* Main Conversation Stream */}
      <main className="patient-chat-stream">
        <div className="messages-wrapper">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}

          {loading && <MessageBubble isTyping={true} />}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Error Banner if any */}
      {errorBanner && (
        <div className="chat-error-wrapper">
          <ErrorBanner
            message={errorBanner.message}
            type={errorBanner.type}
            onRetry={errorBanner.canRetry ? onRetryInit : null}
          />
        </div>
      )}

      {/* Floating Bottom Dock */}
      <ChatInputDock
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSendMessage={onSendMessage}
        loading={loading}
        disabled={false}
      />

      {/* Discreet Doctor Portal link in bottom footer */}
      {onDoctorAccess && (
        <button
          className="patient-doctor-shortcut"
          onClick={onDoctorAccess}
          title="Switch to Clinical Dashboard"
        >
          <ShieldCheck size={13} />
          <span>Doctor Portal</span>
        </button>
      )}
    </div>
  );
}
