import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const pricingPlans = [
  {
    name: 'Mensual',
    price: '99',
    period: 'MXN /mes',
    description: 'Ideal para empezar y probar la plataforma.',
    features: ['Panel de DJ Profesional', 'Solicitudes en tiempo real', 'Página de perfil público', 'Soporte estándar'],
    isPopular: false,
  },
  {
    name: 'Pro Anual',
    price: '799',
    period: 'MXN /año',
    description: 'El mejor valor para DJs comprometidos.',
    features: ['Todo lo del plan Mensual', 'Estadísticas avanzadas', 'Soporte prioritario 24/7', 'Perfil destacado', 'Ahorra un 40%'],
    isPopular: true,
  },
  {
    name: 'Trimestral',
    price: '249',
    period: 'MXN /trimestre',
    description: 'Un buen balance para uso regular.',
    features: ['Todo lo del plan Mensual', 'Estadísticas de eventos', 'Ahorra un 15%'],
    isPopular: false,
  },
];

interface PricingSectionProps {
  onSubscribeClick: (plan: string) => void;
}

export const PricingSection = ({ onSubscribeClick }: PricingSectionProps) => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tighter">
            Planes Transparentes para Creadores
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Sin costos ocultos. Elige el plan que potencie tu carrera y cancela en cualquier momento.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative bg-white/5 backdrop-blur-sm border rounded-2xl p-8 flex flex-col h-full shadow-lg transition-all duration-300',
                plan.isPopular ? 'border-purple-500 shadow-purple-500/20' : 'border-white/10'
              )}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    Más Popular
                  </span>
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-center mb-6 h-10">{plan.description}</p>
                <div className="text-center mb-8">
                  <span className="text-5xl font-extrabold text-white">${plan.price}</span>
                  <span className="text-gray-400">/{plan.period.split(' ')[2]}</span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                onClick={() => onSubscribeClick(plan.name)}
                className={cn(
                  'w-full mt-8 font-bold text-lg py-6',
                  plan.isPopular
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 transform hover:scale-105'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                )}
              >
                Suscribirse
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
