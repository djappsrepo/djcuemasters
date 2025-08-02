import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    // Redirect them to the home page if they are not an admin
    return <Navigate to="/" replace />;
  }

  return <Outlet />; // Render the child route (AdminDashboard)
};

export default AdminRoute;
