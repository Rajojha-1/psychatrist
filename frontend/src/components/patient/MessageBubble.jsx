import React from 'react';
import { Sparkles, User } from 'lucide-react';

export default function MessageBubble({ message, isTyping = false }) {
  if (isTyping) {
    return (
      <div className="flex items-start gap-3 w-full animate-fadeIn">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Sparkles size={16} />
        </div>
        <div className="flex items-center gap-1.5 px-5 py-4 rounded-2xl rounded-bl-sm bg-[#121826]/80 border border-white/[0.07] backdrop-blur-xl">
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:200ms]" />
          <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse [animation-delay:400ms]" />
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
      {!isUser && (
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/20 to-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5" title="Companion">
          <Sparkles size={16} />
        </div>
      )}

      <div
        className={`max-w-[82%] px-5 py-3.5 text-[0.96rem] leading-relaxed break-words ${
          isUser
            ? 'bg-gradient-to-r from-teal-400 to-cyan-300 text-slate-950 font-medium rounded-2xl rounded-br-sm shadow-[0_4px_20px_rgba(20,184,166,0.25)]'
            : 'bg-[#121826]/80 text-gray-200 border border-white/[0.08] backdrop-blur-xl rounded-2xl rounded-bl-sm shadow-md'
        }`}
      >
        {message.content}
      </div>

      {isUser && (
        <div className="w-9 h-9 rounded-full bg-teal-400/15 border border-teal-400/30 text-teal-300 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5" title="You">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
