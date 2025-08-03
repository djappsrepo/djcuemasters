import { motion } from 'framer-motion';
import { FreeTrialCard, SubscriptionPlanCard } from './PricingSection.parts';

const pricingPlans = [
  {
    name: 'Mensual',
    price: '$99',
    period: 'MXN /mes',
    features: ['Panel de DJ Profesional', 'Solicitudes en tiempo real', 'Página de perfil público', 'Soporte estándar'],
    isPopular: false,
  },
  {
    name: 'Trimestral',
    price: '$249',
    period: 'MXN /trimestre',
    features: ['Todo lo del plan Mensual', 'Estadísticas de eventos', 'Ahorra un 15%'],
    isPopular: false,
  },
  {
    name: 'Semestral',
    price: '$449',
    period: 'MXN /semestre',
    features: ['Todo lo del plan Trimestral', 'Soporte prioritario 24/7', 'Ahorra un 25%'],
    isPopular: false,
  },
  {
    name: 'Anual',
    price: '$799',
    period: 'MXN /año',
    features: ['Todo lo del plan Semestral', 'Perfil destacado', 'Ahorra un 40%'],
    isPopular: true,
  },
];

interface PricingSectionProps {
  onSubscribeClick: (plan: string) => void;
}

export const PricingSection = ({ onSubscribeClick }: PricingSectionProps) => {
  return (
    <motion.section 
      className="py-20 px-4 bg-gray-900/50"
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Planes Flexibles para DJs</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a tu ritmo y lleva tus eventos al siguiente nivel.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          <motion.div 
            className="lg:col-span-1"
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <FreeTrialCard onSubscribeClick={onSubscribeClick} />
          </motion.div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {pricingPlans.map((plan) => (
              <motion.div key={plan.name} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
                <SubscriptionPlanCard plan={plan} onSubscribeClick={onSubscribeClick} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
