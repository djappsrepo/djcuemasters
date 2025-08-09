import { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { AuthError } from '@supabase/supabase-js';

export const useRegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    selectedRole: null as 'dj' | 'cliente' | null,
    agreedToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

    useEffect(() => {
    const length = formData.password.length >= 8;
    const uppercase = /[A-Z]/.test(formData.password);
    const number = /[0-9]/.test(formData.password);
    const special = /[^A-Za-z0-9]/.test(formData.password);
    setPasswordValidation({ length, uppercase, number, special });
  }, [formData.password]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleRoleChange = (role: 'dj' | 'cliente') => {
    setFormData(prev => ({ ...prev, selectedRole: role }));
  };

  const handleTermsChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, agreedToTerms: checked }));
  };

  const handleSignUp = async (roleToRegister: 'dj' | 'cliente') => {
    if (!isPasswordValid || !formData.agreedToTerms || !formData.fullName || !formData.email) {
      toast({
        title: 'Formulario incompleto',
        description: 'Por favor, completa todos los campos y acepta los términos.',
        variant: 'destructive',
      });
      return;
    }
    setLoading(true);
    try {
            await signUp(formData.email, formData.password, formData.fullName, roleToRegister);
      toast({
        title: '¡Registro Exitoso!',
        description: 'Se ha enviado un correo para verificar tu cuenta.',
        variant: 'default',
      });
      navigate('/auth/login');
    } catch (error) {
      let errorMessage = 'No se pudo completar el registro. Inténtalo de nuevo.';
      if (error instanceof AuthError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: 'Error en el registro',
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
    passwordValidation,
    isPasswordValid,
    handleSignUp,
    handleInputChange,
    handleRoleChange,
    handleTermsChange,
  };
};
