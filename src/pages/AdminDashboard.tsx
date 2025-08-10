import { useEffect, useState, useCallback } from 'react';
import { ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from '@/integrations/supabase/client';

// Importa los nuevos componentes
import StatCards from '@/components/admin/StatCards';
import UserTable from '@/components/admin/UserTable';
import type { UserWithProfile } from '@/components/admin/UserTable'; // Importa el tipo

const AdminDashboard = () => {
  const { user: adminUser } = useAuth();
  const { toast } = useToast();

  const [stats, setStats] = useState({ totalUsers: 0, totalDjs: 0 });
  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // Solo muestra el spinner grande la primera vez
    if (users.length === 0) {
        setLoading(true);
    }
    try {
      // Ejecuta todas las consultas en paralelo para más eficiencia
      const [
        { count: userCount },
        { count: djCount },
        { data: profilesData, error: profilesError },
        { data: djProfilesData, error: djProfilesError }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('dj_profiles').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*'),
        supabase.from('dj_profiles').select('user_id, stage_name')
      ]);

      if (profilesError) throw profilesError;
      if (djProfilesError) throw djProfilesError;

      setStats({ totalUsers: userCount || 0, totalDjs: djCount || 0 });

      const djStageNames = new Map(djProfilesData.map(dj => [dj.user_id, dj.stage_name]));
      const combinedUsers = profilesData.map(profile => ({
        ...profile,
        dj_stage_name: djStageNames.get(profile.id)
      }));

      setUsers(combinedUsers);

    } catch (error: unknown) {
      console.error("Error fetching admin data:", error);
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido";
      toast({ title: "Error al cargar datos", description: errorMessage, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast, users.length]);

  const handleRoleChange = useCallback(async (targetUser: UserWithProfile, newRole: 'admin' | 'user') => {
    if (!targetUser.email) return;
    setActionLoading(targetUser.id);
    try {
      const { error } = await supabase.rpc('set_user_role', {
        user_email: targetUser.email,
        new_role: newRole
      });

      if (error) throw error;

      toast({ title: "Rol actualizado", description: `El usuario ${targetUser.full_name || targetUser.email} ahora es ${newRole}.` });
      fetchData(); // Refresca los datos para mostrar el cambio
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo completar la acción";
      toast({ title: "Error al cambiar el rol", description: errorMessage, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  }, [fetchData, toast]);

  const handleDeleteUser = useCallback(async (targetUser: UserWithProfile) => {
    setActionLoading(targetUser.id);
    try {
      const { error } = await supabase.functions.invoke('delete-user-by-admin', {
        body: { user_id_to_delete: targetUser.id },
      });

      if (error) throw error;

      toast({ title: "Usuario Eliminado", description: `La cuenta de ${targetUser.full_name || targetUser.email} ha sido eliminada.` });
      fetchData(); // Refresh data
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo completar la acción";
      toast({ title: "Error al eliminar usuario", description: errorMessage, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  }, [fetchData, toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center space-x-3 mb-6">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
      </div>

      <div className="space-y-8">
        <StatCards stats={stats} loading={loading} />
        <UserTable 
          users={users} 
          loading={loading}
          actionLoading={actionLoading}
          adminUserId={adminUser?.id}
          onRoleChange={handleRoleChange}
          onDeleteUser={handleDeleteUser}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;