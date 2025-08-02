import { createContext } from 'react';
import type { AuthSession, User } from '@supabase/supabase-js';
import type { Tables } from '../integrations/supabase/types';

// Define los tipos específicos para nuestros perfiles usando los tipos generados
type Profile = Tables<'profiles'>;
type DJProfile = Tables<'dj_profiles'>;

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
