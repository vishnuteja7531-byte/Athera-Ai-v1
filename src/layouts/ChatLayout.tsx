import React from 'react';
import AppLayout from './AppLayout';

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <div className="w-full h-full min-h-screen flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-100 py-4 px-4 md:px-8">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-semibold">Athera — Ready</h1>
          </div>
        </header>
        {children}
      </div>
    </AppLayout>
  );
};

export default ChatLayout;
