import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Play, Pause, Trash2 } from "lucide-react";
import DJEventForm from "./DJEventForm";

interface Event {
  id: string;
  name: string;
  description: string | null;
  venue: string | null;
  event_date: string | null;
  is_active: boolean;
  total_requests: number;
  total_earnings: number;
  created_at: string;
}

const DJEventManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      toast({
        title: "Error al cargar eventos",
        description: error instanceof Error ? error.message : "Ocurrió un error desconocido",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    if(user) {
      fetchEvents();
    }
  }, [user, fetchEvents]);

  const toggleEventStatus = async (eventId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('dj_events')
        .update({ is_active: !currentStatus })
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: currentStatus ? "Evento pausado" : "Evento activado",
        description: currentStatus 
          ? "El evento ya no recibe solicitudes" 
          : "El evento ahora recibe solicitudes",
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error al actualizar evento",
        description: error instanceof Error ? error.message : "Ocurrió un error desconocido",
        variant: "destructive",
      });
    }
  };

  const deleteEvent = async (eventId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este evento?")) return;

    try {
      const { error } = await supabase
        .from('dj_events')
        .delete()
        .eq('id', eventId);

      if (error) throw error;

      toast({
        title: "Evento eliminado",
        description: "El evento ha sido eliminado correctamente.",
      });

      fetchEvents();
    } catch (error) {
      toast({
        title: "Error al eliminar evento",
        description: error instanceof Error ? error.message : "Ocurrió un error desconocido",
        variant: "destructive",
      });
    }
  };

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
                      
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                        <Users className="w-3 h-3" />
                        {event.total_requests} solicitudes • ${event.total_earnings.toFixed(2)} recaudado
                      </div>
                      
                      {event.description && (
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleEventStatus(event.id, event.is_active)}
                      >
                        {event.is_active ? (
                          <Pause className="w-3 h-3" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
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
