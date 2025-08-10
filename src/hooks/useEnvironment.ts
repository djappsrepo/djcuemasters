import { useState, useEffect } from 'react';

/**
 * Hook para detectar el entorno de ejecución de la aplicación.
 * @returns {object} Un objeto que contiene un booleano `isWebView`.
 */
export const useEnvironment = () => {
  const [isWebView, setIsWebView] = useState(false);

  useEffect(() => {
    // Una forma común de detectar un WebView de Android es buscar 'wv' en el User-Agent.
    const userAgent = navigator.userAgent.toLowerCase();
    const runningInWebView = userAgent.includes('wv');
    setIsWebView(runningInWebView);
  }, []);

  return { isWebView };
};
