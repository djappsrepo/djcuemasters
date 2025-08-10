import { Button } from "@/components/ui/button";
import { MusicWave } from "@/components/page-components/home/MusicWave";
import { BarChart3, Crown, Play } from "lucide-react";
import djHero from "@/assets/dj-hero.jpg";

interface User {
  id: string;
}

interface HeroSectionProps {
  user: User | null;
  onDashboardClick: () => void;
  onAuthClick: () => void;
  onViewPlansClick: () => void;
}

export const HeroSection = ({ user, onDashboardClick, onAuthClick, onViewPlansClick }: HeroSectionProps) => {
  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${djHero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
      
      <div className="relative container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <MusicWave />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
            Eleva la Experiencia Musical.
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Monetiza tu Talento.
            </span>
          </h1>
          
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Transforma la interacción con tu público. Recibe solicitudes de canciones, gestiona tu set en tiempo real y obtén ingresos extra en cada evento.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button variant="default" size="lg" className="bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-lg shadow-purple-500/50 transition-all duration-300 transform hover:scale-105" onClick={onDashboardClick}>
                Acceder a mi Panel
                <BarChart3 className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <>
                <Button variant="default" size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg shadow-pink-500/50 transition-all duration-300 transform hover:scale-105" onClick={onAuthClick}>
                  <Crown className="w-5 h-5 mr-2" />
                  Conviértete en Creador
                </Button>
                <Button variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400/10 hover:text-white font-bold transition-all duration-300" onClick={onViewPlansClick}>
                  <Play className="w-5 h-5 mr-2" />
                  Ver Demostración
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
