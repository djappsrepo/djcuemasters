import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stats {
  todayRequests: number;
  todayEarnings: number;
  activeEvents: number;
  totalEarnings: number;
  totalRequests: number;
}

const DJStatsCards = () => {
  const { user, djProfile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    todayRequests: 0,
    todayEarnings: 0,
    activeEvents: 0,
    totalEarnings: djProfile?.total_earnings || 0,
    totalRequests: djProfile?.total_requests || 0
  });

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      try {
        // Solicitudes de hoy
        const { data: todayRequests } = await supabase
          .from('music_requests')
          .select('tip_amount')
          .eq('dj_id', user.id)
          .gte('created_at', today.toISOString());

        // Eventos activos
        const { data: activeEvents } = await supabase
          .from('dj_events')
          .select('id')
          .eq('dj_id', user.id)
          .eq('is_active', true);

        const todayEarnings = todayRequests?.reduce((sum, req) => sum + Number(req.tip_amount), 0) || 0;

        setStats({
          todayRequests: todayRequests?.length || 0,
          todayEarnings,
          activeEvents: activeEvents?.length || 0,
          totalEarnings: djProfile?.total_earnings || 0,
          totalRequests: djProfile?.total_requests || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, [user, djProfile]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Solicitudes Hoy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{stats.todayRequests}</div>
          <p className="text-xs text-muted-foreground">
            {stats.todayRequests === 0 ? 'Sin solicitudes aún' : 'Solicitudes recibidas'}
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
          <div className="text-2xl font-bold text-foreground">{stats.activeEvents}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activeEvents === 0 ? 'No hay eventos activos' : 'Eventos en curso'}
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
            ${stats.totalEarnings.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.totalRequests} solicitudes
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DJStatsCards;