
// Firebase imports removed - using local storage only
import { Conversation } from '../types';
import * as localStore from './localStore';

interface SyncResult {
  synced: boolean;
  uploaded: number;
  downloaded: number;
  reason?: string;
}

export const syncLocalToCloud = async (userId: string | null | undefined): Promise<SyncResult> => {
  // Firebase sync removed - using local storage only
  return { synced: false, uploaded: 0, downloaded: 0, reason: 'firebase-removed' };
};
