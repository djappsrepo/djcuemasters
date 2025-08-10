import type { Tables, Enums } from '@/integrations/supabase/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UnifiedLoader } from '@/components/ui/UnifiedLoader';
import { Check, XCircle, Music, User, Mail } from 'lucide-react';

type MusicRequest = Tables<'music_requests'>;
type PaymentStatus = Enums<'payment_status'>;

// --- State Display Components ---

export const NoActiveEvent = () => (
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

export const LoadingState = () => <UnifiedLoader variant="inline" />;

export const ErrorState = () => <p className="text-destructive text-center">Error al cargar las solicitudes.</p>;

export const EmptyQueue = () => (
  <p className="text-center text-muted-foreground py-4">
    Aún no hay solicitudes para este evento.
  </p>
);

// --- Main Request Card Component ---

interface RequestCardProps {
  request: MusicRequest;
  isEventActive: boolean;
  updatingId: string | null;
  getPaymentStatusVariant: (status: PaymentStatus) => 'default' | 'destructive' | 'secondary';
  onUpdateRequestStatus: (id: string, status: 'played' | 'rejected') => void;
}

export const RequestCard = ({ 
  request, 
  isEventActive, 
  updatingId,
  getPaymentStatusVariant,
  onUpdateRequestStatus
}: RequestCardProps) => (
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
    {request.message && <p className="mt-2 p-2 bg-muted rounded-md text-sm">\"{request.message}\"</p>}
    
    {isEventActive && (
      <div className="flex justify-end space-x-2 mt-3">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateRequestStatus(request.id, 'rejected')}
          disabled={updatingId === request.id}
        >
          <XCircle className="w-4 h-4 mr-1" /> Rechazar
        </Button>
        <Button
          size="sm"
          onClick={() => onUpdateRequestStatus(request.id, 'played')}
          disabled={updatingId === request.id}
        >
          <Check className="w-4 h-4 mr-1" /> Marcar como Sonada
        </Button>
      </div>
    )}
  </Card>
);
