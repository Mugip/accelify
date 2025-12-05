import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect } from 'react';
import { useAuthModal, useAuthStore, authKey } from './store';
import { supabase } from '../../lib/supabase';

export const useAuth = () => {
  const { isReady, auth, setAuth } = useAuthStore();
  const { isOpen, close, open } = useAuthModal();

  const initiate = useCallback(() => {
    SecureStore.getItemAsync(authKey).then((authData) => {
      useAuthStore.setState({
        auth: authData ? JSON.parse(authData) : null,
        isReady: true,
      });
    });
  }, []);

  // Sign in with email (magic link)
  const signIn = useCallback(
    async (email) => {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      open({ mode: 'signin', message: 'Check your email for the magic link!' });
    },
    [open]
  );

  // Sign up (same as sign in with email)
  const signUp = useCallback(
    async (email) => {
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      open({ mode: 'signup', message: 'Check your email for the magic link!' });
    },
    [open]
  );

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setAuth(null);
    close();
    router.replace('/'); // optional: redirect to home
  }, [close, setAuth]);

  return {
    isReady,
    isAuthenticated: isReady ? !!auth : null,
    signIn,
    signOut,
    signUp,
    auth,
    setAuth,
    initiate,
  };
};

export const useRequireAuth = (options) => {
  const { isAuthenticated, isReady } = useAuth();
  const { open } = useAuthModal();

  useEffect(() => {
    if (!isAuthenticated && isReady) {
      open({ mode: options?.mode });
    }
  }, [isAuthenticated, open, options?.mode, isReady]);
};

export default useAuth;
