import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { ClientView } from '@/components/dashboard/ClientView';
import { DjView } from '@/components/dashboard/DjView';
import DJProfileSetup from '@/components/dj/DJProfileSetup';
import { Profile, DJProfile, User } from '@/types';

interface DashboardContentProps {
  user: User;
  profile: Profile;
  djProfile: DJProfile | null;
  signOut: () => void;
}

export const DashboardContent = ({ user, profile, djProfile, signOut }: DashboardContentProps) => {
  const navigate = useNavigate();

  if (profile.role === 'dj' && !djProfile) {
    return <DJProfileSetup />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header 
        user={user} 
        profile={profile} 
        onSignOut={signOut} 
        onDashboardClick={() => navigate('/dashboard')}
        onAuthClick={() => navigate('/auth')}
      />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {profile.role === 'dj' 
            ? <DjView profile={profile} djProfile={djProfile} /> 
            : <ClientView profile={profile} />
        }
      </main>
    </div>
  );
};
