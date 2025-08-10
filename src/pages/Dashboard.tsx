import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, LogOut, Settings, BarChart3, Users, DollarSign } from "lucide-react";

import { useAuth } from '@/hooks/auth/useAuth';
import { PageLoader } from '@/components/ui/PageLoader';
import { DashboardError } from './DashboardError';

import DJProfileSetup from '@/components/dj/DJProfileSetup';
import DJStatsCards from '@/components/dj/DJStatsCards';
import DJEventManager from '@/components/dj/DJEventManager';
import DJRequestsQueue from '@/components/dj/DJRequestsQueue';

export const Dashboard = () => {
  const { user, profile, djProfile, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Si no está cargando y no hay usuario, redirigir al login.
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Muestra el cargador global mientras se obtiene la sesión y el perfil.
  if (loading) {
    return <PageLoader message="Cargando tu espacio..." />;
  }

  // Si hay un usuario autenticado pero no se pudo cargar su perfil, muestra un error.
  if (user && !profile) {
    return <DashboardError />;
  }

  // Si no hay usuario o perfil después de cargar, no renderizar nada mientras se redirige.
  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">CueFlow Dashboard</h1>
              <p className="text-xs text-muted-foreground">
                {profile.role === 'dj' ? 'Panel de DJ' : 'Panel de Cliente'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden md:block">
              Hola, {profile.full_name || user.email}
            </span>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {profile.role === 'admin' && (
          <div className="mb-8">
            <Card className="border-primary/20 bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Panel de Administrador
                </CardTitle>
                <CardDescription>
                  Acceso completo al sistema - gestión global de la plataforma
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex-col">
                    <Users className="w-6 h-6 mb-2" />
                    <span>Gestionar DJs</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col">
                    <BarChart3 className="w-6 h-6 mb-2" />
                    <span>Analytics Global</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col">
                    <DollarSign className="w-6 h-6 mb-2" />
                    <span>Gestión Stripe</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {profile.role === 'dj' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ¡Bienvenido, {djProfile?.stage_name || profile.full_name}!
              </h2>
              <p className="text-muted-foreground">
                Gestiona tus eventos y solicitudes musicales desde aquí
              </p>
            </div>

            {!djProfile && <DJProfileSetup />}

            {djProfile && (
              <>
                <DJStatsCards />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <DJEventManager />
                  <DJRequestsQueue />
                </div>
              </>
            )}
          </div>
        )}

        {profile.role === 'cliente' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                ¡Hola, {profile.full_name}!
              </h2>
              <p className="text-muted-foreground">
                Encuentra DJs y solicita tus canciones favoritas
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descubrir DJs</CardTitle>
                  <CardDescription>
                    Encuentra DJs que están recibiendo solicitudes ahora mismo
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    variant="hero" 
                    className="w-full"
                    onClick={() => navigate('/discover')}
                  >
                    Explorar DJs Activos
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    Descubre DJs en eventos activos y envía solicitudes musicales
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Mis Solicitudes</CardTitle>
                  <CardDescription>
                    Historial de tus solicitudes musicales
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    No has hecho solicitudes aún
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;