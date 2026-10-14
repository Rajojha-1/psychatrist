import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInputDock from './ChatInputDock';
import ErrorBanner from '../common/ErrorBanner';

export const LotusIcon = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    {/* Center petal */}
    <path d="M12 3.5C10.8 7 10.5 10.2 10.5 13.2C10.5 16 11.2 18 12 18.8C12.8 18 13.5 16 13.5 13.2C13.5 10.2 13.2 7 12 3.5Z" />
    {/* Left inner petal */}
    <path d="M7.8 7.5C6.8 10.5 7.2 13.5 8.5 15.8C9.5 17.5 10.8 18.5 11.8 18.8C10.5 17 9.8 14.5 9.8 12C9.8 10 10.2 8.5 10.8 7.2C9.5 7 8.5 7.2 7.8 7.5Z" opacity="0.8" />
    {/* Right inner petal */}
    <path d="M16.2 7.5C17.2 10.5 16.8 13.5 15.5 15.8C14.5 17.5 13.2 18.5 12.2 18.8C13.5 17 14.2 14.5 14.2 12C14.2 10 13.8 8.5 13.2 7.2C14.5 7 15.5 7.2 16.2 7.5Z" opacity="0.8" />
    {/* Left outer petal */}
    <path d="M4.5 13C3.8 15 4.5 17.2 6.2 18.5C8 19.5 10 19.2 11.5 18.8C9.2 18.2 7.5 17 6.5 15.2C5.8 14 5.2 13.2 4.5 13Z" opacity="0.6" />
    {/* Right outer petal */}
    <path d="M19.5 13C20.2 15 19.5 17.2 17.8 18.5C16 19.5 14 19.2 12.5 18.8C14.8 18.2 16.5 17 17.5 15.2C18.2 14 18.8 13.2 19.5 13Z" opacity="0.6" />
  </svg>
);

export default function WaitingRoomChat({
  patientName,
  messages,
  loading,
  inputValue,
  setInputValue,
  onSendMessage,
  onExitRoom,
  errorBanner,
  onRetryInit
}) {
  const chatContainerRef = useRef(null);

  // Reset any outer window scroll that may have happened
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Internal-only scroll: directly update container scrollTo so the window/navbar never moves
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, loading]);

  return (
    <div className="fixed inset-0 w-full h-full bg-[#080e15] flex flex-col overflow-hidden font-sans text-slate-200">
      {/* Ambient background lighting - Exact match to reference screenshot */}
      {/* Prominent luminous ocean-teal atmosphere spotlight on the center-right */}
      <div
        className="absolute top-[8%] right-[5%] w-[840px] h-[840px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 55% 45%, rgba(20, 184, 166, 0.42) 0%, rgba(13, 148, 136, 0.26) 38%, rgba(6, 78, 90, 0.12) 60%, transparent 75%)',
          filter: 'blur(100px)'
        }}
      />

      {/* Top Navbar - Sticky top, permanent, matching reference */}
      <header className="h-[72px] px-6 sm:px-12 border-b border-white/[0.07] bg-[#080e15]/85 backdrop-blur-xl flex items-center justify-between z-40 flex-shrink-0">
        {/* Left: Lotus logo + Horizon Clinic */}
        <div className="flex items-center gap-3">
          <LotusIcon className="w-6 h-6 text-slate-400 opacity-90" />
          <span className="font-medium text-slate-200 text-lg tracking-tight">Horizon Clinic</span>
        </div>

        {/* Right: Exit Room Button */}
        <div className="flex items-center">
          <button
            onClick={onExitRoom}
            className="px-5 py-2 rounded-full border border-slate-700/70 bg-[#101820]/50 text-sm text-slate-300 hover:text-white hover:bg-white/5 hover:border-slate-500 transition-all cursor-pointer font-normal"
          >
            Exit Room
          </button>
        </div>
      </header>

      {/* Messages Stream - Scrollable inside viewport without scrolling outer window */}
      <main
        ref={chatContainerRef}
        className="flex-1 min-h-0 w-full overflow-y-auto px-4 sm:px-6 pt-8 pb-40 flex justify-center z-10"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.2) transparent'
        }}
      >
        <div className="w-full max-w-3xl flex flex-col gap-6">
          {messages.map((msg, idx) => (
            <MessageBubble key={idx} message={msg} />
          ))}

          {loading && <MessageBubble isTyping={true} />}

          {/* Safe-zone buffer so latest message is always completely above the floating dock */}
          <div className="h-44 w-full flex-shrink-0 pointer-events-none" aria-hidden="true" />
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
    </div>
  );
}
