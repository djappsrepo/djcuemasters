import type { Tables } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Play, Pause, Trash2 } from "lucide-react";

// --- State Display Components ---

export const LoadingState = () => (
  <Card>
    <CardContent className="py-8">
      <div className="text-center text-muted-foreground">Cargando eventos...</div>
    </CardContent>
  </Card>
);

export const EmptyState = () => (
  <div className="text-center py-8 text-muted-foreground">
    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
    <p>No tienes eventos creados aún</p>
    <p className="text-sm">Crea tu primer evento para empezar a recibir solicitudes</p>
  </div>
);

// --- Main Event Card Component ---

interface EventCardProps {
  event: Tables<'dj_events'>;
  formatDate: (dateString: string) => string;
  onActivate: (event: Tables<'dj_events'>) => void;
  onDeactivate: () => void;
  onDelete: (id: string) => void;
}

export const EventCard = ({ event, formatDate, onActivate, onDeactivate, onDelete }: EventCardProps) => (
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
            onClick={() => event.is_active ? onDeactivate() : onActivate(event)}
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
            onClick={() => onDelete(event.id)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);
