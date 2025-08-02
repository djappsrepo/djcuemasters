import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type MusicRequest = Tables<'music_requests'>;

export const usePaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [request, setRequest] = useState<MusicRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      setError('No se proporcionó un ID de solicitud.');
      setLoading(false);
      return;
    }

    const fetchRequest = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('music_requests')
          .select('*')
          .eq('id', requestId)
          .single();

        if (dbError) {
          throw new Error('No se pudo encontrar la solicitud. Por favor, verifica el enlace.');
        }

        setRequest(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error inesperado.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [searchParams]);

  return { request, loading, error };
};
