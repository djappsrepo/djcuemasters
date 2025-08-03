import { useDJRequestsQueue } from '@/hooks/dj/use-dj-requests-queue';
import { Tables } from '@/types';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { 
  RequestCard, 
  NoActiveEvent, 
  LoadingState, 
  ErrorState, 
  EmptyQueue 
} from './DJRequestsQueue.parts';

interface DJRequestsQueueProps {
  eventId: string | undefined;
  isEventActive: boolean;
}

export const DJRequestsQueue = ({ eventId, isEventActive }: DJRequestsQueueProps) => {
  const { 
    requests, 
    isLoading, 
    error, 
    updateRequestStatus, 
    updatingId, 
    getPaymentStatusVariant 
  } = useDJRequestsQueue(eventId);

  if (!isEventActive && (!requests || requests.length === 0)) {
    return <NoActiveEvent />;
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState />;
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
          requests.map((request: Tables<'music_requests'>, index: number) => (
            <RequestCard 
              key={request.id}
              request={request}
              isEventActive={isEventActive}
              updatingId={updatingId}
              getPaymentStatusVariant={getPaymentStatusVariant}
              onUpdateRequestStatus={updateRequestStatus}
            />
          ))
        ) : (
          <EmptyQueue />
        )}
      </CardContent>
    </Card>
  );
};