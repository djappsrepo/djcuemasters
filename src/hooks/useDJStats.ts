import { useSupabaseQuery } from "@/hooks/use-supabase-query";
import type { Tables } from "@/integrations/supabase/types";

// Helper para obtener el inicio del día en formato ISO
const getTodayISO = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString();
};

type TodayRequest = Pick<Tables<'music_requests'>, 'tip_amount'>;
type ActiveEvent = Pick<Tables<'dj_events'>, 'id'>;

export const useDJStats = (userId: string | undefined) => {
  const { 
    data: todayRequestsData, 
    isLoading: isLoadingRequests, 
    error: requestsError 
  } = useSupabaseQuery<TodayRequest[]>(
    ['today_requests', userId],
    (supabase) =>
      supabase
        .from('music_requests')
        .select('tip_amount')
        .eq('dj_id', userId!)
        .gte('created_at', getTodayISO()),
    { enabled: !!userId }
  );

  const { 
    data: activeEventsData, 
    isLoading: isLoadingEvents, 
    error: eventsError 
  } = useSupabaseQuery<ActiveEvent[]>(
    ['active_events', userId],
    (supabase) =>
      supabase
        .from('dj_events')
        .select('id')
        .eq('dj_id', userId!)
        .eq('is_active', true),
    { enabled: !!userId }
  );

  const isLoading = isLoadingRequests || isLoadingEvents;
  const error = requestsError || eventsError;

  const stats = {
    todayRequestsCount: todayRequestsData?.length || 0,
    todayEarnings: todayRequestsData?.reduce((sum, req) => sum + (req.tip_amount || 0), 0) || 0,
    activeEventsCount: activeEventsData?.length || 0,
  };

  return { stats, isLoading, error };
};
