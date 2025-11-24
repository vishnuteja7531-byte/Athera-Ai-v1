import { supabase } from './supabaseClient';

export const registerWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  
  return data;
};

export const loginWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  return data;
};

export const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  
  if (error) throw error;
  
  return data;
};

export const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  
  if (error) throw error;
  
  return true;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error) throw error;
  
  return data.user;
};

export const listenForAuthChanges = (callback: (event: string, session: any) => void) => {
  const { data } = supabase.auth.onAuthStateChange(callback);
  
  return data.subscription;
};