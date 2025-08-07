import { useAuth } from "@/contexts/AuthContext";
import { useDJStats } from "@/hooks/dj/use-dj-stats";

export const useDJStatsCards = () => {
  const { user, djProfile } = useAuth();
  const djId = user?.id;

  // useDJStats ahora requiere un string, así que solo lo llamamos si djId existe.
  // El hook interno se desactiva si no hay djId, pero el tipado requiere que lo manejemos aquí.
  const { stats, isLoading, error } = useDJStats(djId ?? "");

  // Si no hay djId, devolvemos un estado de carga/vacío.
  if (!djId) {
    return {
      stats: {
        todayRequestsCount: 0,
        todayEarnings: 0,
        activeEventsCount: 0,
      },
      isLoading: true, // O false, dependiendo de la UI deseada
      error: null,
      djProfile,
    };
  }

  return { stats, isLoading, error, djProfile };
};
