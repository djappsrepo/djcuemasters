import { useAuth } from "@/hooks/useAuth";
import { useDJStats } from "@/hooks/useDJStats";

export const useDJStatsCards = () => {
  const { user, djProfile } = useAuth();
  const { stats, isLoading, error } = useDJStats(user?.id);

  return { 
    stats, 
    isLoading, 
    error, 
    djProfile 
  };
};
