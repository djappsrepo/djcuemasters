import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/ui/use-toast';
import { Tables } from '@/integrations/supabase/types';

type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

interface UseRequestFormProps {
  djProfile: DJProfile | null;
  djEvents: DJEvent[];
}

export const useRequestForm = ({ djProfile, djEvents }: UseRequestFormProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [formData, setFormData] = useState({
    song_title: '',
    artist_name: '',
    client_name: '',
    client_email: '',
    tip_amount: '',
    message: '',
    event_id: '',
  });

  useEffect(() => {
    if (djProfile) {
      setFormData(prev => ({ ...prev, tip_amount: djProfile.minimum_tip.toString() }));
    }
    if (djEvents.length > 0) {
      setFormData(prev => ({ ...prev, event_id: djEvents[0].id }));
    }
  }, [djProfile, djEvents]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!djProfile) {
      toast({ title: 'Error', description: 'Perfil de DJ no disponible.', variant: 'destructive' });
      return;
    }
    if (!agreedToTerms) {
        toast({ title: 'Términos y Condiciones', description: 'Debes aceptar los términos para continuar.', variant: 'destructive' });
        return;
    }

    setSubmitting(true);
    try {
      const tipInCents = Math.round(parseFloat(formData.tip_amount) * 100);
      const { data, error } = await supabase.functions.invoke('create-payment-intent-and-request', {
        body: {
          djId: djProfile.id,
          amount: tipInCents,
          currency: 'mxn',
          requestData: {
            ...formData,
            tip_amount: parseFloat(formData.tip_amount),
            dj_id: djProfile.id,
          },
        },
      });

      if (error) throw error;

      setClientSecret(data.clientSecret);
      setCurrentRequestId(data.requestId);
      toast({ title: '¡Éxito!', description: 'Tu solicitud está siendo procesada. Completa el pago.' });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error desconocido.';
      toast({ title: 'Error al procesar la solicitud', description: errorMessage, variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    loading,
    submitting,
    formData,
    clientSecret,
    currentRequestId,
    agreedToTerms,
    setAgreedToTerms,
    handleInputChange,
    handleSubmit,
  };
};
