import { useQuery, type QueryKey, type UseQueryOptions } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { PostgrestError } from '@supabase/supabase-js';

// Definimos un tipo genérico para la función de consulta de Supabase
// Definimos un tipo genérico para la función de consulta de Supabase. Acepta el 'thenable' de Supabase.
type SupabaseQueryFn<T> = (supabaseClient: typeof supabase) => PromiseLike<{ data: T | null; error: PostgrestError | null; }>;

/**
 * Un hook genérico para realizar consultas a Supabase con React Query.
 * Proporciona manejo automático de estados de carga, error y cacheo.
 *
 * @param queryKey - Una clave única para la consulta (usada por React Query para el cacheo).
 * @param queryFn - La función que ejecuta la consulta de Supabase. Recibe el cliente de Supabase.
 * @param options - Opciones adicionales para React Query (ej. 'enabled' para consultas condicionales).
 * @returns El estado de la consulta de React Query, incluyendo 'data', 'isLoading', y 'error'.
 */
export const useSupabaseQuery = <T>(
  queryKey: QueryKey,
  queryFn: SupabaseQueryFn<T>,
  options?: Omit<UseQueryOptions<T | null, PostgrestError>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<T | null, PostgrestError>({
    queryKey,
    queryFn: async () => {
      const { data, error } = await queryFn(supabase);
      if (error) {
        throw error;
      }
      return data;
    },
    ...options,
  });
};
