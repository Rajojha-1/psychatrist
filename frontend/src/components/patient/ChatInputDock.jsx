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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  useEffect(() => {
    if (textareaRef.current && !inputValue) {
      textareaRef.current.style.height = 'auto';
    }
  }, [inputValue]);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center px-4 pb-6 pt-10 bg-gradient-to-t from-[#0a0d14] via-[#0a0d14]/90 to-transparent z-20 pointer-events-auto">
      <form
        className="w-full max-w-3xl bg-[#121826]/85 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 flex items-end gap-3 shadow-[0_12px_40px_rgba(0,0,0,0.6)] focus-within:border-teal-400/50 focus-within:ring-2 focus-within:ring-teal-400/20 transition-all"
        onSubmit={(e) => { e.preventDefault(); onSendMessage(); }}
      >
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none outline-none text-white text-base placeholder-gray-500 resize-none py-1.5 max-h-40 leading-relaxed"
          placeholder="Message your waiting companion..."
          rows={1}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full bg-[#99f6e4] text-[#0f3d39] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(153,246,228,0.5)] hover:shadow-[0_0_28px_rgba(153,246,228,0.75)] hover:scale-105 active:scale-95 disabled:opacity-35 disabled:shadow-none disabled:pointer-events-none transition-all cursor-pointer"
          disabled={!inputValue.trim() || loading || disabled}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>

      <div className="mt-3 text-center text-xs text-gray-500 font-medium tracking-wide">
        Private conversation • Relax and chat freely
      </div>
    </div>
  );
}
