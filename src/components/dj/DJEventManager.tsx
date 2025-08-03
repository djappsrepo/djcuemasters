import type { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DJEventForm from "./DJEventForm";
import { useDJEventManager } from "@/hooks/use-dj-event-manager";
import { LoadingState, EmptyState, EventCard } from "./DJEventManager.parts";

interface DJEventManagerProps {
  onEventActivated: (event: Tables<'dj_events'> | null) => void;
}

const DJEventManager = ({ onEventActivated }: DJEventManagerProps) => {
  const { 
    events, 
    loading, 
    activateEvent, 
    deactivateCurrentEvent, 
    deleteEvent, 
    fetchEvents, 
    formatDate 
  } = useDJEventManager(onEventActivated);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de Eventos</CardTitle>
        <CardDescription>
          Crea y gestiona tus eventos musicales
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DJEventForm onSuccess={fetchEvents} onCancel={() => {}} eventToEdit={null} />
        
        {events.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard 
                key={event.id}
                event={event}
                formatDate={formatDate}
                onActivate={activateEvent}
                onDeactivate={deactivateCurrentEvent}
                onDelete={deleteEvent}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DJEventManager;
