import { useCallback } from 'react';
import { supabase } from '../lib/supabase';

function useAuth() {
  const signInWithEmail = useCallback(async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) throw error;
    return true;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) throw error;
    return true;
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  }, []);

  return {
    signInWithEmail,
    signInWithGoogle,
    signOut
  };
}

export default useAuth;
