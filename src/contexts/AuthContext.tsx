import { useState, useEffect, ReactNode, createContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession, User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

// Define la forma de nuestro contexto para una máxima seguridad de tipos
export type UserRole = 'admin' | 'dj' | 'cliente' | null;

export interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  profile: Profile | null;
  djProfile: DJProfile | null;
  loading: boolean;
  userRole: UserRole;
  signOut: () => void;
  refreshProfiles: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

// Creamos el contexto.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define los tipos específicos para nuestros perfiles usando los tipos generados
type Profile = Tables<'profiles'>;
type DJProfile = Tables<'dj_profiles'>;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<AuthSession | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async (userId: string) => {
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError) {
      console.error('Error fetching user profile:', profileError.message);
      setProfile(null);
      setDjProfile(null);
      setUserRole(null);
      return;
    }

    setProfile(profileData as Profile);
    setUserRole(profileData.role as UserRole);

    if (profileData.role === 'dj') {
      const { data: djProfileData, error: djProfileError } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('user_id', profileData.id)
        .single();

      if (djProfileError && djProfileError.code !== 'PGRST116') {
        console.error('Error fetching DJ profile:', djProfileError.message);
        setDjProfile(null);
      } else {
        setDjProfile(djProfileData || null);
      }
    } else {
      setDjProfile(null);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          await fetchProfiles(session.user.id);
        }
        
        setSession(session);
        setUser(session?.user ?? null);
      } catch (e) {
        console.error("Error initializing session:", e);
        setSession(null);
        setUser(null);
        setProfile(null);
        setDjProfile(null);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setLoading(true);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setSession(session);

      if (currentUser) {
        await fetchProfiles(currentUser.id);
      } else {
        setProfile(null);
        setDjProfile(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const refreshProfiles = async () => {
    if (user) {
      setLoading(true);
      await fetchProfiles(user.id);
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setProfile(null);
    setDjProfile(null);
    setUserRole(null);
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;
    if (!data.user) throw new Error("Sign up successful, but no user data returned.");

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ user_id: data.user.id, email: data.user.email!, full_name: fullName, role: role });

    if (profileError) throw profileError;
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const value = {
    session,
    user,
    profile,
    userRole,
    djProfile,
    loading,
    signOut,
    refreshProfiles,
    signUp,
    signIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
