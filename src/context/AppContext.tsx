import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AppMode, Message, AppContextType } from '../types';
import { INITIAL_WELCOME_MESSAGE } from '../utils/constants';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedMode, setSelectedMode] = useState<AppMode>(AppMode.AGENT);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'model',
      text: INITIAL_WELCOME_MESSAGE,
      timestamp: Date.now(),
    }
  ]);

  const addMessage = useCallback((message: Message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const createNewConversation = useCallback(() => {
    setMessages([
      {
        id: 'init-' + Date.now(),
        role: 'model',
        text: INITIAL_WELCOME_MESSAGE,
        timestamp: Date.now(),
      }
    ]);
  }, []);

  const syncData = useCallback(async () => {
    // This would be implemented with actual sync logic
    setIsSyncing(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSyncing(false);
  }, []);

  return (
    <AppContext.Provider
      value={{
        selectedMode,
        setSelectedMode,
        sidebarOpen,
        setSidebarOpen,
        messages,
        addMessage,
        clearMessages,
        createNewConversation,
        isLoading,
        setIsLoading,
        isSyncing,
        syncData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
