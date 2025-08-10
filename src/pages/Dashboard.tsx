import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UnifiedLoader } from '@/components/ui/UnifiedLoader';
import DashboardError from './DashboardError';
import { DashboardContent } from './DashboardContent';

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
    return <UnifiedLoader variant="page" text="Cargando tu espacio..." />;
  }

  // Si hay un usuario autenticado pero no se pudo cargar su perfil, muestra un error.
  if (user && !profile) {
    return <DashboardError />;
  }

  // Si no hay usuario o perfil después de cargar, no renderizar nada mientras se redirige.
  if (!user || !profile) {
    return null;
  }

  // Si todo está correcto, renderiza el contenido principal del dashboard.
  return <DashboardContent profile={profile} djProfile={djProfile} />;
};