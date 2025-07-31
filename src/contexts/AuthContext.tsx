import { useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession, User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';
import { AuthContext } from './auth.context';

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
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async (userId: string) => {
    // Obtener perfil general
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    setProfile(profileData || null);

    // Obtener perfil de DJ
    const { data: djProfileData } = await supabase
      .from('dj_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    setDjProfile(djProfileData || null);
  };

  const refreshProfiles = async () => {
    if (user) {
      await fetchProfiles(user.id);
    }
  };
  

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error al obtener la sesión:", error);
        setLoading(false);
        return;
      }
      
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        await fetchProfiles(session.user.id);
      }
      setLoading(false);
    };

    fetchSessionAndProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
            await fetchProfiles(session.user.id);
        } else {
            setProfile(null);
            setDjProfile(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

    const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error signing up:", error);
      setLoading(false);
      throw error;
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          user_id: data.user.id,
          email: data.user.email!,
          full_name: fullName,
          role: role,
        });

      if (profileError) {
        console.error("Error creating profile:", profileError);
        setLoading(false);
        throw profileError;
      }
      
      // Forzar la actualización del perfil después de la creación
      await fetchProfiles(data.user.id);
    }
    
        setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.error("Error signing in:", error);
      setLoading(false);
      throw error;
    }

    // El onAuthStateChange se encargará de actualizar el estado
    setLoading(false);
  };

  const value = {
    session,
    user,
    profile,
    djProfile,
    loading,
    signOut,
    refreshProfiles,
    signUp,
    signIn,
  };

  // No renderizar la aplicación hasta que se haya cargado el estado de autenticación
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
