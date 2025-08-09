import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import type { Tables, Enums } from '@/types';

type MusicRequest = Tables<'music_requests'>;
type RequestStatus = Enums<'request_status'>;

export const useDJRequests = (eventId: string | undefined) => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<MusicRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    if (!eventId) {
      setRequests([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const { data, error: fetchError } = await supabase
      .from('music_requests')
      .select('*')
      .eq('event_id', eventId)
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Error fetching requests:', fetchError);
      setError(fetchError);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las solicitudes.',
        variant: 'destructive',
      });
    } else {
      setRequests(data || []);
    }
    setIsLoading(false);
  }, [eventId, toast]);

  useEffect(() => {
    // Carga inicial
    fetchRequests();

    if (!eventId) return;

    // Suscripción a cambios en tiempo real
    const channel = supabase
      .channel(`public:music_requests:event_id=eq.${eventId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'music_requests', filter: `event_id=eq.${eventId}` },
        () => {
          // Cuando hay un cambio, simplemente volvemos a cargar los datos.
          // Esto asegura que la UI esté siempre sincronizada.
          fetchRequests();
        }
      )
      .subscribe();

    // Limpieza al desmontar el componente
    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventId, fetchRequests]);

  const updateRequestStatus = async (
    requestId: string,
    newStatus: RequestStatus
  ) => {
    setUpdatingId(requestId);
    const { error: updateError } = await supabase
      .from('music_requests')
      .update({ status: newStatus })
      .eq('id', requestId);

    if (updateError) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la solicitud.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Éxito',
        description: `La solicitud ha sido marcada como ${newStatus}.`,
      });
      // La actualización en tiempo real se encargará de refrescar la UI.
    }
    setUpdatingId(null);
  };

  return { requests, isLoading, error, updateRequestStatus, updatingId };
};
