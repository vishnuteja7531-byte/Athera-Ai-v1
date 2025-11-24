
import { useContext } from "react";
import { AuthContext, isConfigured } from "./FirebaseProvider";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile
} from "firebase/auth";
import type { User } from "firebase/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a FirebaseProvider");

  const { user, loading, authInstance } = context;

  const ensureAuth = () => {
    if (!isConfigured || !authInstance) {
      throw new Error("Firebase is not configured. Authentication unavailable.");
    }
    return authInstance;
  };

  const signUpEmail = async (email: string, password: string, name?: string): Promise<User> => {
    const auth = ensureAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (name && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
    }
    return userCredential.user;
  };

  const signInEmail = async (email: string, password: string): Promise<User> => {
    const auth = ensureAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  };

  const signInWithGoogle = async (): Promise<User> => {
    const auth = ensureAuth();
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential.user;
  };

  const signOut = async () => {
    const auth = ensureAuth();
    await firebaseSignOut(auth);
  };

  return {
    user,
    loading,
    isConfigured,
    signUpEmail,
    signInEmail,
    signInWithGoogle,
    signOut
  };
};
