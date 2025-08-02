import { motion } from 'framer-motion';
import animatedLogo from '@/assets/cuemastersdj_logo_eq_animated.svg';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

interface GenericLoaderProps {
  text?: string;
}

export const GenericLoader = ({ text = 'Cargando...' }: GenericLoaderProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.img
        src={animatedLogo}
        alt="Cargando..."
        className="w-24 h-24"
        variants={itemVariants}
      />
      <motion.p
        className="mt-4 text-md text-gray-300"
        variants={itemVariants}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};
