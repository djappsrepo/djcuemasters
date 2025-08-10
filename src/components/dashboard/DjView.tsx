
import { useState } from 'react';
import type { Tables } from '@/integrations/supabase/types';
import DJProfileSetup from '@/components/dj/DJProfileSetup';
import DJStatsCards from '@/components/dj/DJStatsCards';
import DJEventManager from '@/components/dj/DJEventManager';
import { DJRequestsQueue } from '@/components/dj/DJRequestsQueue';

// Define los tipos para los perfiles que se pasarán como props
type Profile = Tables<'profiles'>;
type DJProfile = Tables<'dj_profiles'>;

interface DjViewProps {
  profile: Profile;
  djProfile: DJProfile | null;
}

export const DjView = ({ profile, djProfile }: DjViewProps) => {
  const [activeEvent, setActiveEvent] = useState<Tables<"dj_events"> | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          ¡Bienvenido, {djProfile?.stage_name || profile.full_name}!
        </h2>
        <p className="text-muted-foreground">
          Gestiona tus eventos y solicitudes musicales desde aquí
        </p>
      </div>

      {/* La comprobación principal ya se hace en Dashboard.tsx, 
          pero esto puede manejar casos de edición de perfil si se implementa en el futuro */}
      {!djProfile && <DJProfileSetup />}

      {djProfile && (
        <>
          <DJStatsCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <DJEventManager onEventActivated={setActiveEvent} />
            <DJRequestsQueue eventId={activeEvent?.id} isEventActive={!!activeEvent} />
          </div>
        </>
      )}
    </div>
  );
};
