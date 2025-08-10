import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/ui/use-toast";
import type { Tables } from '@/types';

type DJProfile = Tables<'dj_profiles'> & { avatar_url: string | null };
type DJEvent = Tables<'dj_events'>;

interface UseDJPublicProfileReturn {
  djProfile: DJProfile | null;
  djEvents: DJEvent[];
  loading: boolean;
  error: string | null;
}

export const useDJPublicProfile = (djId: string | undefined): UseDJPublicProfileReturn => {
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
      // 1. Fetch DJ Profile
      const { data: djProfileData, error: profileError } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('user_id', djId)
        .eq('active', true)
        .single();

      if (profileError) throw new Error('Perfil de DJ no encontrado o inactivo.');

      // 2. Fetch Avatar from profiles table
      const { data: avatarData } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('user_id', djProfileData.user_id)
        .single();

      // 3. Combine data
      const fullProfile = {
        ...djProfileData,
        avatar_url: avatarData?.avatar_url || null,
      };
      setDjProfile(fullProfile);

      // 4. Fetch Events
      const { data: eventsData, error: eventsError } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', fullProfile.id)
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
