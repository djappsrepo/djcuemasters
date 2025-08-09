import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, User, MapPin, Calendar, DollarSign, ExternalLink } from "lucide-react";

interface DJWithEvents {
  id: string;
  user_id: string;
  stage_name: string;
  bio: string | null;
  minimum_tip: number;
  average_rating: number | null;
  total_requests: number;
  events: Array<{
    id: string;
    name: string;
    venue: string | null;
    event_date: string | null;
  }>;
}

const DJDiscovery = () => {
  const [activeDJs, setActiveDJs] = useState<DJWithEvents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActiveDJs();
  }, []);

  const fetchActiveDJs = async () => {
    try {
      // Obtener DJs activos con eventos activos
      const { data: djsData, error: djsError } = await supabase
        .from('dj_profiles')
        .select(`
          id,
          user_id,
          stage_name,
          bio,
          minimum_tip,
          average_rating,
          total_requests
        `)
        .eq('active', true);

      if (djsError) throw djsError;

      // Para cada DJ, obtener sus eventos activos
      const djsWithEvents = await Promise.all(
        (djsData || []).map(async (dj) => {
          const { data: eventsData } = await supabase
            .from('dj_events')
            .select('id, name, venue, event_date')
            .eq('dj_id', dj.user_id)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

          return {
            ...dj,
            events: eventsData || []
          };
        })
      );

      // Filtrar solo DJs que tienen eventos activos
      const djsWithActiveEvents = djsWithEvents.filter(dj => dj.events.length > 0);
      
      setActiveDJs(djsWithActiveEvents);
    } catch (error) {
      console.error('Error fetching active DJs:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Hoy ${date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
    
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <Music className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Buscando DJs activos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          DJs Activos
        </h1>
        <p className="text-muted-foreground">
          Descubre DJs que están recibiendo solicitudes musicales en este momento
        </p>
      </div>

      {activeDJs.length === 0 ? (
        <Card className="max-w-md mx-auto">
          <CardContent className="py-8 text-center">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">No hay DJs activos</h3>
            <p className="text-sm text-muted-foreground">
              En este momento no hay DJs recibiendo solicitudes musicales.
              ¡Vuelve a revisar más tarde!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeDJs.map((dj) => (
            <Card key={dj.id} className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{dj.stage_name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        ⭐ {dj.average_rating?.toFixed(1) || '0.0'}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {dj.total_requests} solicitudes
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {dj.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {dj.bio}
                  </p>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground">Desde</span>
                  <span className="font-semibold">${dj.minimum_tip.toFixed(2)}</span>
                </div>

                {/* Eventos activos */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground text-sm">Eventos activos:</h4>
                  {dj.events.slice(0, 2).map((event) => (
                    <div key={event.id} className="bg-muted/50 rounded-lg p-2">
                      <div className="font-medium text-sm text-foreground">
                        {event.name}
                      </div>
                      {event.venue && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </div>
                      )}
                      {event.event_date && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.event_date)}
                        </div>
                      )}
                    </div>
                  ))}
                  {dj.events.length > 2 && (
                    <p className="text-xs text-muted-foreground">
                      +{dj.events.length - 2} eventos más
                    </p>
                  )}
                </div>

                <Link to={`/request/${dj.user_id}`}>
                  <Button variant="hero" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Enviar Solicitud
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DJDiscovery;