import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

export const useDJPublicProfile = (djId: string | undefined) => {
  const { toast } = useToast();
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [djEvents, setDjEvents] = useState<DJEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDJData = useCallback(async () => {
    if (!djId) {
      setLoading(false);
      setError('No DJ ID provided.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data: profileData, error: profileError } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('user_id', djId)
        .eq('active', true)
        .single();

      if (profileError) throw new Error('Perfil de DJ no encontrado o inactivo.');
      setDjProfile(profileData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', profileData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;
      
      setDjEvents(eventsData || []);

    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Ocurrió un error desconocido.';
      setError(errorMessage);
      toast({
        title: 'No se pudo cargar la información del DJ',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [djId, toast]);

  useEffect(() => {
    fetchDJData();
  }, [fetchDJData]);

  return { djProfile, djEvents, loading, error };
};
