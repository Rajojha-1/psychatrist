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
        className="w-full max-w-2xl backdrop-blur-xl rounded-full px-6 py-2.5 flex items-center gap-3 transition-all relative"
        style={{
          background: 'rgba(18, 28, 38, 0.72)',
          border: '1px solid rgba(45, 212, 191, 0.35)',
          boxShadow: '0 0 25px rgba(20, 184, 166, 0.16), inset 0 0 15px rgba(20, 184, 166, 0.04)'
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (inputValue.trim() && !loading && !disabled) {
            onSendMessage();
          }
        }}
      >
        <textarea
          ref={textareaRef}
          className="flex-1 bg-transparent border-none outline-none text-slate-100 text-[15px] placeholder-slate-400/75 caret-teal-300 resize-none py-1.5 max-h-36 leading-relaxed"
          placeholder="Message your waiting companion..."
          rows={1}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
        />
        <div className="relative flex items-center justify-center flex-shrink-0">
          {/* Luminous cyan bloom layer directly behind the send button */}
          <div
            className="absolute -inset-3 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(67, 237, 219, 0.75) 0%, rgba(20, 184, 166, 0.4) 45%, transparent 70%)',
              filter: 'blur(8px)'
            }}
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer relative hover:scale-105 active:scale-95 disabled:opacity-50"
            style={{
              background: '#3fe0ce',
              boxShadow: '0 0 14px 2px rgba(63, 224, 206, 0.75)'
            }}
            disabled={loading || disabled}
            aria-label="Send message"
          >
            <Send size={18} className="text-white fill-white translate-x-[1px]" />
          </button>
        </div>
      </form>

      <div className="mt-2.5 text-center text-xs text-slate-500 font-normal tracking-wide">
        Private conversation • Relax and chat freely
      </div>
    </div>
  );
}
