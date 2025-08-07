import { useContext, useEffect, Suspense } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';

import { Routes, Route } from "react-router-dom";
import { AuthContext } from '@/contexts/AuthContext';
import { MainLayout } from "@/components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import DiscoveryPage from "./pages/DiscoveryPage";
import NotFound from "./pages/NotFound";
import AdminRoute from "./router/AdminRoute";
import djHero from "./assets/dj-hero.jpg";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

// Lazy loaded components
import {
  Dashboard,
  AdminDashboard,
  RequestPage,
  BillingPage,
  FAQPage,
  TermsPage,
  PrivacyPage,
  PaymentSuccessPage,
  PageLoadingFallback
} from './router/LazyRoutes';

const App = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext?.loading) {
      SplashScreen.hide();
    }
  }, [authContext?.loading]);

  if (authContext?.loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className={`transition-opacity duration-700 opacity-100`}>
        <div 
          className="min-h-screen w-full text-white font-sans"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${djHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        >
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/terms" element={
                <Suspense fallback={<PageLoadingFallback />}>
                  <TermsPage />
                </Suspense>
              } />
              <Route path="/privacy" element={
                <Suspense fallback={<PageLoadingFallback />}>
                  <PrivacyPage />
                </Suspense>
              } />
              <Route path="/faq" element={
                <Suspense fallback={<PageLoadingFallback />}>
                  <FAQPage />
                </Suspense>
              } />
            </Route>

            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/dashboard" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="/discover" element={<DiscoveryPage />} />
            <Route path="/dashboard/billing" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <BillingPage />
              </Suspense>
            } />
            <Route path="/request/:djId" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <RequestPage />
              </Suspense>
            } />
            <Route path="/payment-success" element={
              <Suspense fallback={<PageLoadingFallback />}>
                <PaymentSuccessPage />
              </Suspense>
            } />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={
                <Suspense fallback={<PageLoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              } />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;