import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Music, DollarSign, User, MapPin, Calendar, Loader2, Send } from "lucide-react";
import { CheckoutForm } from "@/components/page-components/request/CheckoutForm";

interface DJProfile {
  id: string;
  user_id: string;
  stage_name: string;
  bio: string | null;
  minimum_tip: number;
  active: boolean;
  average_rating: number;
  total_requests: number;
}

interface DJEvent {
  id: string;
  name: string;
  description: string | null;
  venue: string | null;
  event_date: string | null;
  is_active: boolean;
}

const RequestPage = () => {
  const { djId } = useParams();
  const { toast } = useToast();
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [djEvents, setDjEvents] = useState<DJEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
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
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('dj_profiles')
        .select('*')
        .eq('user_id', djId)
        .eq('active', true)
        .single();

      if (profileError) throw profileError;
      setDjProfile(profileData);

      const { data: eventsData, error: eventsError } = await supabase
        .from('dj_events')
        .select('*')
        .eq('dj_id', profileData.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (eventsError) throw eventsError;
      setDjEvents(eventsData || []);

      if (eventsData && eventsData.length > 0) {
        setFormData(prev => ({ ...prev, event_id: eventsData[0].id }));
      }

      if (profileData) {
        setFormData(prev => ({ 
          ...prev, 
          tip_amount: profileData.minimum_tip.toString() 
        }));
      }
    } catch (error: unknown) {
        let errorMessage = "Ocurrió un error desconocido.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        toast({
            title: "Error al cargar información del DJ",
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
    if (!djProfile) return;

    const tipAmount = parseFloat(formData.tip_amount);
    if (tipAmount < djProfile.minimum_tip) {
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
          event_id: formData.event_id || null,
          song_title: formData.song_title,
          artist_name: formData.artist_name,
          client_name: formData.client_name,
          client_email: formData.client_email || null,
          tip_amount: tipAmount,
          message: formData.message || null,
          status: 'pending',
          payment_status: 'awaiting_payment'
        })
        .select()
        .single();

      if (requestError) throw requestError;
      setCurrentRequestId(requestData.id);

      const { data: paymentIntentData, error: paymentIntentError } = await supabase.functions.invoke('create-payment-intent', {
        body: { amount: tipAmount, requestId: requestData.id },
      });

      if (paymentIntentError) throw paymentIntentError;

      setClientSecret(paymentIntentData.clientSecret);
    } catch (error: unknown) {
        let errorMessage = "No se pudo iniciar el proceso de pago.";
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        toast({
            title: "Error al procesar la solicitud",
            description: errorMessage,
            variant: "destructive",
        });
        setSubmitting(false);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Fecha no disponible";
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Loader2 className="w-16 h-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!djProfile) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle>DJ no encontrado</CardTitle>
            <CardDescription>
              No se pudo encontrar un perfil activo para este DJ. Por favor, verifica el enlace.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/50 text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card className="overflow-hidden shadow-lg">
              <div className="h-48 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-center">
                <User className="w-24 h-24 text-primary-foreground" />
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">{djProfile.stage_name}</CardTitle>
                <Badge variant="outline" className="mt-2">DJ Verificado</Badge>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{djProfile.bio || "El DJ del pueblo."}</p>
              </CardContent>
            </Card>

            {djEvents.length > 0 && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Evento Actual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">{djEvents[0].name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{djEvents[0].venue || "Lugar no especificado"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(djEvents[0].event_date)}</span>
                  </div>
                  <p className="text-sm">
                    {djEvents[0].description || "¡Disfruta del evento!"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Music className="w-6 h-6 text-primary" />
                  {clientSecret ? "Completa tu Pago" : "Envía tu Solicitud Musical"}
                </CardTitle>
                <CardDescription>
                  {clientSecret ? "Estás a un paso de enviar tu solicitud. Completa el pago de forma segura a continuación." : "Completa el formulario para enviar tu canción. Las solicitudes con mayor propina tienen prioridad."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {clientSecret && currentRequestId ? (
                  <CheckoutForm requestId={currentRequestId} />
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="song_title">Título de la Canción *</Label>
                        <Input id="song_title" value={formData.song_title} onChange={(e) => setFormData({ ...formData, song_title: e.target.value })} placeholder="Ej: Despacito" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="artist_name">Artista *</Label>
                        <Input id="artist_name" value={formData.artist_name} onChange={(e) => setFormData({ ...formData, artist_name: e.target.value })} placeholder="Ej: Luis Fonsi" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client_name">Tu Nombre *</Label>
                        <Input id="client_name" value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} placeholder="Ej: María García" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="client_email">Tu Email (opcional)</Label>
                        <Input id="client_email" type="email" value={formData.client_email} onChange={(e) => setFormData({ ...formData, client_email: e.target.value })} placeholder="maria@email.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tip_amount" className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Propina (USD) *
                      </Label>
                      <Input id="tip_amount" type="number" step="0.01" min={djProfile.minimum_tip} value={formData.tip_amount} onChange={(e) => setFormData({ ...formData, tip_amount: e.target.value })} required />
                      <p className="text-xs text-muted-foreground">
                        Mínimo: ${djProfile.minimum_tip.toFixed(2)}
                      </p>
                    </div>

                    {djEvents.length > 1 && (
                      <div className="space-y-2">
                        <Label htmlFor="event_id">Evento</Label>
                        <select id="event_id" value={formData.event_id} onChange={(e) => setFormData({ ...formData, event_id: e.target.value })} className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                          {djEvents.map((event) => (
                            <option key={event.id} value={event.id}>
                              {event.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje (opcional)</Label>
                      <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="¿Alguna dedicatoria o comentario especial?" rows={3} />
                    </div>

                    <Button type="submit" variant="hero" className="w-full" disabled={submitting}>
                      {submitting ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Iniciando pago...</>
                      ) : (
                        <><Send className="w-4 h-4 mr-2" /> Continuar al Pago (${parseFloat(formData.tip_amount || '0').toFixed(2)})</>
                      )}
                    </Button>
                  </form>
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