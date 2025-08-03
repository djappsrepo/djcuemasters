import { Link } from 'react-router-dom';
import { usePaymentSuccess } from '@/hooks/usePaymentSuccess';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { CheckCircle, XCircle, Music, Home } from 'lucide-react';

const PaymentSuccessPage = () => {
  const { request, loading, error } = usePaymentSuccess();

  if (loading) {
    return (
            <div className="min-h-screen flex items-center justify-center p-4">
        <LoadingSpinner size={80} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
                <Card className="max-w-md w-full text-center bg-destructive/20 backdrop-blur-sm border-destructive">
          <CardHeader>
            <XCircle className="w-16 h-16 mx-auto text-destructive" />
            <CardTitle className="mt-4">Error al Cargar la Solicitud</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground">{error}</p>
            <Button asChild className="mt-6">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

    return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background/50">
            <Card className="max-w-md w-full text-center bg-card/70 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <CardTitle className="mt-4">¡Pago Exitoso!</CardTitle>
          <CardDescription>Tu solicitud ha sido enviada al DJ. ¡Gracias por tu apoyo!</CardDescription>
        </CardHeader>
        <CardContent>
          {request && (
            <div className="bg-muted/50 p-4 rounded-lg text-left space-y-2">
              <h4 className="font-semibold">Resumen de tu Solicitud:</h4>
              <div className="flex items-center">
                <Music className="w-4 h-4 mr-3 text-primary" />
                <span>
                  <strong>Canción:</strong> {request.song_title}
                </span>
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-3" /> 
                <span>
                  <strong>Artista:</strong> {request.artist_name}
                </span>
              </div>
            </div>
          )}
          <Button asChild className="mt-6">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
