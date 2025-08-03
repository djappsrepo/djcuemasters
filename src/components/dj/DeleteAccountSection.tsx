import { useDeleteAccount } from "@/hooks/auth/use-delete-account";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Trash2, ShieldAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CardContent } from "@/components/ui/card";

export const DeleteAccountSection = () => {
  const {
    isDeleting,
    deleteConfirmation,
    setDeleteConfirmation,
    handleDeleteAccount,
  } = useDeleteAccount();

  return (
    <CardContent className="border-t pt-6">
      <div className="space-y-4 p-4 border-destructive/50 border-l-4 rounded-md bg-destructive/5">
        <div className="flex items-start space-x-3">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            <div className="flex-1 space-y-1">
                <h3 className="font-semibold text-destructive">Zona de Peligro</h3>
                <p className="text-sm text-destructive/80">
                    La eliminación de tu cuenta es una acción irreversible. Se borrarán todos tus datos, incluyendo eventos y perfil.
                </p>
            </div>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full sm:w-auto">
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar mi cuenta
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás absolutamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Se eliminará permanentemente tu cuenta y todos los datos asociados.
                Para confirmar, escribe <strong>ELIMINAR</strong> en el campo de abajo.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-2">
                <Label htmlFor="delete-confirm" className="sr-only">Confirmación</Label>
                <Input 
                    id="delete-confirm"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Escribe ELIMINAR para confirmar"
                />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={isDeleting || deleteConfirmation !== 'ELIMINAR'}
                className="bg-destructive hover:bg-destructive/90"
              >
                {isDeleting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Eliminando...</> : 'Sí, eliminar mi cuenta'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </CardContent>
  );
};
