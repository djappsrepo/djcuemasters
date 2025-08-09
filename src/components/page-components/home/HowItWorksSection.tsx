import { Headphones, QrCode, BarChart3, Star, Zap, Crown, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            ¿Cómo Funciona <span className="text-primary">CueFlow</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Un flujo simple que revoluciona la interacción DJ-Audiencia
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* DJ Flow */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Headphones className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold text-foreground">Para el DJ</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Regístrate y Configura</h4>
                  <p className="text-muted-foreground">Crea tu perfil, configura tu monto mínimo de propina y personaliza tu panel.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Comparte tu Código QR</h4>
                  <p className="text-muted-foreground">Los asistentes escanean tu código para acceder a tu panel de solicitudes.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Gestiona y Monetiza</h4>
                  <p className="text-muted-foreground">Recibe solicitudes con propinas, organízalas y haz que la fiesta no pare.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Audience Flow */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-8 h-8 text-accent" />
              <h3 className="text-2xl font-bold text-foreground">Para la Audiencia</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Escanea el QR</h4>
                  <p className="text-muted-foreground">Usa tu móvil para escanear el código del DJ y acceder al portal.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Busca y Solicita</h4>
                  <p className="text-muted-foreground">Encuentra tu canción y envíala al DJ con una propina opcional.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">¡Disfruta la Música!</h4>
                  <p className="text-muted-foreground">Tu solicitud se prioriza según la propina. ¡Prepárate para bailar!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
