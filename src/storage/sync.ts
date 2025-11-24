
import { firestore as db, isConfigured } from '../auth/FirebaseProvider';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { Conversation } from '../types';
import * as localStore from './localStore';

interface SyncResult {
  synced: boolean;
  uploaded: number;
  downloaded: number;
  reason?: string;
}

export const syncLocalToCloud = async (userId: string | null | undefined): Promise<SyncResult> => {
  if (!userId || !isConfigured || !db) {
    return { synced: false, uploaded: 0, downloaded: 0, reason: 'no-auth-or-config' };
  }

  try {
    console.log('Starting sync for user:', userId);
    let uploadedCount = 0;
    let downloadedCount = 0;

    // 1. Fetch Cloud Docs
    const chatsRef = collection(db, 'users', userId, 'chats');
    const snapshot = await getDocs(chatsRef);
    const cloudDocsMap = new Map<string, Conversation>();

    snapshot.forEach(doc => {
      const data = doc.data() as Conversation;
      // Ensure messages array exists
      if (!data.messages) data.messages = [];
      cloudDocsMap.set(data.id, data);
    });

    // 2. Fetch Local Docs
    const localDocs = await localStore.getConversations();
    const localDocsMap = new Map<string, Conversation>();
    localDocs.forEach(doc => localDocsMap.set(doc.id, doc));

    // 3. Merge Logic
    const allIds = new Set([...cloudDocsMap.keys(), ...localDocsMap.keys()]);
    
    for (const id of allIds) {
      const local = localDocsMap.get(id);
      const cloud = cloudDocsMap.get(id);

      if (local && !cloud) {
        // Exists locally only -> Push to Cloud
        await setDoc(doc(db, 'users', userId, 'chats', id), local);
        uploadedCount++;
      } 
      else if (!local && cloud) {
        // Exists cloud only -> Pull to Local
        await localStore.saveConversation(cloud);
        downloadedCount++;
      } 
      else if (local && cloud) {
        // Exists in both -> Conflict Resolution (Last Modified Wins)
        if (local.lastModified > cloud.lastModified) {
          // Local is newer -> Push to Cloud
          await setDoc(doc(db, 'users', userId, 'chats', id), local);
          uploadedCount++;
        } else if (cloud.lastModified > local.lastModified) {
          // Cloud is newer -> Pull to Local
          await localStore.saveConversation(cloud);
          downloadedCount++;
        } else {
            // Equal timestamps - assume synced, but content might differ.
            // Check message count as a simple heuristic
             if (local.messages.length > cloud.messages.length) {
                 await setDoc(doc(db, 'users', userId, 'chats', id), local);
                 uploadedCount++;
             } else if (cloud.messages.length > local.messages.length) {
                 await localStore.saveConversation(cloud);
                 downloadedCount++;
             }
        }
      }
    }

    console.log(`Sync complete. Uploaded: ${uploadedCount}, Downloaded: ${downloadedCount}`);
    return { synced: true, uploaded: uploadedCount, downloaded: downloadedCount };

  } catch (error) {
    console.error('Sync failed:', error);
    return { synced: false, uploaded: 0, downloaded: 0, reason: 'error' };
  }
};
