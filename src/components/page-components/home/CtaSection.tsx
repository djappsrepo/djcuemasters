import { Button } from "@/components/ui/button";
import { Crown, Play } from "lucide-react";

interface CtaSectionProps {
  onAuthClick: () => void;
}

export const CtaSection = ({ onAuthClick }: CtaSectionProps) => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            ¿Listo para Revolucionar tu Set?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Únete a miles de DJs que ya están monetizando sus eventos con CueFlow
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="shadow-glow" onClick={onAuthClick}>
              <Crown className="w-5 h-5 mr-2" />
              Empezar como DJ
            </Button>
            <Button variant="outline" size="xl">
              <Play className="w-5 h-5 mr-2" />
              Ver Demo en Vivo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
