import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

// --- Tipos ---
type Plan = {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
};

interface SubscriptionPlanCardProps {
  plan: Plan;
  onSubscribeClick: (plan: string) => void;
}

interface FreeTrialCardProps {
  onSubscribeClick: (plan: string) => void;
}

// --- Componentes de Tarjeta ---

export const FreeTrialCard = ({ onSubscribeClick }: FreeTrialCardProps) => (
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
);

export const SubscriptionPlanCard = ({ plan, onSubscribeClick }: SubscriptionPlanCardProps) => (
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
);
