import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Music, DollarSign, User, MapPin, Calendar, Loader2, Send } from "lucide-react";
import { useRequestForm } from "@/hooks/request/use-request-form";
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type DJProfile = Tables<'dj_profiles'>;
type DJEvent = Tables<'dj_events'>;

const RequestPage = () => {
  const { djId } = useParams<{ djId: string }>();
  const { toast } = useToast();
  const [djProfile, setDjProfile] = useState<DJProfile | null>(null);
  const [djEvents, setDjEvents] = useState<DJEvent[]>([]);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const fetchDJData = async () => {
      if (!djId) {
        setPageLoading(false);
        return;
      }
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('dj_profiles')
          .select('*')
          .eq('user_id', djId)
          .eq('active', true)
          .single();

        if (profileError) {
          if (profileError.code !== 'PGRST116') throw profileError;
        } else {
          setDjProfile(profileData);
          const { data: eventsData, error: eventsError } = await supabase
            .from('dj_events')
            .select('*')
            .eq('dj_id', profileData.id)
            .eq('is_active', true)
            .order('created_at', { ascending: false });

          if (eventsError) throw eventsError;
          setDjEvents(eventsData || []);
        }
      } catch (error) {
        toast({ title: "Error al cargar datos del DJ", description: (error as Error).message, variant: "destructive" });
      } finally {
        setPageLoading(false);
      }
    };

    fetchDJData();
  }, [djId, toast]);

  const { submitting, formData, handleInputChange, handleSubmit } = useRequestForm({ djProfile, djEvents });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

    if (pageLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando información del DJ...</p>
        </div>
      </div>
    );
  }

  if (!djProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">DJ no encontrado</h1>
          <p className="text-muted-foreground">Este DJ no está disponible o no existe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">CueFlow</h1>
              <p className="text-xs text-muted-foreground">Solicitudes Musicales</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información del DJ */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-gradient-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{djProfile.stage_name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        ⭐ {djProfile.average_rating?.toFixed(1) || '0.0'}
                      </Badge>
                      <Badge variant="outline">
                        {djProfile.total_requests} solicitudes
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              {djProfile.bio && (
                <CardContent>
                  <p className="text-muted-foreground">{djProfile.bio}</p>
                </CardContent>
              )}
            </Card>

            {/* Información de propinas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Información de Propinas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Propina mínima:</span>
                    <span className="font-semibold">${djProfile.minimum_tip.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Las propinas ayudan a que tu solicitud sea procesada más rápido
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Eventos activos */}
            {djEvents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    Eventos Activos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {djEvents.map((event: DJEvent) => (
                    <div key={event.id} className="border border-border rounded-lg p-3">
                      <h3 className="font-medium text-foreground">{event.name}</h3>
                      {event.venue && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="w-3 h-3" />
                          {event.venue}
                        </div>
                      )}
                      {event.event_date && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(event.event_date)}
                        </div>
                      )}
                      {event.description && (
                        <p className="text-sm text-muted-foreground mt-2">{event.description}</p>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Formulario de solicitud */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  Enviar Solicitud Musical
                </CardTitle>
                <CardDescription>
                  Completa el formulario para solicitar una canción
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="song_title">Título de la Canción *</Label>
                      <Input
                        id="song_title"
                        value={formData.song_title}
                        onChange={handleInputChange}
                        placeholder="Ej: Despacito"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="artist_name">Artista *</Label>
                      <Input
                        id="artist_name"
                        value={formData.artist_name}
                        onChange={handleInputChange}
                        placeholder="Ej: Luis Fonsi"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="client_name">Tu Nombre *</Label>
                      <Input
                        id="client_name"
                        value={formData.client_name}
                        onChange={handleInputChange}
                        placeholder="Ej: María García"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="client_email">Tu Email (opcional)</Label>
                      <Input
                        id="client_email"
                        type="email"
                        value={formData.client_email}
                        onChange={handleInputChange}
                        placeholder="maria@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tip_amount" className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Propina (USD) *
                    </Label>
                    <Input
                      id="tip_amount"
                      type="number"
                      step="0.01"
                      min={djProfile.minimum_tip}
                      value={formData.tip_amount}
                      onChange={handleInputChange}
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Mínimo: ${djProfile.minimum_tip.toFixed(2)}
                    </p>
                  </div>

                  {djEvents.length > 1 && (
                    <div className="space-y-2">
                      <Label htmlFor="event_id">Evento</Label>
                      <select
                        id="event_id"
                        value={formData.event_id}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                      >
                        {djEvents.map((event: DJEvent) => (
                          <option key={event.id} value={event.id}>
                            {event.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje (opcional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="¿Alguna dedicatoria o comentario especial?"
                      rows={3}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    variant="hero" 
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Enviando solicitud...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Enviar Solicitud (${parseFloat(formData.tip_amount || '0').toFixed(2)})
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPage;