import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { User, AuthError, AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

// Tipos extraídos del esquema de Supabase para mayor claridad
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type DJProfile = Database['public']['Tables']['dj_profiles']['Row'];
export type UserRole = Database['public']['Enums']['app_role'];

// Interfaz para el valor del contexto
export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  djProfile: DJProfile | null;
  userRole: UserRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string, role: 'dj' | 'client') => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  refreshProfiles: () => Promise<void>;
}

// Creación del contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider del contexto
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFullProfile = useCallback(async (currentUser: User) => {
    setLoading(true);
    try {
      // 1. Fetch base profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('id', currentUser.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData as Profile);
      setUserRole(profileData.role as UserRole);

      // 2. If user is a DJ, fetch DJ-specific profile
      if (profileData.role === 'dj') {
        const { data: djData, error: djError } = await supabase
          .from('dj_profiles')
          .select('user_id, stage_name, bio') // Corrected: removed non-existent columns
          .eq('user_id', currentUser.id)
          .single();

        // A non-existent DJ profile is not a fatal error, just means it needs to be created.
        if (djError && djError.code !== 'PGRST116') throw djError;
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
    const getSessionAndProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchFullProfile(session.user);
      } else {
        setLoading(false);
      }
    };

    getSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;
      setUser(currentUser ?? null);
      if (currentUser) {
        fetchFullProfile(currentUser);
      } else {
        setProfile(null);
        setDjProfile(null);
        setUserRole(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [fetchFullProfile]);

  const signIn = useCallback((email: string, password: string) => supabase.auth.signInWithPassword({ email, password }), []);

  const signUp = useCallback((email: string, password: string, fullName: string, role: 'dj' | 'client') => supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, role: role } },
  }), []);

  const signOut = useCallback(() => supabase.auth.signOut(), []);

  const signInWithGoogle = useCallback(() => supabase.auth.signInWithOAuth({ provider: 'google' }), []);

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
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    refreshProfiles,
  }), [user, profile, djProfile, userRole, loading, signIn, signUp, signOut, signInWithGoogle, refreshProfiles]);

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};