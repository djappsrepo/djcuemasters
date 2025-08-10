import { motion, Variants } from 'framer-motion';
const animatedLogo = '/cuemastersdj_logo_eq_animated.svg';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
};

const logoVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { type: 'spring', damping: 15, stiffness: 100 } },
};

export const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={animatedLogo}
        alt="Cargando..."
        className="w-40 h-40"
        variants={logoVariants}
      />
      <motion.p
        className="mt-4 text-lg text-gray-300"
        variants={itemVariants}
      >
        Cargando experiencia...
      </motion.p>
    </motion.div>
  );
};
