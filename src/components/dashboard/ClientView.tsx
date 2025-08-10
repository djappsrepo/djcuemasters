import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface ClientViewProps {
  profile: Profile;
}

export const ClientView = ({ profile }: ClientViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ¡Hola, {profile.full_name}!
        </h2>
        <p className="text-muted-foreground">
          Encuentra DJs y solicita tus canciones favoritas
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Descubrir DJs</CardTitle>
            <CardDescription>
              Encuentra DJs que están recibiendo solicitudes ahora mismo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => navigate('/discover')}
            >
              Explorar DJs Activos
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Descubre DJs en eventos activos y envía solicitudes musicales
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mis Solicitudes</CardTitle>
            <CardDescription>
              Historial de tus solicitudes musicales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No has hecho solicitudes aún
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
