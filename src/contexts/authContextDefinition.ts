import { createContext } from 'react';
import type { AuthContextType } from '../types/auth';

/**
 * Defines the AuthContext for providing authentication state throughout the application.
 * This context is separated into its own file to comply with React Fast Refresh rules,
 * which require that files exporting contexts do not also export React components.
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
