import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gift, Rocket, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const BetaIncentiveSection = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/auth/register');
  };

  return (
    <section id="beta-incentive" className="py-12 md:py-20 bg-gradient-to-b from-purple-900/10 to-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="bg-card/80 backdrop-blur-sm border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <Rocket className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-3xl md:text-4xl font-bold">¡Únete a Nuestra Fase Beta y Gana!</CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground mt-2">
              Tu apoyo en esta etapa inicial es crucial. ¡A cambio, te ofrecemos recompensas exclusivas!
            </CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Apoya el Proyecto, Obtén Beneficios</h3>
              <p className="text-muted-foreground">
                Desde ahora y hasta el final de nuestra fase beta, todos los usuarios que se registren y realicen un donativo recibirán una membresía premium. El nivel de la membresía dependerá del monto de tu donación.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-3" />
                  <span>Acceso anticipado a nuevas funciones.</span>
                </li>
                <li className="flex items-center">
                  <Gift className="h-5 w-5 text-green-400 mr-3" />
                  <span>Membresías exclusivas post-lanzamiento.</span>
                </li>
                <li className="flex items-center">
                  <Rocket className="h-5 w-5 text-purple-400 mr-3" />
                  <span>Conviértete en un pilar de la comunidad CueMasters.</span>
                </li>
              </ul>
            </div>
            <div className="text-center bg-primary/10 p-6 rounded-lg">
              <h4 className="text-xl font-bold mb-4">¿Listo para empezar?</h4>
              <p className="text-muted-foreground mb-6">Regístrate hoy, explora la plataforma y realiza tu donativo para asegurar tus recompensas.</p>
              <Button onClick={handleRegisterClick} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg animate-pulse">
                Registrarme y Donar Ahora
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
