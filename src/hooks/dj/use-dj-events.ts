import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/hooks/auth/use-auth';
import { useToast } from '@/hooks/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/types';

export const useDJEvents = (onEventActivated: (event: Tables<'dj_events'> | null) => void) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Tables<'dj_events'>[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState<Tables<'dj_events'> | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      const eventsData = data || [];
      setEvents(eventsData);
      const currentlyActiveEvent = eventsData.find(e => e.is_active) || null;
      setActiveEvent(currentlyActiveEvent);
      onEventActivated(currentlyActiveEvent);
    } catch (error) {
      toast({ title: "Error al cargar eventos", description: (error as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [user, toast, onEventActivated]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const activateEvent = async (eventToActivate: Tables<'dj_events'>) => {
    if (activeEvent) {
      await deactivateCurrentEvent(false); // Desactivar sin refrescar la lista aún
    }
    const { data: updatedEvent, error: updateError } = await supabase
      .from('dj_events')
      .update({ is_active: true })
      .eq('id', eventToActivate.id)
      .select()
      .single();

    if (updateError || !updatedEvent) {
      toast({ title: "Error al activar evento", description: updateError?.message, variant: "destructive" });
      return;
    }
    setActiveEvent(updatedEvent);
    onEventActivated(updatedEvent);
    toast({ title: "Evento activado", description: `El evento ${updatedEvent.name} ha sido activado.` });
    await fetchEvents(); // Refrescar la lista al final
  };

  const deactivateCurrentEvent = async (shouldFetch = true) => {
    if (!activeEvent) return;
    const { error } = await supabase
      .from('dj_events')
      .update({ is_active: false })
      .eq('id', activeEvent.id);

    if (error) {
      toast({ title: "Error al desactivar evento", description: error.message, variant: "destructive" });
    } else {
      setActiveEvent(null);
      onEventActivated(null);
      toast({ title: "Evento desactivado" });
      if (shouldFetch) {
        await fetchEvents();
      }
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este evento?")) return;

    try {
      const { error } = await supabase.from('dj_events').delete().eq('id', eventId);
      if (error) throw error;
      toast({ title: "Evento eliminado", description: "El evento ha sido eliminado correctamente." });
      await fetchEvents();
    } catch (error) {
      toast({
        title: "Error al eliminar evento",
        description: error instanceof Error ? error.message : "Ocurrió un error desconocido",
        variant: "destructive",
      });
    }
  };

  return {
    events,
    loading,
    activeEvent,
    activateEvent,
    deactivateCurrentEvent,
    deleteEvent,
    fetchEvents
  };
};
