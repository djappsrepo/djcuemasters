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
    title: 'Bienvenido a CueMasters',
    description: 'La plataforma definitiva para revolucionar tus sets, recibir solicitudes y monetizar tus eventos.',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    icon: Headphones,
    title: 'Para DJs Profesionales',
    description: 'Crea tu perfil, comparte tu enlace único y gestiona tu repertorio con estadísticas avanzadas.',
    gradient: 'from-blue-500 to-teal-400',
  },
  {
    icon: Users,
    title: 'Para la Audiencia',
    description: 'Escanea el QR del evento, pide tus canciones favoritas y añade propinas para destacar tu solicitud.',
    gradient: 'from-green-500 to-yellow-400',
  },
  {
    icon: Rocket,
    title: 'Lleva tu Evento al Futuro',
    description: 'Estás a un paso de una nueva experiencia musical. ¿Listo para empezar?',
    gradient: 'from-red-500 to-orange-500',
  },
];

export const WelcomeModal = ({ isOpen, onClose }: WelcomeModalProps) => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const CurrentIcon = steps[step].icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative bg-white/10 border border-white/20 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${steps[step].gradient}`} />
            
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/20 rounded-full z-10" onClick={onClose}>
              <X className="h-6 w-6" />
            </Button>

            <div className="p-10 text-center h-96 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className={`mb-6 bg-gradient-to-br ${steps[step].gradient} rounded-full h-20 w-20 flex items-center justify-center shadow-lg`}>
                    <CurrentIcon className="h-12 w-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-extrabold text-white mb-4 tracking-tight">{steps[step].title}</h2>
                  <p className="text-gray-300 text-base leading-relaxed">{steps[step].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="bg-black/20 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                {step > 0 && (
                  <Button variant="outline" size="lg" onClick={handleBack} className="bg-transparent border-white/30 text-white/80 hover:bg-white/10 hover:text-white">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                )}
                <Button onClick={handleNext} size="lg" className={`bg-white text-black font-bold shadow-lg hover:scale-105 transform transition-transform duration-300`}>
                  {step === steps.length - 1 ? 'Empezar' : 'Siguiente'}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
