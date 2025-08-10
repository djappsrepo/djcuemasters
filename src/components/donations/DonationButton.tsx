import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DonationButtonProps {
  djId: string;
  djName: string;
}

export const DonationButton = ({ djId, djName }: DonationButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    setIsLoading(true);
    toast.info(`Preparando donación para ${djName}...`);

    try {
      const { data, error } = await supabase.functions.invoke('create-stripe-checkout', {
        body: { djId },
      });

      if (error) {
        throw new Error(`Error al invocar la función: ${error.message}`);
      }

      if (data.error) {
        throw new Error(`Error desde la función: ${data.error}`);
      }

      const { checkoutUrl } = data;
      if (!checkoutUrl) {
        throw new Error('No se recibió la URL de checkout.');
      }

      // Redirigir al usuario a la página de pago de Stripe
      window.location.href = checkoutUrl;

    } catch (error) {
      console.error('Error en el proceso de donación:', error);
      toast.error(error instanceof Error ? error.message : 'Ocurrió un error desconocido.');
      setIsLoading(false);
    }
    // No ponemos setIsLoading(false) aquí porque la página redirigirá
  };

  return (
    <Button onClick={handleDonate} disabled={isLoading}>
      {isLoading ? 'Procesando...' : `Apoyar a ${djName}`}
    </Button>
  );
};
