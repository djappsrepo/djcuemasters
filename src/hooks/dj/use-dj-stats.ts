import { useSupabaseQuery } from "@/hooks/data/use-supabase-query";
import type { SupabaseClient } from "@supabase/supabase-js";

const getTodayISO = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString();
};

export const useDJStats = (djId: string) => {
  type TodayRequest = { tip_amount: number | null };

  const { data: todayRequestsData, isLoading: isLoadingTodayRequests, error: todayRequestsError } = useSupabaseQuery(
    ['today_requests', djId],
    (supabase: SupabaseClient) =>
      supabase
        .from('music_requests')
        .select('tip_amount')
        .eq('dj_id', djId)
        .gte('created_at', getTodayISO()),
    { enabled: !!djId }
  );

  const { data: activeEventsData, isLoading: isLoadingActiveEvents, error: activeEventsError } = useSupabaseQuery(
    ['active_events', djId],
    (supabase: SupabaseClient) =>
      supabase
        .from('dj_events')
        .select('id')
        .eq('dj_id', djId)
        .eq('status', 'active'),
    { enabled: !!djId }
  );

  const isLoading = isLoadingTodayRequests || isLoadingActiveEvents;
  const error = todayRequestsError || activeEventsError;

  const stats = {
    todayRequestsCount: todayRequestsData?.length || 0,
    todayEarnings:
      todayRequestsData?.reduce(
        (sum: number, req: TodayRequest) => sum + (req.tip_amount || 0),
        0
      ) || 0,
    activeEventsCount: activeEventsData?.length || 0,
  };

  return { stats, isLoading, error };
};
