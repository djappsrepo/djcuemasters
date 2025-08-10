import { useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { Session, User, AuthResponse, AuthError, OAuthResponse } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { AuthContext, Profile, DJProfile, UserRole, AuthContextType } from '@/contexts/AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFullProfile = useCallback(async (currentUser: User) => {
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData as Profile);
      setUserRole(profileData.role as UserRole);

      if (profileData.role === 'dj') {
        const { data: djData, error: djError } = await supabase
          .from('dj_profiles')
          .select('*')
          .eq('user_id', currentUser.id)
          .single();

        if (djError && djError.code !== 'PGRST116') throw djError; // Ignorar si no se encuentra perfil de DJ
        setDjProfile(djData as DJProfile || null);
      } else {
        setDjProfile(null);
      }
    } catch (error) {
      console.error('Error fetching full profile:', error);
      setProfile(null);
      setDjProfile(null);
      setUserRole(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      if (initialSession?.user) {
        await fetchFullProfile(initialSession.user);
      } else {
        setLoading(false);
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      if (newSession?.user) {
        fetchFullProfile(newSession.user);
      } else {
        setProfile(null);
        setDjProfile(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [fetchFullProfile]);

  const signIn = (email: string, password: string): Promise<AuthResponse> => supabase.auth.signInWithPassword({ email, password });

  const signUp = (email: string, password: string, fullName: string, role: 'dj' | 'user'): Promise<AuthResponse> => {
    return supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });
  };

  const signInWithGoogle = (): Promise<OAuthResponse> => {
    return supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const signOut = (): Promise<{ error: AuthError | null }> => supabase.auth.signOut();

  const refreshProfiles = useCallback(async () => {
    if (user) {
      await fetchFullProfile(user);
    }
  }, [user, fetchFullProfile]);

  const value: AuthContextType = useMemo(() => ({
    session,
    user,
    profile,
    djProfile,
    userRole,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshProfiles,
  }), [session, user, profile, djProfile, userRole, loading, refreshProfiles]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};