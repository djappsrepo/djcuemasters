import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth.context';

// Hook personalizado para consumir el contexto de forma segura
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
