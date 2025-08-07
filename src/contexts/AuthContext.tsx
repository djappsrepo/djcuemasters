import { useState, useEffect, ReactNode, useContext, createContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthSession, User } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

// Define UserRole type
export type UserRole = 'admin' | 'dj' | 'cliente' | null;

// Define the context interface
interface AuthContextType {
  session: AuthSession | null;
  user: User | null;
  profile: Profile | null;
  userRole: UserRole;
  djProfile: DJProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfiles: () => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
}

// Define los tipos específicos para nuestros perfiles usando los tipos generados
type Profile = Tables<'profiles'>;
type DJProfile = Tables<'dj_profiles'>;

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

  // Función para obtener el perfil del usuario
  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return;
      }

      setProfile(profileData);
      setUserRole(profileData.role as UserRole);

      // Si es DJ, obtener también el perfil de DJ
      if (profileData.role === 'dj') {
        const { data: djData, error: djError } = await supabase
          .from('dj_profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (djError && djError.code !== 'PGRST116') {
          console.error('Error fetching DJ profile:', djError);
        } else if (djData) {
          setDjProfile(djData);
        }
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const refreshProfiles = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setProfile(null);
      setDjProfile(null);
      setUserRole(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          }
        }
      });

      if (error) throw error;
      
      // El perfil se creará automáticamente por el trigger de la base de datos
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  useEffect(() => {
    // Obtener sesión inicial
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          await fetchProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
          setDjProfile(null);
          setUserRole(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
