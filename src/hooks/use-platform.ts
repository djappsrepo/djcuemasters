import { Capacitor } from '@capacitor/core';

export const usePlatform = () => {
  const isNative = Capacitor.isNativePlatform();

  return { isNative };
};
