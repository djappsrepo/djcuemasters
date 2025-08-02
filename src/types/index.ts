import { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';
import type { Tables } from '@/integrations/supabase/types';

/**
 * Este archivo contiene las definiciones de tipos y interfaces compartidas
 * a lo largo de toda la aplicación de CueMastersDJ.
 */

// --- Core Authentication Types ---
export type User = SupabaseUser;
export type AuthSession = SupabaseSession;
export type UserRole = Tables<'profiles'>['role'];

// --- Profile Types ---

/**
 * Representa el perfil base de un usuario, generado desde la tabla 'profiles'.
 * Usar esto asegura que el tipo siempre está sincronizado con el esquema de la DB.
 */
export type Profile = Tables<'profiles'>;

/**
 * Representa el perfil de un DJ, generado desde la tabla 'dj_profiles'.
 */
export type DJProfile = Tables<'dj_profiles'>;


// --- Event & Request Types ---

/**
 * Representa un evento o sesión específica creada por un DJ.
 */
export type DJEvent = Tables<'dj_events'>;

/**
 * Representa una solicitud de canción hecha por un asistente.
 */
export type MusicRequest = Tables<'music_requests'>;
