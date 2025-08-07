import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Calendar } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";

type DJProfile = Tables<'dj_profiles'> & { avatar_url?: string | null };
type Event = Tables<'dj_events'>;

interface DjProfileCardProps {
  djProfile: DJProfile;
  activeEvent: Event | null;
}

export const DjProfileCard = ({ djProfile, activeEvent }: DjProfileCardProps) => {
  return (
    <Card className="w-full max-w-md bg-card/70 backdrop-blur-sm border-white/20">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img 
            src={djProfile.avatar_url || '/placeholder.svg'}
            alt={`${djProfile.stage_name} avatar`}
            className="w-10 h-10 rounded-full object-cover bg-muted"
          />
          <div>
            <CardTitle>{djProfile.stage_name}</CardTitle>
            <CardDescription>DJ Profile</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {djProfile.bio && <p className="text-sm text-muted-foreground mb-4">{djProfile.bio}</p>}
        
        {activeEvent && (
          <div className="p-3 bg-secondary/50 rounded-lg mb-4">
            <h4 className="font-semibold text-center mb-2">Active Event</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{activeEvent.name}</span>
              </div>
              {activeEvent.venue && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{activeEvent.venue}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center text-sm">
          <Badge className="border border-input bg-background text-foreground">Requests: {djProfile.total_requests}</Badge>
          {djProfile.average_rating !== null && (
            <Badge className="border border-input bg-background text-foreground">
              Rating: {djProfile.average_rating.toFixed(1)} ★
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
