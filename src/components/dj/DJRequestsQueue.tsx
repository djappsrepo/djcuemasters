import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Music, DollarSign, User, Clock, Check, X, Play } from "lucide-react";

interface MusicRequest {
  id: string;
  song_title: string;
  artist_name: string;
  client_name: string;
  client_email: string | null;
  tip_amount: number;
  message: string | null;
  status: string;
  payment_status: string;
  created_at: string;
  played_at: string | null;
}

const DJRequestsQueue = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [requests, setRequests] = useState<MusicRequest[]>([]);
  const [loading, setLoading] = useState(true);

    const fetchRequests = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('music_requests')
        .select('*')
        .eq('dj_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setRequests(data || []);
    } catch (error: unknown) {
      toast({
        title: "Error al cargar solicitudes",
                description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchRequests();

    // Configurar realtime para actualizaciones en vivo
    const channel = supabase
      .channel('music_requests_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'music_requests',
          filter: `dj_id=eq.${user?.id}`
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchRequests]);

    const updateRequestStatus = async (requestId: string, status: 'playing' | 'played' | 'rejected') => {
    try {
                  const updateData: { status: 'playing' | 'played' | 'rejected', played_at?: string } = { status };
      if (status === 'played') {
        updateData.played_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('music_requests')
        .update(updateData)
        .eq('id', requestId);

      if (error) throw error;

      const statusMessages = {
        accepted: "Solicitud aceptada",
        played: "Canción marcada como reproducida",
        rejected: "Solicitud rechazada"
      };

      toast({
        title: statusMessages[status as keyof typeof statusMessages],
        description: "El estado de la solicitud ha sido actualizado.",
      });

      fetchRequests();
        } catch (error: unknown) {
      toast({
        title: "Error al actualizar solicitud",
                description: error instanceof Error ? error.message : "Ocurrió un error inesperado",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'default';
            case 'playing': return 'secondary';
      case 'played': return 'outline';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
            case 'playing': return 'En curso';
      case 'played': return 'Reproducida';
      case 'rejected': return 'Rechazada';
      default: return status;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
    const playingRequests = requests.filter(req => req.status === 'playing');
  const playedRequests = requests.filter(req => req.status === 'played');

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">Cargando solicitudes...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="w-5 h-5 text-primary" />
          Cola de Solicitudes
        </CardTitle>
        <CardDescription>
          Gestiona las solicitudes musicales en tiempo real
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Solicitudes Pendientes */}
        {pendingRequests.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Pendientes ({pendingRequests.length})
            </h3>
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">
                            {request.song_title} - {request.artist_name}
                          </h4>
                          <Badge variant={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {request.client_name}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${request.tip_amount.toFixed(2)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTime(request.created_at)}
                          </div>
                        </div>
                        
                        {request.message && (
                          <p className="text-sm text-muted-foreground italic">
                            "{request.message}"
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                                                    onClick={() => updateRequestStatus(request.id, 'playing')}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRequestStatus(request.id, 'rejected')}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Solicitudes Aceptadas */}
                {playingRequests.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Check className="w-4 h-4" />
                            En curso ({playingRequests.length})
            </h3>
            <div className="space-y-3">
                            {playingRequests.map((request) => (
                <Card key={request.id} className="border-muted">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">
                            {request.song_title} - {request.artist_name}
                          </h4>
                          <Badge variant={getStatusColor(request.status)}>
                            {getStatusText(request.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{request.client_name}</span>
                          <span>${request.tip_amount.toFixed(2)}</span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateRequestStatus(request.id, 'played')}
                      >
                        <Play className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Solicitudes Reproducidas (últimas 5) */}
        {playedRequests.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground mb-3">
              Últimas Reproducidas
            </h3>
            <div className="space-y-2">
              {playedRequests.slice(-5).reverse().map((request) => (
                <Card key={request.id} className="border-muted/50">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">
                          {request.song_title} - {request.artist_name}
                        </span>
                        <div className="text-xs text-muted-foreground">
                          {request.client_name} • ${request.tip_amount.toFixed(2)}
                        </div>
                      </div>
                      <Badge variant="outline">Reproducida</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {requests.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No hay solicitudes en este momento</p>
            <p className="text-sm">Las solicitudes aparecerán aquí en tiempo real</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DJRequestsQueue;