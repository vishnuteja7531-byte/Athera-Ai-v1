
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, getAuth, GoogleAuthProvider } from "firebase/auth";
import type { User, Auth } from "firebase/auth";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfig } from "../firebase/config";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  authInstance: Auth | undefined;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Global instances
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let googleProvider: GoogleAuthProvider | undefined;
let firestore: Firestore | undefined;

// Check if config exists and has valid structure (simple check)
export const isConfigured = !!firebaseConfig && !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "";

if (isConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApp();
    }
    
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
    firestore = getFirestore(app);
    
    console.log("Firebase initialized successfully in Provider.");
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.warn("Firebase config missing or invalid. App running in local-only mode.");
}

export { auth, googleProvider, firestore };

export const FirebaseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!auth) {
      setUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, authInstance: auth }}>
      {children}
    </AuthContext.Provider>
  );
};
