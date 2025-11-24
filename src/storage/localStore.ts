
import localforage from 'localforage';
import { Conversation, Message } from '../types';

// Initialize localforage
localforage.config({
  name: 'Athera AI',
  storeName: 'athera_v1',
  description: 'Local storage for Athera AI conversations'
});

export const getConversations = async (): Promise<Conversation[]> => {
  try {
    const keys = await localforage.keys();
    const conversations: Conversation[] = [];
    
    for (const key of keys) {
      if (key.startsWith('conv_')) {
        const conv = await localforage.getItem<Conversation>(key);
        if (conv) conversations.push(conv);
      }
    }
    // Sort by newest first
    return conversations.sort((a, b) => b.lastModified - a.lastModified);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    return [];
  }
};

export const saveConversation = async (conversation: Conversation): Promise<void> => {
  try {
    await localforage.setItem(`conv_${conversation.id}`, conversation);
  } catch (err) {
    console.error('Error saving conversation:', err);
  }
};

export const getConversation = async (id: string): Promise<Conversation | null> => {
  try {
    return await localforage.getItem<Conversation>(`conv_${id}`);
  } catch (err) {
    console.error('Error fetching conversation:', err);
    return null;
  }
};

export const saveMessage = async (conversationId: string, message: Message): Promise<void> => {
  try {
    const conv = await localforage.getItem<Conversation>(`conv_${conversationId}`);
    if (conv) {
      const updatedConv = {
        ...conv,
        lastModified: Date.now(),
        messages: [...conv.messages, message]
      };
      await localforage.setItem(`conv_${conversationId}`, updatedConv);
    }
  } catch (err) {
    console.error('Error saving message:', err);
  }
};

export const clearAll = async (): Promise<void> => {
  try {
    await localforage.clear();
  } catch (err) {
    console.error('Error clearing storage:', err);
  }
};
