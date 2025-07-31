import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MicVocal } from 'lucide-react';

export const HowItWorksSection = () => {
  return (
    <motion.section 
      className="py-20 px-4"
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-center text-4xl font-bold tracking-tight mb-12">¿Cómo Funciona?</h2>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* For DJs */}
        <motion.div whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}>
          <Card className="bg-gray-800/50 border-purple-500/30 shadow-xl h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <MicVocal className="h-10 w-10 text-purple-400" />
                <CardTitle className="text-3xl font-bold text-purple-300">Para DJs</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 text-lg space-y-3">
              <p><strong>1. Regístrate:</strong> Crea tu perfil de DJ en segundos.</p>
              <p><strong>2. Inicia un Evento:</strong> Define un nombre para tu sesión y compártela.</p>
              <p><strong>3. Recibe Solicitudes:</strong> Tus invitados escanean tu QR y te envían sus canciones favoritas en tiempo real.</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* For Guests */}
        <motion.div whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}>
          <Card className="bg-gray-800/50 border-green-500/30 shadow-xl h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Users className="h-10 w-10 text-green-400" />
                <CardTitle className="text-3xl font-bold text-green-300">Para Invitados</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 text-lg space-y-3">
              <p><strong>1. Escanea el QR:</strong> Usa tu móvil para escanear el código del DJ.</p>
              <p><strong>2. Pide tu Canción:</strong> Busca tu tema y envíalo con un solo clic.</p>
              <p><strong>3. ¡A Bailar!:</strong> Disfruta de la fiesta mientras el DJ mezcla tus canciones.</p>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.section>
  );
};
