import type { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Play, Pause, Trash2 } from "lucide-react";
import DJEventForm from "./DJEventForm";
import { useDJEvents } from "@/hooks/useDJEvents";

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
    fetchEvents 
  } = useDJEvents(onEventActivated);

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

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">Cargando eventos...</div>
        </CardContent>
      </Card>
    );
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
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No tienes eventos creados aún</p>
            <p className="text-sm">Crea tu primer evento para empezar a recibir solicitudes</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <Card key={event.id} className="border-muted">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground">{event.name}</h3>
                        <Badge variant={event.is_active ? "default" : "secondary"}>
                          {event.is_active ? "Activo" : "Pausado"}
                        </Badge>
                      </div>
                      
                      {event.venue && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </div>
                      )}
                      
                      {event.event_date && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.event_date)}
                        </div>
                      )}
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => event.is_active ? deactivateCurrentEvent() : activateEvent(event)}
                      >
                        {event.is_active ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteEvent(event.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DJEventManager;
