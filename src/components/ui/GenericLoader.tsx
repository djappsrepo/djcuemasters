import animatedLogo from '@/assets/cuemastersdj_logo_eq_animated.svg';

interface GenericLoaderProps {
  text?: string;
}

export const GenericLoader = ({ text = 'Cargando...' }: GenericLoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <img src={animatedLogo} alt="Cargando..." className="w-24 h-24" />
      <p className="mt-4 text-md text-gray-300 animate-pulse">{text}</p>
    </div>
  );
};
