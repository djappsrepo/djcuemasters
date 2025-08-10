import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { LogIn, Download, PartyPopper, BarChart3 } from 'lucide-react';

// La interfaz de User se importará desde AuthContext o un archivo de tipos global si es necesario.
// Por ahora, la definimos localmente para mantener la compatibilidad.
interface User {
  id: string;
}

interface HeroSectionProps {
  user: User | null;
  onDashboardClick: () => void;
  onAuthClick: () => void;
  onViewPlansClick: () => void;
}

export const HeroSection = ({ user, onDashboardClick, onAuthClick, onViewPlansClick }: HeroSectionProps) => {
  const apkUrl = 'https://github.com/djappsrepo/djcuemasters/releases/download/v1.0.0/app-release.apk';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      className="text-center py-20 px-4 sm:py-32 flex flex-col items-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="p-2 bg-blue-500/20 rounded-full mb-6">
          <PartyPopper className="h-12 w-12 text-blue-400" />
      </motion.div>
      <motion.h1 
        variants={itemVariants} 
        className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
      >
        CueMasters DJ
      </motion.h1>
      <motion.p variants={itemVariants} className="mt-6 text-lg sm:text-xl max-w-2xl text-gray-300">
        La forma más fácil para que los DJs reciban solicitudes de canciones y para que los invitados las pidan. Anima tu evento, una canción a la vez.
      </motion.p>
      <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row gap-4">
        {user ? (
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform" onClick={onDashboardClick}>
                <BarChart3 className="mr-2 h-5 w-5" /> Ir al Dashboard
            </Button>
        ) : (
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform" onClick={onViewPlansClick}>
                <LogIn className="mr-2 h-5 w-5" /> Ver Planes
            </Button>
        )}
        <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
          <a href={apkUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-5 w-5" /> Descargar la APK
          </a>
        </Button>
      </motion.div>
    </motion.section>
  );
};
