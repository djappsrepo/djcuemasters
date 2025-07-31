import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Cargar la clave pública de Stripe desde las variables de entorno
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </QueryClientProvider>
  </React.StrictMode>,
);
