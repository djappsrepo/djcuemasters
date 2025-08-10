import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

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
          {/* Free Trial Card */}
          <motion.div 
            className="lg:col-span-1"
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <Card className="flex flex-col h-full bg-gradient-to-br from-purple-600 to-indigo-600 border-purple-500 shadow-purple-500/30 shadow-lg text-white">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-extrabold">Prueba Gratuita</CardTitle>
                <CardDescription className="text-purple-200 text-lg">3 Días de Acceso Total</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <p className="mb-6">
                  Explora todas las funcionalidades sin compromiso. Monetiza, gestiona y conecta con tu audiencia.
                </p>
                <ul className="space-y-3 text-left">
                  {['Acceso a todas las funciones', 'Sin necesidad de tarjeta de crédito', 'Cancelación en cualquier momento'].map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full font-bold text-lg bg-white text-purple-700 hover:bg-gray-200"
                  onClick={() => onSubscribeClick('Free Trial')}
                >
                  Comenzar Prueba
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Subscription Plans */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingPlans.map((plan) => (
            <motion.div key={plan.name} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
              <Card className={`flex flex-col h-full border-purple-500/50 bg-gray-800/60 shadow-lg transition-all duration-300 ${plan.isPopular ? 'shadow-purple-500/40' : 'shadow-purple-500/10'}`}>
                {plan.isPopular && (
                  <div className="bg-purple-600 text-center text-white text-sm font-bold py-1 rounded-t-lg">Más Popular</div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-purple-300">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-400">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-lg">{plan.period}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300">
                        <Check className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className={`w-full font-bold ${plan.isPopular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-600/50 hover:bg-purple-600/80'} text-white transition-colors`}
                    onClick={() => onSubscribeClick(plan.name)}
                  >
                    Suscribirse
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
                  </div>
        </div>
      </div>
    </motion.section>
  );
};
