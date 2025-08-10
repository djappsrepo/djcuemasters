import { supabase } from '../integrations/supabase/client';
import { User, AuthResponse, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { ReactNode, useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContextType, Profile, DJProfile, UserRole } from '../types/auth';
import { Tables } from '@/integrations/supabase/types';
import { AuthContext } from './authContextDefinition';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [pricingVisible, setPricingVisible] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const fetchFullProfile = useCallback(async (user: User) => {
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') throw profileError;

      if (!profileData) {
        console.warn(`Profile not found for user ${user.id}. Signing out.`);
        await signOut();
        return;
      }

      setProfile(profileData);
      setUserRole(profileData.role as UserRole);

      if (profileData.role === 'dj') {
        const { data: djData, error: djError } = await supabase
          .from('dj_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        if (djError && djError.code !== 'PGRST116') throw djError;
        setDjProfile(djData || null);
      } else {
        setDjProfile(null);
      }
    } catch (error) {
      console.error('Error fetching full profile, signing out:', error);
      await signOut();
    } finally {
      setLoading(false);
    }
  }, [signOut]);

  useEffect(() => {
        const fetchPricingVisibility = async () => {
      try {
        const { data, error } = await supabase
          .from('site_config')
          .select('value')
          .eq('key', 'pricing_visible')
          .single();

        if (error) throw error;
        
        // Aseguramos que el valor sea un booleano
        setPricingVisible(Boolean(data.value));

      } catch (error) {
        console.error('Error fetching pricing visibility, defaulting to true:', error);
        setPricingVisible(true);
      }
    };

    fetchPricingVisibility();

    setLoading(true);
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: AuthChangeEvent, session: Session | null) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);

      if (currentUser) {
        await fetchFullProfile(currentUser);
      } else {
        setProfile(null);
        setDjProfile(null);
        setUserRole(null);
      }
      // Solo poner loading en false cuando todo (auth y config) haya terminado.
      // La config se obtiene una vez, así que el loading principal depende del estado de la sesión.
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [fetchFullProfile]);

  const signIn = useCallback(async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  }, []);

  const signUp = useCallback(async (email: string, password: string, fullName: string, role: 'dj' | 'client') => {
    const authResponse = await supabase.auth.signUp({ email, password });
    if (authResponse.error) throw new Error(`Error on sign up: ${authResponse.error.message}`);
    if (!authResponse.data.user) throw new Error('Could not create user.');

    const { error: profileError } = await supabase.from('profiles').insert(
      { user_id: authResponse.data.user.id, full_name: fullName, role: role, email: email }
    );
    if (profileError) throw new Error(`Error creating profile: ${profileError.message}`);

    if (role === 'dj') {
      const { error: djProfileError } = await supabase.from('dj_profiles').insert(
        { user_id: authResponse.data.user.id, stage_name: `DJ ${fullName}` }
      );
      if (djProfileError) throw new Error(`Error creating DJ profile: ${djProfileError.message}`);
    }
    return authResponse;
  }, []);

  const signInWithGoogle = useCallback(async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  }, []);

  const refreshProfiles = useCallback(async () => {
    if (user) {
      await fetchFullProfile(user);
    }
  }, [user, fetchFullProfile]);

    const value = useMemo(() => ({
    user,
    profile,
    djProfile,
    userRole,
    loading,
    pricingVisible,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshProfiles,
  }), [user, profile, djProfile, userRole, loading, pricingVisible, signIn, signUp, signOut, signInWithGoogle, refreshProfiles]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


