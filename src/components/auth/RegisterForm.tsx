import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthError } from "@supabase/supabase-js";
import { Eye, EyeOff, User, Crown, CheckCircle2, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface PasswordStrengthIndicatorProps {
  checks: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

const PasswordStrengthIndicator = ({ checks }: PasswordStrengthIndicatorProps) => (
  <ul className="space-y-1 mt-2">
    <li className={`flex items-center text-xs ${checks.length ? 'text-green-500' : 'text-muted-foreground'}`}>
      {checks.length ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2 text-red-500" />} Mínimo 8 caracteres
    </li>
    <li className={`flex items-center text-xs ${checks.uppercase ? 'text-green-500' : 'text-muted-foreground'}`}>
      {checks.uppercase ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2 text-red-500" />} Una letra mayúscula
    </li>
    <li className={`flex items-center text-xs ${checks.number ? 'text-green-500' : 'text-muted-foreground'}`}>
      {checks.number ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2 text-red-500" />} Un número
    </li>
    <li className={`flex items-center text-xs ${checks.special ? 'text-green-500' : 'text-muted-foreground'}`}>
      {checks.special ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <XCircle className="h-4 w-4 mr-2 text-red-500" />} Un carácter especial
    </li>
  </ul>
);

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'dj' | 'cliente' | null>(null);
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
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);
    setPasswordValidation({ length, uppercase, number, special });
  }, [password]);

  const isPasswordValid = Object.values(passwordValidation).every(Boolean);

  const handleSignUp = async (roleToRegister: 'dj' | 'cliente') => {
    if (!isPasswordValid || !agreedToTerms || !fullName || !email) {
      toast({
        title: "Formulario incompleto",
        description: "Por favor, completa todos los campos y acepta los términos.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password, fullName, roleToRegister);
      toast({
        title: "¡Registro Exitoso!",
        description: "Se ha enviado un correo para verificar tu cuenta.",
        variant: "default",
      });
      navigate('/auth/login');
    } catch (error) {
      let errorMessage = "No se pudo completar el registro. Inténtalo de nuevo.";
      if (error instanceof AuthError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error en el registro",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Cuenta</CardTitle>
        <CardDescription>Regístrate para empezar a usar CueMasters</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nombre Completo</Label>
            <Input id="signup-fullname" placeholder="Juan Pérez" value={fullName} onChange={(e) => setFullName(e.target.value)} required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input id="signup-email" type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
              <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)} disabled={loading}>
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} 
              </Button>
            </div>
            <PasswordStrengthIndicator checks={passwordValidation} />
          </div>

          <div className="space-y-3">
            <Label>1. Elige tu tipo de cuenta</Label>
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant={selectedRole === 'cliente' ? 'default' : 'outline'} onClick={() => setSelectedRole('cliente')} className="flex flex-col h-auto py-4">
                <User className="mb-3 h-6 w-6" />
                Cliente
              </Button>
              <Button type="button" variant={selectedRole === 'dj' ? 'default' : 'outline'} onClick={() => setSelectedRole('dj')} className="flex flex-col h-auto py-4">
                <Crown className="mb-3 h-6 w-6" />
                DJ
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked === true)} disabled={loading} />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Acepto los <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y la <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
            </label>
          </div>

          <div className="space-y-3 pt-4">
             <Label>2. Completa tu registro</Label>
            <Button 
              onClick={() => handleSignUp('cliente')}
              className="w-full"
              disabled={loading || !agreedToTerms || !isPasswordValid || selectedRole !== 'cliente'}
            >
              {loading && selectedRole === 'cliente' ? <LoadingSpinner size={24} /> : "Crear Cuenta de Cliente"}
            </Button>
            <Button 
              onClick={() => handleSignUp('dj')}
              className="w-full"
              variant="default"
              disabled={loading || !agreedToTerms || !isPasswordValid || selectedRole !== 'dj'}
            >
              {loading && selectedRole === 'dj' ? <LoadingSpinner size={24} /> : "Crear Cuenta de DJ"}
            </Button>
          </div>

          <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)} disabled={loading}>
            Regresar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
