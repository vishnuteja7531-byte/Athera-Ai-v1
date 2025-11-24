import React, { useEffect, useRef } from 'react';
import ChatLayout from '../layouts/ChatLayout';
import ChatBox from '../components/ChatBox';
import MessageBubble from '../components/MessageBubble';
import { useApp } from '../context/AppContext';
import { generateTextResponse } from '../services/geminiService';
import { AppMode } from '../types';

const Chat: React.FC = () => {
  const { messages, addMessage, setIsLoading, selectedMode } = useApp();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    // 1. Add user message
    addMessage({
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: Date.now(),
    });

    setIsLoading(true);

    try {
      // 2. Select model based on mode (conceptually)
      let model = 'gemini-2.5-flash';
      if (selectedMode === AppMode.DEEP_SEARCH) {
        // In a real app, this would trigger a different service flow
        model = 'gemini-2.5-flash'; 
      } else if (selectedMode === AppMode.VOICE) {
         // Voice mode logic placeholder
         model = 'gemini-2.5-flash'; 
      }

      // 3. Call Gemini
      const responseText = await generateTextResponse(text, model);

      // 4. Add AI response
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now(),
      });
    } catch (error) {
      addMessage({
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I apologize, but I encountered a connection error. Please try again.",
        timestamp: Date.now(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatLayout>
      <div className="flex-1 overflow-y-auto pt-8 pb-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
             <div className="text-center mt-20 opacity-50 text-sm">No messages yet. Start the conversation.</div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatBox onSend={handleSendMessage} />
    </ChatLayout>
  );
};

export default Chat;
