import { DollarSign, BarChart3, Shield, Zap, Crown, Heart } from "lucide-react";

const features = [
  {
    icon: DollarSign,
    title: "Monetización Directa",
    description: "Genera ingresos adicionales en cada evento a través de propinas por solicitudes de canciones. Un flujo de ganancias transparente y directo.",
    color: "text-green-400",
  },
  {
    icon: BarChart3,
    title: "Control Total del Set",
    description: "Un panel de control intuitivo te permite ver, aceptar y organizar las solicitudes, dándote el poder de curar la experiencia musical perfecta.",
    color: "text-blue-400",
  },
  {
    icon: Zap,
    title: "Interacción Instantánea",
    description: "El público se conecta al instante escaneando un QR. Sin barreras, sin apps, solo una conexión directa y fluida con la cabina del DJ.",
    color: "text-yellow-400",
  },
  {
    icon: Crown,
    title: "Experiencia VIP",
    description: "Los asistentes pueden dar propinas para priorizar sus canciones, sintiéndose como VIPs y añadiendo una nueva capa de emoción al evento.",
    color: "text-purple-400",
  },
  {
    icon: Shield,
    title: "Plataforma Segura",
    description: "Tus datos y ganancias están protegidos. Nos centramos en la seguridad para que tú te centres en la música.",
    color: "text-red-400",
  },
  {
    icon: Heart,
    title: "Crea Momentos Únicos",
    description: "Más que una herramienta, es una forma de co-crear la banda sonora de la noche con tu público, generando momentos que todos recordarán.",
    color: "text-pink-400",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tighter">
            Diseñado para el DJ Moderno
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Hemos creado cada función pensando en potenciar tu creatividad, tu conexión con el público y tu carrera profesional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transform hover:-translate-y-2 transition-transform duration-300 shadow-lg"
            >
              <div className={`inline-block p-4 bg-gray-800 rounded-full mb-4 border border-white/10`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
