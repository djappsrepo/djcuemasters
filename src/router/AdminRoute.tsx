import { useAuth } from '@/contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const AdminRoute = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12" />
      </div>
    );
  }

  if (!user || userRole !== 'admin') {
    // Redirect them to the home page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
