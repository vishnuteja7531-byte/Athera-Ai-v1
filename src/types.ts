export enum AppMode {
  AGENT = 'Agent',
  DEEP_SEARCH = 'DeepSearch',
  VOICE = 'Voice',
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  conversationId?: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastModified: number;
  mode: AppMode;
  messages: Message[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AppContextType {
  selectedMode: AppMode;
  setSelectedMode: (mode: AppMode) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  createNewConversation: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isSyncing: boolean;
  syncData: () => Promise<void>;
}