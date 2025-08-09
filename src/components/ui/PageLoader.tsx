import { Music } from 'lucide-react';

interface PageLoaderProps {
  message?: string;
}

export const PageLoader = ({ message = 'Cargando...' }: PageLoaderProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Music className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};
