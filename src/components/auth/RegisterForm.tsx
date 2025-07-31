import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff, User, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<'dj' | 'cliente'>('cliente');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signUp(email, password, fullName, role);
    } catch (error) {
      console.error("Failed to sign up", error);
      // Aquí podrías mostrar un toast de error al usuario
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Cuenta</CardTitle>
        <CardDescription>Regístrate para empezar a usar CueFlow</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-fullname">Nombre Completo</Label>
            <Input
              id="signup-fullname"
              placeholder="Juan Pérez"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password">Contraseña</Label>
            <div className="relative">
              <Input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
          </div>
          <div className="space-y-3">
            <Label>Tipo de Cuenta</Label>
            <RadioGroup value={role} onValueChange={(value) => setRole(value as 'dj' | 'cliente')}>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <RadioGroupItem value="cliente" id="cliente" />
                <User className="w-4 h-4 text-accent" />
                <div className="flex-1">
                  <Label htmlFor="cliente" className="font-medium cursor-pointer">Cliente</Label>
                  <p className="text-xs text-muted-foreground">Para hacer solicitudes musicales a DJs</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:border-primary/30 transition-colors">
                <RadioGroupItem value="dj" id="dj" />
                <Crown className="w-4 h-4 text-primary" />
                <div className="flex-1">
                  <Label htmlFor="dj" className="font-medium cursor-pointer">DJ Profesional</Label>
                  <p className="text-xs text-muted-foreground">Para recibir solicitudes y monetizar eventos</p>
                </div>
              </div>
            </RadioGroup>
          </div>
          <Button type="submit" className="w-full" variant="hero" disabled={loading}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-xs text-muted-foreground">
            Al registrarte, aceptas nuestros <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
