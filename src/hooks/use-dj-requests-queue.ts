import { useDJRequests } from '@/hooks/useDJRequests';
import type { Enums } from '@/integrations/supabase/types';

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

export const useDJRequestsQueue = (eventId: string | undefined) => {
  const { requests, isLoading, error, updateRequestStatus, updatingId } = useDJRequests(eventId);

  return {
    requests,
    isLoading,
    error,
    updateRequestStatus,
    updatingId,
    getPaymentStatusVariant
  };
};
