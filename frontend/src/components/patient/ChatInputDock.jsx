import React, { useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInputDock({
  inputValue,
  setInputValue,
  onSendMessage,
  loading,
  disabled
}) {
  const textareaRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  const handleTextareaChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  useEffect(() => {
    if (textareaRef.current && !inputValue) {
      textareaRef.current.style.height = 'auto';
    }
  }, [inputValue]);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-4 pb-6 pt-10 bg-gradient-to-t from-[#080e15] via-[#080e15]/90 to-transparent z-20 pointer-events-auto">
      <form
        className="w-full max-w-2xl bg-[#121c27]/80 backdrop-blur-2xl border border-teal-500/30 rounded-full px-6 py-2.5 flex items-center gap-3 shadow-[0_0_35px_rgba(20,184,166,0.22)] focus-within:border-teal-400/60 focus-within:shadow-[0_0_45px_rgba(20,184,166,0.35)] transition-all"
        onSubmit={(e) => { e.preventDefault(); onSendMessage(); }}
      >
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none outline-none text-slate-100 text-[15px] placeholder-slate-500 resize-none py-1.5 max-h-36 leading-relaxed"
          placeholder="Message your waiting companion..."
          rows={1}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-[#5eead4] hover:bg-[#2dd4bf] text-slate-900 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(94,234,212,0.6)] hover:shadow-[0_0_28px_rgba(94,234,212,0.85)] hover:scale-105 active:scale-95 disabled:opacity-35 disabled:shadow-none disabled:pointer-events-none transition-all cursor-pointer"
          disabled={!inputValue.trim() || loading || disabled}
          aria-label="Send message"
        >
          <Send size={18} className="translate-x-[1px]" />
        </button>
      </form>

      <div className="mt-2.5 text-center text-xs text-slate-500 font-normal tracking-wide">
        Private conversation • Relax and chat freely
      </div>
    </div>
  );
}
