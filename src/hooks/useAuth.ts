import { useContext } from 'react';
import { AuthContext } from '../contexts/authContextDefinition';
import { AuthContextType } from '../types/auth';

/**
 * Custom hook to use the AuthContext.
 * Ensures the context is used within an AuthProvider.
 * @returns The authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
