import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function useUser() {
  const [user, setUser] = useState(supabase.auth.getUser()?.data.user ?? null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user, loading };
}
