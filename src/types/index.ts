/**
 * Este archivo contiene las definiciones de tipos y interfaces compartidas
 * a lo largo de toda la aplicación de CueMastersDJ.
 * Centralizar los tipos aquí ayuda a mantener la consistencia y facilita
 * el mantenimiento del código.
 */

/**
 * Representa el perfil público y de configuración de un DJ.
 */
export interface DJProfile {
  id: string; // Corresponde al ID en la tabla dj_profiles
  user_id: string; // FK a la tabla auth.users
  stage_name: string;
  bio: string | null;
  minimum_tip: number;
  active: boolean;
  average_rating: number;
  total_requests: number;
}

/**
 * Representa un evento o sesión específica creada por un DJ.
 */
export interface DJEvent {
  id: string;
  dj_id: string; // FK a la tabla dj_profiles
  name: string;
  description: string | null;
  venue: string | null;
  event_date: string | null;
  is_active: boolean;
}

/**
 * Representa una solicitud de canción hecha por un asistente.
 */
export interface MusicRequest {
  id: string;
  dj_id: string; // FK a la tabla dj_profiles
  event_id: string | null; // FK a la tabla dj_events
  song_title: string;
  artist_name: string;
  client_name: string;
  client_email: string | null;
  tip_amount: number;
  message: string | null;
  status: 'pending' | 'played' | 'rejected' | 'archived';
  payment_status: 'pending' | 'succeeded' | 'failed' | 'awaiting_payment';
  created_at: string;
}
