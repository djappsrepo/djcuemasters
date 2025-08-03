import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/ui/use-toast";

export const useDeleteAccount = () => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== 'ELIMINAR') {
      toast({ title: "Confirmación incorrecta", description: "Debes escribir 'ELIMINAR' para confirmar.", variant: "destructive" });
      return;
    }

    setIsDeleting(true);
    try {
      const { error } = await supabase.functions.invoke('delete-user-account', {
        method: 'POST',
      });

      if (error) throw error;

      toast({ title: "Cuenta eliminada", description: "Tu cuenta ha sido eliminada permanentemente. Serás redirigido." });
      setTimeout(() => window.location.href = '/', 2000);

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Ocurrió un error desconocido.";
      toast({ title: "Error al eliminar la cuenta", description: errorMessage, variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    deleteConfirmation,
    setDeleteConfirmation,
    handleDeleteAccount,
  };
};
