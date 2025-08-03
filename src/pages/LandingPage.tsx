import { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/auth/use-auth";
import { useNavigate } from "react-router-dom";

import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { PricingSection } from "@/components/page-components/home/PricingSection";
import { WelcomeModal } from '@/components/layout/WelcomeModal';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCueMasters');
    if (!hasVisited) {
      setIsModalOpen(true);
    }
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem('hasVisitedCueMasters', 'true');
    setIsModalOpen(false);
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
    <>
      <HeroSection 
        user={user} 
        onDashboardClick={() => navigate('/dashboard')} 
        onAuthClick={() => navigate('/auth')} 
        onViewPlansClick={() => {
          const pricingSection = document.getElementById('pricing');
          if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      <HowItWorksSection />

      <BenefitsSection />

      <PricingSection onSubscribeClick={handleSubscribeClick} />

      <WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default LandingPage;
