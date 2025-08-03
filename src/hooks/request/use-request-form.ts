import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/ui/use-toast';
import type { Tables } from '@/types';

type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

interface UseRequestFormProps {
  djProfile: DJProfile | null;
  djEvents: DJEvent[];
}

export const useRequestForm = ({ djProfile, djEvents }: UseRequestFormProps) => {
  const { toast } = useToast();

  const [submitting, setSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [formData, setFormData] = useState({
    song_title: "",
    artist_name: "",
    client_name: "",
    client_email: "",
    tip_amount: "",
    message: "",
    event_id: ""
  });

  useEffect(() => {
    if (djProfile) {
      setFormData(prev => ({
        ...prev,
        tip_amount: djProfile.minimum_tip.toString()
      }));
    }
    if (djEvents.length > 0) {
      setFormData(prev => ({
        ...prev,
        event_id: djEvents[0].id
      }));
    }
  }, [djProfile, djEvents]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!djProfile || !formData.event_id) {
        toast({ title: "Error", description: "Por favor, selecciona un evento.", variant: "destructive" });
        return;
    }

    const tipAmount = parseFloat(formData.tip_amount);
    if (isNaN(tipAmount) || tipAmount < djProfile.minimum_tip) {
      toast({
        title: "Propina insuficiente",
        description: `La propina mínima es $${djProfile.minimum_tip.toFixed(2)}`,
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { data: requestData, error: requestError } = await supabase
        .from('music_requests')
        .insert({
          dj_id: djProfile.id,
          event_id: formData.event_id,
          song_title: formData.song_title,
          artist_name: formData.artist_name,
          client_name: formData.client_name,
          client_email: formData.client_email || null,
          tip_amount: tipAmount,
          message: formData.message || null,
          status: 'pending',
          payment_status: 'pending'
        })
        .select('id')
        .single();

      if (requestError) throw requestError;
      
      const newRequestId = requestData.id;
      setCurrentRequestId(newRequestId);

      const { data, error: functionError } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: Math.round(tipAmount * 100), requestId: newRequestId },
      });

      if (functionError) throw functionError;

      setClientSecret(data.clientSecret);

    } catch (error) {
        console.error("Error al crear la solicitud:", error);
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";
        toast({
          title: "No se pudo procesar la solicitud",
          description: errorMessage,
          variant: "destructive",
        });
    } finally {
      setSubmitting(false);
    }
  };

  return {
    formData,
    submitting,
    clientSecret,
    currentRequestId,
    agreedToTerms,
    setAgreedToTerms,
    handleSubmit,
    handleInputChange
  };
};
