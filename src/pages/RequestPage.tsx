import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Music } from "lucide-react";
import { CheckoutForm } from "@/components/page-components/request/CheckoutForm";
import { DjProfileCard } from "@/components/page-components/request/DjProfileCard";
import { RequestForm } from "@/components/page-components/request/RequestForm";

// Definimos los tipos aquí para evitar importarlos de un archivo 'types' genérico
type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

const RequestPage = () => {
  const { djId } = useParams<{ djId: string }>();
  const { toast } = useToast();

  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [djEvents, setDjEvents] = useState<DJEvent[]>([]);
  const [loading, setLoading] = useState(true);
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

  const fetchDJData = useCallback(async () => {
    if (!djId) return;
    setLoading(true);
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('user_id', djId)
        .eq('active', true)
        .single();

      if (profileError) throw new Error("Perfil de DJ no encontrado o inactivo.");
      setDjProfile(profileData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', profileData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;
      
      const activeEvents = eventsData || [];
      setDjEvents(activeEvents);

      if (activeEvents.length > 0) {
        setFormData(prev => ({ ...prev, event_id: activeEvents[0].id }));
      }

      if (profileData) {
        setFormData(prev => ({ 
          ...prev, 
          tip_amount: profileData.minimum_tip.toString() 
        }));
      }
    } catch (error) {
        console.error("Error al cargar el perfil del DJ:", error);
        const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";
        toast({
          title: "No se pudo cargar la información del DJ",
          description: errorMessage,
          variant: "destructive",
        });
    } finally {
      setLoading(false);
    }
  }, [djId, toast]);

  useEffect(() => {
    fetchDJData();
  }, [fetchDJData]);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  if (!djProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">DJ no encontrado</h2>
          <p className="text-muted-foreground">El perfil de este DJ no está disponible o no existe.</p>
        </div>
      </div>
    );
  }

  const activeEvent = djEvents.find(event => event.id === formData.event_id) || (djEvents.length > 0 ? djEvents[0] : null);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DjProfileCard djProfile={djProfile} activeEvent={activeEvent} />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Music className="w-6 h-6 text-primary" />
                  <h2 className="text-xl">Haz tu Solicitud Musical</h2>
                </div>
                <p className="text-muted-foreground">
                  Completa el formulario para enviar tu canción y propina al DJ.
                </p>
              </CardHeader>
              <CardContent>
                {clientSecret && currentRequestId ? (
                  <CheckoutForm requestId={currentRequestId} clientSecret={clientSecret} />
                ) : (
                  <RequestForm 
                    djProfile={djProfile}
                    djEvents={djEvents}
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    isSubmitting={submitting}
                    agreedToTerms={agreedToTerms}
                    setAgreedToTerms={setAgreedToTerms}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;