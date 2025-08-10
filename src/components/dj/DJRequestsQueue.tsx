import { useDJRequests } from '@/hooks/useDJRequests';
import type { Tables, Enums } from '@/integrations/supabase/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedLoader } from '@/components/ui/UnifiedLoader';
import { Check, XCircle, Music, User, Mail } from 'lucide-react';

interface DJRequestsQueueProps {
  eventId: string | undefined;
  isEventActive: boolean;
}

type MusicRequest = Tables<'music_requests'>;
type PaymentStatus = Enums<'payment_status'>;

const getPaymentStatusVariant = (status: PaymentStatus): 'default' | 'destructive' | 'secondary' => {
  switch (status) {
    case 'succeeded':
      return 'secondary';
    case 'pending':
      return 'default';
    case 'failed':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const DJRequestsQueue = ({ eventId, isEventActive }: DJRequestsQueueProps) => {
  const { requests, isLoading, error, updateRequestStatus, updatingId } = useDJRequests(eventId);

  if (!isEventActive && (!requests || requests.length === 0)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cola de Solicitudes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-4">
            Activa un evento para ver las solicitudes de canciones.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <UnifiedLoader variant="inline" />;
  }

  if (error) {
    return <p className="text-destructive text-center">Error al cargar las solicitudes.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cola de Solicitudes</CardTitle>
        <CardDescription>
          Aquí están las canciones que tu público ha solicitado para este evento.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {requests && requests.length > 0 ? (
          requests.map((request) => (
            <Card key={request.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    <Music className="w-5 h-5 mr-2" /> {request.song_title}
                  </h3>
                  <p className="text-muted-foreground">{request.artist_name}</p>
                  <div className="mt-2 text-sm">
                    <p className="flex items-center"><User className="w-4 h-4 mr-2" />{request.client_name}</p>
                    {request.client_email && <p className="flex items-center"><Mail className="w-4 h-4 mr-2" />{request.client_email}</p>}
                  </div>
                </div>
                <Badge variant={getPaymentStatusVariant(request.payment_status)}>
                  {request.payment_status}
                </Badge>
              </div>
              {request.message && <p className="mt-2 p-2 bg-muted rounded-md text-sm">"{request.message}"</p>}
              
              {isEventActive && (
                <div className="flex justify-end space-x-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => updateRequestStatus(request.id, 'rejected')}
                    disabled={updatingId === request.id}
                  >
                    <XCircle className="w-4 h-4 mr-1" /> Rechazar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => updateRequestStatus(request.id, 'played')}
                    disabled={updatingId === request.id}
                  >
                    <Check className="w-4 h-4 mr-1" /> Marcar como Sonada
                  </Button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-4">
            Aún no hay solicitudes para este evento.
          </p>
        )}
      </CardContent>
    </Card>
  );
};