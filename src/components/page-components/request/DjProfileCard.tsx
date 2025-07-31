import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar } from "lucide-react";
import { DJProfile, DJEvent } from "@/types";

interface DjProfileCardProps {
  djProfile: DJProfile;
  activeEvent: DJEvent | null;
}

const formatDate = (dateString: string | null) => {
  if (!dateString) return "Fecha no disponible";
  try {
    return new Date(dateString).toLocaleDateString("es-MX", {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch (error) {
    return "Fecha inválida";
  }
};

export const DjProfileCard = ({ djProfile, activeEvent }: DjProfileCardProps) => {
  return (
    <Card>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center">
            <User className="w-12 h-12 text-primary-foreground" />
          </div>
        </div>
        <CardTitle className="text-2xl">{djProfile.stage_name}</CardTitle>
        <CardDescription>{djProfile.bio || "Este DJ aún no ha agregado una biografía."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeEvent && (
          <div className="p-3 bg-secondary rounded-lg">
            <h3 className="font-semibold text-center mb-2">Evento Activo</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{activeEvent.name}</span>
            </div>
            {activeEvent.venue && (
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{activeEvent.venue}</span>
              </div>
            )}
            {activeEvent.event_date && (
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                <span>{formatDate(activeEvent.event_date)}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex justify-between items-center text-sm">
          <Badge variant="secondary">Solicitudes: {djProfile.total_requests}</Badge>
          <Badge variant="secondary">Rating: {djProfile.average_rating.toFixed(1)} ★</Badge>
        </div>
      </CardContent>
    </Card>
  );
};
