import type { Tables } from "@/integrations/supabase/types";
import { useDJEvents } from "@/hooks/dj/use-dj-events";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const useDJEventManager = (onEventActivated: (event: Tables<'dj_events'> | null) => void) => {
  const {
    events,
    loading,
    activateEvent,
    deactivateCurrentEvent,
    deleteEvent,
    fetchEvents
  } = useDJEvents(onEventActivated);

  return {
    events,
    loading,
    activateEvent,
    deactivateCurrentEvent,
    deleteEvent,
    fetchEvents,
    formatDate
  };
};
