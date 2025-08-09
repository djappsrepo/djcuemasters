import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  className?: string;
}

export const AnimatedLogo = ({ className }: AnimatedLogoProps) => {
  return (
    <motion.div
      className={cn('relative w-12 h-12', className)}
      animate={{ rotate: 360 }}
      transition={{ loop: Infinity, duration: 10, ease: 'linear' }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-purple-500/50"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ loop: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 shadow-lg"
      />
      <motion.div
        className="absolute inset-4 font-bold text-white flex items-center justify-center text-xl"
      >
        CM
      </motion.div>
    </motion.div>
  );
};
