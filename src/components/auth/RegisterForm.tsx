import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, User, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<'dj' | 'cliente'>('cliente');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
            <Label>Nombre Completo</Label>
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
            <Label>Email</Label>
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
            <Label>Contraseña</Label>
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
            <RadioGroup defaultValue="cliente" className="grid grid-cols-2 gap-4">
              <div>
                <RadioGroupItem value="cliente" id="cliente" className="peer sr-only" />
                <Label
                  htmlFor="cliente"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <User className="mb-3 h-6 w-6" />
                  Cliente
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dj" id="dj" className="peer sr-only" />
                <Label
                  htmlFor="dj"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Crown className="mb-3 h-6 w-6" />
                  DJ
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox 
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              disabled={loading}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Acepto los <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y la <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
            </label>
          </div>
          <Button type="submit" className="w-full" variant="hero" disabled={loading || !agreedToTerms}>
            {loading ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </form>
        
      </CardContent>
    </Card>
  );
};
