import { Card, CardContent } from "@/components/ui/card";
import { Headphones, Star, DollarSign, BarChart3, Shield, Zap, Crown, Heart } from "lucide-react";

export const BenefitsSection = () => {
  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* DJ Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Headphones className="w-8 h-8 text-primary" />
              <h3 className="text-3xl font-bold text-foreground">Para el DJ</h3>
            </div>
            
            <div className="space-y-6">
              <Card className="border-primary/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    Ingresos Adicionales
                  </h4>
                  <p className="text-muted-foreground">Monetiza tu set con propinas por solicitudes, directamente a tu cuenta.</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Control Profesional
                  </h4>
                  <p className="text-muted-foreground">Panel de control avanzado para gestionar solicitudes, historial y estadísticas.</p>
                </CardContent>
              </Card>
              
              <Card className="border-primary/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    Herramienta Exclusiva
                  </h4>
                  <p className="text-muted-foreground">Acceso limitado solo a DJs registrados y verificados.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Client Benefits */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-8 h-8 text-accent" />
              <h3 className="text-3xl font-bold text-foreground">Para la Audiencia</h3>
            </div>
            
            <div className="space-y-6">
              <Card className="border-accent/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Interacción Simple
                  </h4>
                  <p className="text-muted-foreground">Solicita tu canción favorita en segundos desde tu móvil.</p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-accent" />
                    Prioridad VIP
                  </h4>
                  <p className="text-muted-foreground">Destaca tu solicitud con una propina y escúchala más rápido.</p>
                </CardContent>
              </Card>
              
              <Card className="border-accent/20 bg-background/50">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-accent" />
                    Conexión Directa
                  </h4>
                  <p className="text-muted-foreground">Conecta directamente con el DJ y forma parte del show.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
