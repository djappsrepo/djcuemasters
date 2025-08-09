import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { UserWithProfile } from '@/components/admin/UserTable';

export const useUserManagement = () => {
  const { toast } = useToast();

  const [users, setUsers] = useState<UserWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (users.length === 0) {
        setLoading(true);
    }
    try {
      const [
        { data: profilesData, error: profilesError },
        { data: djProfilesData, error: djProfilesError }
      ] = await Promise.all([
        supabase.from('profiles').select('*'),
        supabase.from('dj_profiles').select('user_id, stage_name')
      ]);

      if (profilesError) throw profilesError;
      if (djProfilesError) throw djProfilesError;

      const djStageNames = new Map((djProfilesData || []).map(dj => [dj.user_id, dj.stage_name]));
      const combinedUsers = (profilesData || []).map(profile => ({
        ...profile,
        dj_stage_name: djStageNames.get(profile.id)
      }));

      setUsers(combinedUsers);

    } catch (error: unknown) {
      console.error("Error fetching admin data:", error);
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido";
      toast({ title: "Error al cargar usuarios", description: errorMessage, variant: "destructive" });
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
      fetchUsers(); // Refresca los datos para mostrar el cambio
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo completar la acción";
      toast({ title: "Error al cambiar el rol", description: errorMessage, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  }, [fetchUsers, toast]);

  const handleDeleteUser = useCallback(async (targetUser: UserWithProfile) => {
    setActionLoading(targetUser.id);
    try {
      const { error } = await supabase.functions.invoke('delete-user-by-admin', {
        body: { user_id_to_delete: targetUser.id },
      });

      if (error) throw error;

      toast({ title: "Usuario Eliminado", description: `La cuenta de ${targetUser.full_name || targetUser.email} ha sido eliminada.` });
      fetchUsers(); // Refresh data
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "No se pudo completar la acción";
      toast({ title: "Error al eliminar usuario", description: errorMessage, variant: "destructive" });
    } finally {
      setActionLoading(null);
    }
  }, [fetchUsers, toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    actionLoading,
    handleRoleChange,
    handleDeleteUser,
  };
};