import React from 'react';
import AppLayout from './AppLayout';

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppLayout>
      <div className="w-full h-full min-h-screen flex flex-col relative overflow-hidden">
        {children}
      </div>
    </AppLayout>
  );
};

export default ChatLayout;
