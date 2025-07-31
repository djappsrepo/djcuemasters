import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, LogIn, Download, PartyPopper, MicVocal } from 'lucide-react';

const LandingPage = () => {
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans">
      {/* Hero Section */}
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
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
            <Link to="/auth">
              <LogIn className="mr-2 h-5 w-5" /> Empezar Ahora
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform">
            <a href={apkUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-5 w-5" /> Descargar APK
            </a>
          </Button>
        </motion.div>
      </motion.section>

      {/* How it Works Section */}
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

      {/* Footer */}
      <footer className="text-center py-8 border-t border-gray-800">
        <p className="text-gray-500">© {new Date().getFullYear()} CueMasters DJ. Todos los derechos reservados.</p>
        <div className="mt-2">
          <Link to="/terms" className="text-sm text-gray-400 hover:text-white mx-2">Términos de Servicio</Link>
          <span className="text-gray-600">|</span>
          <Link to="/privacy" className="text-sm text-gray-400 hover:text-white mx-2">Política de Privacidad</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
