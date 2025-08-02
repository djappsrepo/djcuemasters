import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, MicVocal } from 'lucide-react';

interface StatCardsProps {
  stats: {
    totalUsers: number;
    totalDjs: number;
  };
  loading: boolean;
}

const StatCards: React.FC<StatCardsProps> = ({ stats, loading }) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Usuarios Totales</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{stats.totalUsers}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">DJs Registrados</CardTitle>
          <MicVocal className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <div className="text-2xl font-bold">{stats.totalDjs}</div>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Ingresos del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">$--.--</p>
          <p className="text-xs text-muted-foreground">Cargando datos...</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Eventos Activos</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">--</p>
          <p className="text-xs text-muted-foreground">Cargando datos...</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatCards;
