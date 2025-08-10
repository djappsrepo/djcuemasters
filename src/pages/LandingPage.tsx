import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { RankingBanner } from '@/components/page-components/home/RankingBanner';
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { BetaIncentiveSection } from '@/components/page-components/home/BetaIncentiveSection';
import { PricingSection } from "@/components/page-components/home/PricingSection";
import { WelcomeModal } from '@/components/layout/WelcomeModal';

const LandingPage = () => {
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCueMasters');
    // Forzar la aparición del modal en desarrollo para facilitar las pruebas
    if (import.meta.env.DEV || !hasVisited) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem('hasVisitedCueMasters', 'true');
    setIsModalOpen(false);
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleSubscribeClick = (plan: string) => {
    console.log(`Plan seleccionado: ${plan}`);
    if (user) {
      // TODO: Redirigir a la página de pago de Stripe con el plan seleccionado
      navigate('/dashboard/billing'); 
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="w-full">
      <Header 
        onDashboardClick={handleDashboardClick}
        onAuthClick={handleAuthClick}
      />

      <HeroSection 
        user={user} 
        onDashboardClick={handleDashboardClick} 
        onAuthClick={handleAuthClick} 
        onViewPlansClick={() => {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <HowItWorksSection />

      <BetaIncentiveSection />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <RankingBanner />
      </div>

      <BenefitsSection />

      {/* <PricingSection onSubscribeClick={handleSubscribeClick} /> */}

      <Footer />
      <WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default LandingPage;
