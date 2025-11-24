
import React, { useState, KeyboardEvent } from 'react';
import ModeSwitcher from './ModeSwitcher';
import { useApp } from '../context/AppContext';

interface ChatBoxProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { isLoading } = useApp();

  const handleSend = () => {
    if (input.trim() && !disabled && !isLoading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 md:left-[260px] right-0 p-6 bg-gradient-to-t from-background via-background to-transparent z-10">
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <ModeSwitcher />
        
        <div className="w-full relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "Thinking..." : "Ask Athera anything..."}
            disabled={disabled || isLoading}
            className="w-full h-[56px] pl-6 pr-14 bg-surface rounded-lg shadow-sm border border-transparent focus:border-gray-200 focus:shadow-md transition-all outline-none text-primary placeholder-muted disabled:opacity-70 disabled:cursor-not-allowed"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || disabled || isLoading}
            className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-md bg-accent text-white hover:bg-black disabled:opacity-50 disabled:hover:bg-accent transition-colors"
          >
            {isLoading ? (
               <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" x2="11" y1="2" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            )}
          </button>
        </div>
        <div className="mt-2 text-[10px] text-muted tracking-wide opacity-60">
          Athera can make mistakes. Verify important information.
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
