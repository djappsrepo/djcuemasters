import { useState, useEffect } from 'react';
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { PricingSection } from "@/components/page-components/home/PricingSection";
import { WelcomeModal } from '@/components/layout/WelcomeModal';

const LandingPage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // const hasVisited = localStorage.getItem('hasVisitedCueMasters');
    // if (!hasVisited) {
    //   setIsModalOpen(true);
    // }
    // Forzar la visualización del modal para revisión:
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    localStorage.setItem('hasVisitedCueMasters', 'true');
    setIsModalOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    // Opcional: Redirigir a la página de inicio después de cerrar sesión
    navigate('/');
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
        user={user} 
        profile={profile} 
        onSignOut={handleSignOut} 
        onDashboardClick={handleDashboardClick} 
        onAuthClick={handleAuthClick} 
      />

      <HeroSection 
        user={profile} 
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

      <BenefitsSection />

      <PricingSection onSubscribeClick={handleSubscribeClick} />

      <Footer />
      <WelcomeModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default LandingPage;
