import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/auth/useAuth';
import { LogOut } from 'lucide-react';

export const DashboardError = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center p-8 bg-card rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-destructive mb-4">Error al Cargar Perfil</h2>
        <p className="text-muted-foreground mb-6">
          No pudimos obtener los datos de tu perfil. Por favor, cierra la sesión e intenta de nuevo.
        </p>
        <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleSignOut}>
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};
