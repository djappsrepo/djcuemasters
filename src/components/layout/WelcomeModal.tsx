import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, PartyPopper, Headphones, Users, Rocket, ArrowRight, ArrowLeft } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: PartyPopper,
    title: '¡Bienvenido a CueMasters!',
    description: 'La plataforma definitiva para revolucionar tus sets. Recibe solicitudes de canciones y monetiza tus eventos como nunca antes.',
  },
  {
    icon: Headphones,
    title: '¿Eres DJ?',
    description: 'Regístrate, crea tu perfil y comparte tu enlace único. Recibe solicitudes con propinas, gestiona tu repertorio y analiza tus estadísticas.',
  },
  {
    icon: Users,
    title: '¿Eres parte del público?',
    description: 'Escanea el QR del evento o accede al enlace del DJ. Pide tus canciones favoritas, añade una propina para que suene antes y sé parte de la fiesta.',
  },
  {
    icon: Rocket,
    title: '¡Todo Listo!',
    description: 'Estás a un paso de vivir una nueva experiencia musical. Explora la plataforma y descubre todo lo que CueMasters tiene para ti.',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

    const handleNext = () => {
    setDirection(1);
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Acción final: ir a la sección de planes y cerrar modal
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
      onClose();
    }
  };

    const handleBack = () => {
    setDirection(-1);
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const CurrentIcon = steps[step].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="absolute top-3 right-3 rounded-full z-10" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>

            <div className="p-8 text-center h-80 flex flex-col justify-between">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="mx-auto mb-5 bg-purple-500/20 rounded-full h-16 w-16 flex items-center justify-center border-2 border-purple-500">
                    <CurrentIcon className="h-10 w-10 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{steps[step].title}</h2>
                  <p className="text-gray-300 text-sm">{steps[step].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full ${i === step ? 'w-6 bg-purple-600' : 'w-3 bg-gray-300'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <Button variant="outline" size="sm" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Atrás
                  </Button>
                )}
                <Button onClick={handleNext} size="sm" className="bg-purple-600 hover:bg-purple-700">
                  {step === steps.length - 1 ? 'Ver Planes' : 'Siguiente'}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
