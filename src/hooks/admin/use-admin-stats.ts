import { useState, useCallback, useEffect } from 'react';
import { useToast } from "@/hooks/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';

export const useAdminStats = () => {
  const { toast } = useToast();

  const [stats, setStats] = useState({ totalUsers: 0, totalDjs: 0 });
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const [
        { count: userCount, error: userError },
        { count: djCount, error: djError },
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('dj_profiles').select('*', { count: 'exact', head: true }),
      ]);

      if (userError) throw userError;
      if (djError) throw djError;

      setStats({ totalUsers: userCount || 0, totalDjs: djCount || 0 });

    } catch (error: unknown) {
      console.error("Error fetching admin stats:", error);
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido";
      toast({ title: "Error al cargar estadísticas", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
  };
};
