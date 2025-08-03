import { useContext, useEffect } from 'react';
import { SplashScreen } from '@capacitor/splash-screen';

import { Routes, Route } from "react-router-dom";
import { AuthContext } from '@/contexts/auth.context';
import { MainLayout } from "@/components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import { Dashboard } from "./pages/Dashboard";
import DiscoveryPage from "./pages/DiscoveryPage";
import RequestPage from "./pages/RequestPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import BillingPage from './pages/BillingPage';
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./router/AdminRoute";
import djHero from "./assets/dj-hero.jpg";
import { LoadingScreen } from "@/components/layout/LoadingScreen";

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
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
            </Route>

            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discover" element={<DiscoveryPage />} />
            <Route path="/dashboard/billing" element={<BillingPage />} />
            <Route path="/request/:djId" element={<RequestPage />} />
            <Route path="/payment-success" element={<PaymentSuccessPage />} />

            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
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