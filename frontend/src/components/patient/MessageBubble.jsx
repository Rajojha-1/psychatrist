import React from 'react';

const LotusIcon = ({ className = "w-5 h-5" }) => (
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

export default function MessageBubble({ message, isTyping = false }) {
  if (isTyping) {
    return (
      <div className="flex flex-col items-start w-full">
        <span className="text-xs text-slate-400 font-normal ml-14 mb-1.5">AI Companion</span>
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b343a] via-[#28323c] to-[#1c2732] border border-amber-200/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_14px_rgba(251,191,36,0.22)] text-amber-200">
            <LotusIcon className="w-5 h-5 opacity-90 text-amber-100" />
          </div>
          <div
            className="flex items-center gap-2 px-6 py-4 rounded-2xl rounded-tl-sm"
            style={{
              background: 'rgba(22, 34, 47, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse [animation-delay:200ms]" />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse [animation-delay:400ms]" />
          </div>
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <div className="flex flex-col items-end w-full animate-fadeIn">
        <span className="text-xs text-slate-400 font-normal mr-1 mb-1.5">Patient</span>
        <div
          className="max-w-[560px] px-6 py-4 rounded-2xl rounded-tr-sm text-[#091b1d] font-medium text-[15px] leading-relaxed break-words shadow-[0_6px_30px_rgba(45,212,191,0.35)]"
          style={{
            background: 'linear-gradient(100deg, #42e8d0 0%, #7ee7fc 100%)'
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start w-full animate-fadeIn">
      <span className="text-xs text-slate-400 font-normal ml-14 mb-1.5">AI Companion</span>
      <div className="flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3b343a] via-[#28323c] to-[#1c2732] border border-amber-200/40 flex items-center justify-center flex-shrink-0 shadow-[0_0_14px_rgba(251,191,36,0.22)] text-amber-200">
          <LotusIcon className="w-5 h-5 opacity-90 text-amber-100" />
        </div>

        <div
          className="max-w-[580px] px-6 py-4 rounded-2xl rounded-tl-sm text-slate-200 text-[15px] leading-relaxed break-words shadow-lg"
          style={{
            background: 'rgba(22, 34, 47, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {message.content}
        </div>
      </div>
    </div>
  );
}
