import { motion, Variants } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner = ({ size = 50, color = 'text-blue-500' }: LoadingSpinnerProps) => {
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

  return (
    <div className="flex justify-center items-center">
      <motion.div
        style={{
          width: size,
          height: size,
          borderTop: `4px solid`,
          borderRight: `4px solid`,
          borderRadius: '50%',
        }}
        className={`border-transparent ${color}`}
        variants={spinnerVariants}
        animate="animate"
      />
    </div>
  );
};

export default LoadingSpinner;
