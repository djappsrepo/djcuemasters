import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from '@/types';

export interface DJWithEvents {
  id: string;
  user_id: string;
  stage_name: string;
  bio: string | null;
  avatar_url: string | null;
  minimum_tip: number;
  average_rating: number | null;
  total_requests: number;
  events: Array<{
    id: string;
    name: string;
    venue: string | null;
    event_date: string | null;
  }>;
}

export const useDJDiscovery = () => {
  const [activeDJs, setActiveDJs] = useState<DJWithEvents[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActiveDJs = async () => {
      try {
        const { data: djsData, error: djsError } = await supabase
          .from('dj_profiles')
          .select('id, user_id, stage_name, bio, minimum_tip, average_rating, total_requests')
          .eq('active', true);

        if (djsError) throw djsError;
        if (!djsData) return;

        const userIds = djsData.map(dj => dj.user_id);

        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('user_id, avatar_url')
          .in('user_id', userIds);

        if (profilesError) throw profilesError;

        const avatarMap = new Map(profilesData.map(p => [p.user_id, p.avatar_url]));

        const djsWithDetails = await Promise.all(
          djsData.map(async (dj) => {
            const { data: eventsData } = await supabase
              .from('dj_events')
              .select('id, name, venue, event_date')
              .eq('dj_id', dj.user_id)
              .eq('is_active', true)
              .order('created_at', { ascending: false });

            return {
              ...dj,
              avatar_url: avatarMap.get(dj.user_id) || null,
              events: eventsData || []
            };
          })
        );

        const djsWithActiveEvents = djsWithDetails.filter(dj => dj.events.length > 0);
        
        setActiveDJs(djsWithActiveEvents);
      } catch (error) {
        console.error('Error fetching active DJs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveDJs();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return `Hoy ${date.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })}`;
    }
    
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return { activeDJs, loading, formatDate };
};
