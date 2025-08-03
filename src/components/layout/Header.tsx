import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import animatedLogo from "@/assets/cuemastersdj_logo_eq_animated.svg";
import type { User } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";

interface HeaderProps {
  user: User | null;
  profile: Tables<'profiles'> | null;
  onSignOut: () => void;
  onDashboardClick: () => void;
  onAuthClick: () => void;
}

export const Header = ({ user, profile, onSignOut, onDashboardClick, onAuthClick }: HeaderProps) => {
  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={animatedLogo} alt="CueMasters Logo" className="w-12 h-12" />
          <div>
            <h1 className="text-xl font-bold text-foreground">CueMasters</h1>
            <p className="text-xs text-muted-foreground">DJ Request Platform</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden md:block">
                Hola, {profile?.full_name || user.email}
              </span>
              <Button variant="outline" size="sm" onClick={onDashboardClick}>
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={onSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Salir
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={onAuthClick}>
                Para DJs
              </Button>
              <Button variant="outline" size="sm" onClick={onAuthClick}>
                Iniciar Sesión
              </Button>
              <Button variant="hero" size="sm" onClick={onAuthClick}>
                Registro DJ
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
