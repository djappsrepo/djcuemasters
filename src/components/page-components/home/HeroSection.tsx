import { Button } from "@/components/ui/button";
import { MusicWave } from "@/components/MusicWave";
import { BarChart3, Crown, Play } from "lucide-react";
import djHero from "@/assets/dj-hero.jpg";

interface User {
  id: string;
}

interface HeroSectionProps {
  user: User | null;
  onDashboardClick: () => void;
  onAuthClick: () => void;
}

export const HeroSection = ({ user, onDashboardClick, onAuthClick }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${djHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      <div className="relative container mx-auto px-4 py-24 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <MusicWave />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            La Plataforma de <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Solicitudes Musicales
            </span> <br />
            para DJs Profesionales
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Conecta con tu audiencia, monetiza cada canción solicitada y organiza tu set 
            con la plataforma más avanzada para DJs modernos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <Button variant="hero" size="xl" className="shadow-glow" onClick={onDashboardClick}>
                Ir a mi Dashboard
                <BarChart3 className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button variant="hero" size="xl" className="shadow-glow" onClick={onAuthClick}>
                  <Crown className="w-5 h-5 mr-2" />
                  Empezar como DJ
                </Button>
                <Button variant="outline" size="xl">
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demo en Vivo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
