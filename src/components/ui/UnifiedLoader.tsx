import { motion, Variants } from 'framer-motion';
import { Music } from 'lucide-react';
import animatedLogo from '@/assets/cuemastersdj_logo_eq_animated.svg';
import { cn } from '@/lib/utils';

export type LoaderVariant = 'page' | 'inline' | 'spinner' | 'logo';
export type LoaderSize = 'sm' | 'md' | 'lg';

interface UnifiedLoaderProps {
  variant?: LoaderVariant;
  size?: LoaderSize;
  text?: string;
  className?: string;
  color?: string;
}

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

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'linear',
      duration: 1,
    },
  },
};

const sizeConfig = {
  sm: { icon: 'w-6 h-6', text: 'text-sm', spinner: 24 },
  md: { icon: 'w-12 h-12', text: 'text-md', spinner: 40 },
  lg: { icon: 'w-24 h-24', text: 'text-lg', spinner: 60 },
};

export const UnifiedLoader = ({ 
  variant = 'inline', 
  size = 'md', 
  text = 'Cargando...', 
  className,
  color = 'text-primary'
}: UnifiedLoaderProps) => {
  const config = sizeConfig[size];

  // Page loader - full screen
  if (variant === 'page') {
    return (
      <div className={cn("min-h-screen bg-background flex items-center justify-center", className)}>
        <div className="text-center">
          <Music className={cn(config.icon, color, "mx-auto mb-4 animate-pulse")} />
          <p className={cn("text-muted-foreground", config.text)}>{text}</p>
        </div>
      </div>
    );
  }

  // Spinner loader - simple spinning circle
  if (variant === 'spinner') {
    return (
      <div className={cn("flex justify-center items-center", className)}>
        <motion.div
          style={{
            width: config.spinner,
            height: config.spinner,
            borderTop: `4px solid`,
            borderRight: `4px solid`,
            borderRadius: '50%',
          }}
          className={cn("border-transparent", color)}
          variants={spinnerVariants}
          animate="animate"
        />
      </div>
    );
  }

  // Logo loader - animated logo with text
  if (variant === 'logo') {
    return (
      <motion.div
        className={cn("flex flex-col items-center justify-center p-8", className)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={animatedLogo}
          alt="Cargando..."
          className={config.icon}
          variants={itemVariants}
        />
        <motion.p
          className={cn("mt-4 text-gray-300", config.text)}
          variants={itemVariants}
        >
          {text}
        </motion.p>
      </motion.div>
    );
  }

  // Inline loader - default, compact version
  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <Music className={cn(config.icon, color, "animate-pulse")} />
      <span className={cn("text-muted-foreground", config.text)}>{text}</span>
    </div>
  );
};

export default UnifiedLoader;
