import { useRegisterForm } from "@/hooks/auth/use-register-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { AuthError } from "@supabase/supabase-js";
import { Eye, EyeOff, User, Crown, CheckCircle2, XCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/ui/loading-spinner";

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
  const {
    formData,
    showPassword,
    setShowPassword,
    loading,
    passwordValidation,
    isPasswordValid,
    handleSignUp,
    handleInputChange,
    handleRoleChange,
    handleTermsChange,
  } = useRegisterForm();
  const navigate = useNavigate();

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
            <Input id="fullName" placeholder="Juan Pérez" value={formData.fullName} onChange={handleInputChange} required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input id="email" type="email" placeholder="tu@email.com" value={formData.email} onChange={handleInputChange} required disabled={loading} />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
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
              <Button type="button" variant={formData.selectedRole === 'cliente' ? 'default' : 'outline'} onClick={() => handleRoleChange('cliente')} className="flex flex-col h-auto py-4">
                <User className="mb-3 h-6 w-6" />
                Cliente
              </Button>
              <Button type="button" variant={formData.selectedRole === 'dj' ? 'default' : 'outline'} onClick={() => handleRoleChange('dj')} className="flex flex-col h-auto py-4">
                <Crown className="mb-3 h-6 w-6" />
                DJ
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="terms" checked={formData.agreedToTerms} onCheckedChange={(checked: boolean | 'indeterminate') => handleTermsChange(checked === true)} disabled={loading} />
            <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Acepto los <Link to="/terms" className="underline hover:text-primary">términos de servicio</Link> y la <Link to="/privacy" className="underline hover:text-primary">política de privacidad</Link>.
            </label>
          </div>

          <div className="space-y-3 pt-4">
             <Label>2. Completa tu registro</Label>
            <Button 
              onClick={() => handleSignUp('cliente')}
              className="w-full"
              disabled={loading || !formData.agreedToTerms || !isPasswordValid || formData.selectedRole !== 'cliente'}
            >
              {loading && formData.selectedRole === 'cliente' ? <LoadingSpinner size={24} /> : "Crear Cuenta de Cliente"}
            </Button>
            <Button 
              onClick={() => handleSignUp('dj')}
              className="w-full"
              variant="default"
              disabled={loading || !formData.agreedToTerms || !isPasswordValid || formData.selectedRole !== 'dj'}
            >
              {loading && formData.selectedRole === 'dj' ? <LoadingSpinner size={24} /> : "Crear Cuenta de DJ"}
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
