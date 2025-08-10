import { User, AuthResponse } from '@supabase/supabase-js';
import { Tables } from '@/integrations/supabase/types';

// Define los tipos específicos para nuestros perfiles usando los tipos generados
export type Profile = Tables<'profiles'>;
export type DJProfile = Tables<'dj_profiles'>;


// Define el tipo para el rol de usuario, que puede ser 'dj' o 'cliente'
export type UserRole = 'dj' | 'cliente' | 'admin' | null;

// Define la forma del contexto de autenticación
export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  djProfile: DJProfile | null;
  userRole: UserRole;
  loading: boolean;
  pricingVisible: boolean;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, fullName: string, role: 'dj' | 'cliente') => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  refreshProfiles: () => Promise<void>;
}
