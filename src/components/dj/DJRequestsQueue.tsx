import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useSupabaseQuery } from '@/hooks/use-supabase-query';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Check, XCircle, Music, User, Mail } from 'lucide-react';

interface DJRequestsQueueProps {
  eventId: string;
  isEventActive: boolean;
}

type MusicRequest = Tables<'music_requests'>;

// Helper para obtener el color del badge según el estado del pago
const getPaymentStatusVariant = (status: MusicRequest['payment_status']): 'success' | 'default' | 'destructive' | 'secondary' => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'default';
    case 'failed':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const DJRequestsQueue = ({ eventId, isEventActive }: DJRequestsQueueProps) => {
  const { toast } = useToast();
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Usamos el hook para obtener las solicitudes del evento actual
  const {
    data: requests,
    isLoading,
    error,
    refetch,
  } = useSupabaseQuery<MusicRequest[]>(['music_requests', eventId], 
    (supabase) =>
      supabase
        .from('music_requests')
        .select('*')
        .eq('event_id', eventId)
        .order('created_at', { ascending: true }),
    { enabled: !!eventId }
  );

  // Asumimos que tienes una columna 'status' en tu tabla 'requests'
  // para marcar si una canción fue 'played' o 'rejected'.
  const handleUpdateRequestStatus = async (
    requestId: string,
    newStatus: 'played' | 'rejected' | 'pending'
  ) => {
    setUpdatingId(requestId);
    const { error } = await supabase
      .from('music_requests')
      .update({ status: newStatus })
      .eq('id', requestId);

    if (error) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar la solicitud.',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Éxito',
        description: `La solicitud ha sido marcada como ${newStatus}.`,
      });
      refetch(); // Recargamos los datos para reflejar el cambio
    }
    setUpdatingId(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
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
                <Badge variant={getPaymentStatusVariant(request.payment_status) as 'secondary' | 'default' | 'destructive' | null | undefined}>
                  {request.payment_status}
                </Badge>
              </div>
              {request.message && <p className="mt-2 p-2 bg-muted rounded-md text-sm">"{request.message}"</p>}
              
              {isEventActive && (
                <div className="flex justify-end space-x-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateRequestStatus(request.id, 'rejected')}
                    disabled={updatingId === request.id}
                  >
                    <XCircle className="w-4 h-4 mr-1" /> Rechazar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleUpdateRequestStatus(request.id, 'played')}
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