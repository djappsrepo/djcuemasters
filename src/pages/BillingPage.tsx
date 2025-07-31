import { motion } from 'framer-motion';
import { CreditCard, Loader } from 'lucide-react';

const BillingPage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Gestión de Suscripción</h1>
          <p className="text-lg text-gray-400">Finaliza tu pago de forma segura con Stripe.</p>
        </header>

        <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-purple-500/10 rounded-full border-2 border-purple-500/30 mb-6">
              <CreditCard className="w-12 h-12 text-purple-400" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">Integración con Stripe en Proceso</h2>
            <p className="text-gray-400 mb-6">
              Estamos trabajando para conectar nuestro sistema de pagos seguro. Muy pronto podrás activar tu suscripción desde aquí.
            </p>
            <div className="flex items-center gap-3 text-gray-500">
              <Loader className="animate-spin h-5 w-5" />
              <span>Redireccionando a Stripe... (Simulación)</span>
            </div>
          </div>
        </div>

        <footer className="text-center mt-8">
            <p className="text-sm text-gray-500">Serás redirigido a la plataforma de pagos segura de Stripe.</p>
        </footer>
      </motion.div>
    </div>
  );
};

export default BillingPage;
