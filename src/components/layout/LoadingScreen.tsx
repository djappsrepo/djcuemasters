import animatedLogo from '@/assets/cuemastersdj_logo_eq_animated.svg';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900">
      <img src={animatedLogo} alt="Cargando..." className="w-40 h-40" />
    </div>
  );
};
