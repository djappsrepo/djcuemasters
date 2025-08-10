import { createContext, useContext } from 'react';
import type { Session, User, AuthResponse, AuthError, OAuthResponse } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

// Tipos de datos derivados de la base de datos
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type DJProfile = Database['public']['Tables']['dj_profiles']['Row'];
export type UserRole = Profile['role'] | null;

// Interfaz para el valor del contexto
export interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  djProfile: DJProfile | null;
  userRole: UserRole;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string, role: 'dj' | 'user') => Promise<AuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  refreshProfiles: () => Promise<void>;
}

// Creación del contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};