import React from 'react';
import { Sparkles, User } from 'lucide-react';

export default function MessageBubble({ message, isTyping = false }) {
  if (isTyping) {
    return (
      <div className="message-row assistant">
        <div className="message-avatar companion">
          <Sparkles size={16} />
        </div>
        <div className="typing-bubble">
          <span className="dot-pulse" />
          <span className="dot-pulse" />
          <span className="dot-pulse" />
        </div>
      </div>
    );
  }

  const isUser = message.role === 'user';

  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="message-avatar companion" title="Waiting Room Companion">
          <Sparkles size={16} />
        </div>
      )}

      <div className={`message-bubble ${isUser ? 'user-bubble' : 'companion-bubble'}`}>
        {message.content}
      </div>

      {isUser && (
        <div className="message-avatar user" title="You">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
