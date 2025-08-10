import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const DashboardError = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error during sign out:', error);
      // Opcional: Mostrar un toast de error si el logout falla
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-4">
      <div className="text-center bg-red-900/20 border border-red-500 rounded-lg p-8 max-w-md">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Error al Cargar Perfil</h1>
        <p className="text-lg mb-6">No pudimos obtener los datos de tu perfil. Por favor, cierra la sesión e intenta de nuevo.</p>
        <Button onClick={handleLogout} variant="destructive" size="lg">
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default DashboardError;
