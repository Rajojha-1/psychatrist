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
    <div className="input-dock">
      <form className="input-box-wrapper" onSubmit={(e) => { e.preventDefault(); onSendMessage(); }}>
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Message your waiting companion..."
          rows={1}
          value={inputValue}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!inputValue.trim() || loading || disabled}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </form>

      <div className="input-disclaimer">
        Private conversation • Relax and chat freely while you wait
      </div>
    </div>
  );
}
