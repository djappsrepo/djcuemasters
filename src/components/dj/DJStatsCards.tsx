import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";
import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="pb-2">
      <Skeleton className="h-4 w-2/3" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-7 w-1/3 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </CardContent>
  </Card>
);

const DJStatsCards = () => {
  const { user, djProfile } = useAuth();

  const getTodayISO = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.toISOString();
  };

    type TodayRequest = Pick<Tables<'music_requests'>, 'tip_amount'>;

  const { data: todayRequestsData, isLoading: isLoadingRequests, error: requestsError } = useSupabaseQuery<TodayRequest[]>(
    ['today_requests', user?.id],
    (supabase) =>
      supabase
        .from('music_requests')
        .select('tip_amount')
        .eq('dj_id', user!.id)
        .gte('created_at', getTodayISO()),
    { enabled: !!user }
  );

    type ActiveEvent = Pick<Tables<'dj_events'>, 'id'>;

  const { data: activeEventsData, isLoading: isLoadingEvents, error: eventsError } = useSupabaseQuery<ActiveEvent[]>(
    ['active_events', user?.id],
    (supabase) =>
      supabase
        .from('dj_events')
        .select('id')
        .eq('dj_id', user!.id)
        .eq('is_active', true),
    { enabled: !!user }
  );

  const isLoading = isLoadingRequests || isLoadingEvents;
  const error = requestsError || eventsError;

  const todayRequestsCount = todayRequestsData?.length || 0;
  const todayEarnings = todayRequestsData?.reduce((sum, req) => sum + (req.tip_amount || 0), 0) || 0;
  const activeEventsCount = activeEventsData?.length || 0;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="md:col-span-2 lg:col-span-4">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error al cargar estadísticas</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Solicitudes Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{todayRequestsCount}</div>
          <p className="text-xs text-muted-foreground">
            {todayRequestsCount === 0 ? 'Sin solicitudes aún' : 'Solicitudes recibidas'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Ingresos Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${todayEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {todayEarnings === 0 ? 'Sin propinas aún' : 'En propinas recibidas'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Eventos Activos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{activeEventsCount}</div>
          <p className="text-xs text-muted-foreground">
            {activeEventsCount === 0 ? 'No hay eventos activos' : 'Eventos en curso'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Histórico
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">
            ${(djProfile?.total_earnings || 0).toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {djProfile?.total_requests || 0} solicitudes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DJStatsCards;