import { useState, ChangeEvent } from 'react';
import { useAuth } from '@/hooks/auth/use-auth';
import { useToast } from '@/hooks/ui/use-toast';

export const useLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { toast } = useToast();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      // El éxito se maneja por el redirect del AuthProvider
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      toast({
        title: 'Error al iniciar sesión',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

    return {
    formData,
    showPassword,
    setShowPassword,
    loading,
    handleSignIn,
    handleInputChange
  };
};
