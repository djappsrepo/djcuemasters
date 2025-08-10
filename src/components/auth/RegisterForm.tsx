import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
import { UnifiedLoader } from "@/components/ui/UnifiedLoader";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<'dj' | 'client'>('client');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Error de Validación",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName, role === 'client' ? 'user' : role);

      if (error) {
        toast({
          title: "Error en el registro",
          description: error.message || "No se pudo completar el registro. Inténtalo de nuevo.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "¡Registro Exitoso!",
          description: "Se ha enviado un correo para verificar tu cuenta. Por favor, revisa tu bandeja de entrada.",
          variant: "default",
        });
        navigate('/auth/login');
      }
    } catch (err) {
      const error = err as Error;
      toast({
        title: "Error Inesperado",
        description: error.message || "Ocurrió un error inesperado. Por favor, contacta a soporte.",
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
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name and Email Inputs remain the same */}
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

          <div className="space-y-2">
            <Label>Confirmar Contraseña</Label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {/* Role selection remains the same */}
          <div className="space-y-3">
            <Label>Tipo de Cuenta</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as 'dj' | 'client')} className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="client" id="client" className="peer sr-only" />
                <Label htmlFor="client" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  <User className="mb-3 h-6 w-6" />
                  Cliente
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dj" id="dj" className="peer sr-only" />
                <Label htmlFor="dj" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                  <Crown className="mb-3 h-6 w-6" />
                  DJ
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" checked={agreedToTerms} onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)} disabled={loading} />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Acepto los <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y la <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
            </label>
          </div>
          <Button type="submit" className="w-full" variant="hero" disabled={loading || !agreedToTerms || !isPasswordValid}>
            {loading ? <UnifiedLoader variant="spinner" size="sm" /> : "Crear Cuenta"}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => navigate(-1)} disabled={loading}>
            Regresar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
