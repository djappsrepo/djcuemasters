import { QrCode, Music, ListMusic, PartyPopper } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: QrCode,
    title: "Comparte tu QR Único",
    description: "El DJ muestra un código QR en sus pantallas. El público lo escanea para acceder al portal de solicitudes, sin necesidad de apps.",
  },
  {
    icon: Music,
    title: "Solicita tus Canciones",
    description: "La audiencia busca en un catálogo musical y envía sus canciones favoritas directamente a la cabina del DJ, con la opción de añadir una propina.",
  },
  {
    icon: ListMusic,
    title: "Gestiona el Flujo",
    description: "El DJ ve una lista organizada de solicitudes, priorizadas por la energía del público y las propinas, manteniendo el control total del set.",
  },
  {
    icon: PartyPopper,
    title: "Una Fiesta Inolvidable",
    description: "La música conecta a todos. El DJ crea una experiencia única y la audiencia se siente parte del show, resultando en eventos memorables.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tighter">
            Una Nueva Forma de Conectar
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Nuestro proceso simplificado transforma la noche, permitiendo una interacción fluida y directa entre el DJ y su público.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card 
              key={index} 
              className="bg-gray-900/50 border-purple-500/20 rounded-xl shadow-lg hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-400">
                {step.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
