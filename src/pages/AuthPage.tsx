import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import heroImage from '@/assets/dj-hero.jpg';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative z-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">CueFlow</h1>
            </div>
            <p className="text-muted-foreground">
              La plataforma de solicitudes musicales para DJs
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="signup">Registrarse</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <LoginForm />
            </TabsContent>
            
            <TabsContent value="signup">
              <RegisterForm />
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-6">
            <p className="text-xs text-muted-foreground">
              Al registrarte, aceptas nuestros <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;