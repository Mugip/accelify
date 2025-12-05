import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuth } from './useAuth';

export const useUser = () => {
  const { auth, isReady } = useAuth();
  const [user, setUser] = useState(auth?.user ?? null);

  const fetchUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data?.user ?? null);
    return data?.user ?? null;
  }, []);

  useEffect(() => {
    if (isReady && !user) {
      fetchUser();
    }

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, [fetchUser, isReady, user]);

  return { user, data: user, loading: !isReady || !user, refetch: fetchUser };
};

export default useUser;
