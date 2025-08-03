import { useDJStatsCards } from "@/hooks/dj/use-dj-stats-cards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCardSkeleton, ErrorDisplay } from "./DJStatsCards.parts";

const DJStatsCards = () => {
  const { stats, isLoading, error, djProfile } = useDJStatsCards();

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
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
          <div className="text-2xl font-bold text-foreground">{stats.todayRequestsCount}</div>
          <p className="text-xs text-muted-foreground">
            {stats.todayRequestsCount === 0 ? 'Sin solicitudes aún' : 'Solicitudes recibidas'}
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
            ${stats.todayEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.todayEarnings === 0 ? 'Sin propinas aún' : 'En propinas recibidas'}
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
          <div className="text-2xl font-bold text-foreground">{stats.activeEventsCount}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeEventsCount === 0 ? 'No hay eventos activos' : 'Eventos en curso'}
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