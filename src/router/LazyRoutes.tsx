import { lazy } from 'react';

// Lazy load de páginas principales
export const Dashboard = lazy(() => import('@/pages/Dashboard').then(module => ({ default: module.Dashboard })));
export const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
export const RequestPage = lazy(() => import('@/pages/RequestPage'));
export const BillingPage = lazy(() => import('@/pages/BillingPage'));
export const FAQPage = lazy(() => import('@/pages/FAQPage').then(module => ({ default: module.FAQPage })));
export const TermsPage = lazy(() => import('@/pages/TermsPage'));
export const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
export const PaymentSuccessPage = lazy(() => import('@/pages/PaymentSuccessPage'));

// Componente de loading para Suspense
export const PageLoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
  </div>
);
