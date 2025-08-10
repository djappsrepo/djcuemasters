import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ClientView } from '@/components/dashboard/ClientView';
import { User } from '@supabase/supabase-js';
import { DjView } from '@/components/dashboard/DjView';
import AdminDashboard from './AdminDashboard';
import DJProfileSetup from '@/components/dj/DJProfileSetup';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];
type DJProfile = Database['public']['Tables']['dj_profiles']['Row'];

interface DashboardContentProps {
  profile: Profile;
  djProfile: DJProfile | null;
}

export const DashboardContent = ({ profile, djProfile }: DashboardContentProps) => {
  const navigate = useNavigate();

  if (profile.role === 'dj' && !djProfile) {
    return <DJProfileSetup />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        onDashboardClick={() => navigate('/dashboard')}
        onAuthClick={() => navigate('/auth')}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profile.role === 'admin' 
            ? <AdminDashboard /> 
            : profile.role === 'dj' 
                ? <DjView profile={profile} djProfile={djProfile} /> 
                : <ClientView profile={profile} />
        }
      </main>
    </div>
  );
};
