import React, { useRef, useEffect } from 'react';
import { Sparkles, LogOut, ShieldCheck } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInputDock from './ChatInputDock';
import ErrorBanner from '../common/ErrorBanner';

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
    <div className="min-h-screen w-full bg-[#0a0d14] flex flex-col relative overflow-hidden font-sans">
      {/* Ambient background glows matching mockup */}
      <div
        className="absolute -top-24 right-1/4 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.22) 0%, transparent 70%)',
          filter: 'blur(130px)'
        }}
      />
      <div
        className="absolute bottom-12 left-12 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, transparent 70%)',
          filter: 'blur(130px)'
        }}
      />

      {/* Top Navbar */}
      <header className="h-16 px-6 sm:px-10 border-b border-white/[0.07] bg-[#0a0d14]/80 backdrop-blur-xl flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-400/15 border border-teal-400/30 text-teal-300 flex items-center justify-center">
            <Sparkles size={18} />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">Horizon Clinic</span>
          </div>
        </div>

        {/* Ambient Pill Status */}
        <div className="hidden sm:inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#121826]/75 border border-white/10 text-xs text-gray-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
          <span className="font-medium tracking-wide">Waiting Room • Active</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExitRoom}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/30 transition-all cursor-pointer"
            title="Leave waiting room"
          >
            <LogOut size={14} />
            <span>Exit Room</span>
          </button>
        </div>
      </header>

      {/* Messages Stream */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 pt-8 pb-36 flex justify-center z-10">
        <div className="w-full max-w-3xl flex flex-col gap-5">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}

          {loading && <MessageBubble isTyping={true} />}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Error banner */}
      {errorBanner && (
        <div className="w-full max-w-3xl mx-auto px-4 z-20 mb-2">
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

      {/* Discreet Doctor Portal link */}
      {onDoctorAccess && (
        <button
          className="absolute bottom-2 right-4 inline-flex items-center gap-1 text-[11px] text-gray-600 hover:text-gray-400 transition-colors z-30 cursor-pointer"
          onClick={onDoctorAccess}
          title="Clinical Portal"
        >
          <ShieldCheck size={12} />
          <span>Doctor Portal</span>
        </button>
      )}
    </div>
  );
}
