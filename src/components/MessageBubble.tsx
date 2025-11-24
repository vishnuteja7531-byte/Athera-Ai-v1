import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div 
        className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser 
            ? 'bg-accent text-white rounded-br-none' 
            : 'bg-surface text-primary border border-gray-100 rounded-bl-none'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">{message.text}</div>
        <div className={`text-[10px] mt-1 ${isUser ? 'text-white/70' : 'text-muted'}`}>
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;