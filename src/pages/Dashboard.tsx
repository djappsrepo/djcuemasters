import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Music, LogOut, Settings } from "lucide-react";
import DJProfileSetup from "@/components/dj/DJProfileSetup";
import { AdminView } from '@/components/dashboard/AdminView';
import { DjView } from '@/components/dashboard/DjView';
import { ClientView } from '@/components/dashboard/ClientView';
import heroImage from '@/assets/dj-hero.jpg';

const Dashboard = () => {
  const { user, profile, djProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const renderDashboardContent = () => {
    if (!profile) return null; // Should not happen if checks below are correct

    switch (profile.role) {
      case 'admin':
        return <AdminView />;
      case 'dj':
        // The DJProfileSetup check is already handled, so we can pass the profiles directly
        return <DjView profile={profile} djProfile={djProfile} />;
      case 'cliente':
        return <ClientView profile={profile} />;
      default:
        return (
          <div className="text-center text-muted-foreground">
            <p>Rol de usuario no reconocido.</p>
            <p>Por favor, contacta a soporte.</p>
          </div>
        );
    }
  };

  // 1. Handle Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // 2. Handle Authentication Fallback (after loading)
  if (!user || !profile) {
    // This is a fallback; the useEffect should have already redirected.
    return null;
  }

  // 3. Handle DJ Profile Setup (after loading and auth check)
  if (profile.role === 'dj' && !djProfile) {
    return <DJProfileSetup />;
  }

  // 4. Render the main dashboard content
  return (
    <div 
      className="min-h-screen bg-background bg-cover bg-center relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10">
        <header className="border-b border-border bg-card/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Music className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">CueMasters Dashboard</h1>
                <p className="text-xs text-muted-foreground">
                  {profile.role === 'dj' ? 'Panel de DJ' : (profile.role === 'admin' ? 'Panel de Admin' : 'Panel de Cliente')}
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
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {renderDashboardContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;