import loadingGif from '@/assets/cuemastersdj_logo_eq.gif';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-900">
      <img src={loadingGif} alt="Cargando..." className="w-40 h-40" />
      <p className="mt-4 text-lg text-gray-300 animate-pulse">Cargando experiencia...</p>
    </div>
  );
};
