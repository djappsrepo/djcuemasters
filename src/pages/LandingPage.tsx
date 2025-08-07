import { useState, useEffect } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { PricingSection } from "@/components/page-components/home/PricingSection";
import { WelcomeModal } from '@/components/layout/WelcomeModal';

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Tables<'profiles'> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisitedCueMasters');
    if (!hasVisited) {
      setIsModalOpen(true);
    }

    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error.message);
        } else {
          setProfile(data);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleCloseModal = () => {
    localStorage.setItem('hasVisitedCueMasters', 'true');
    setIsModalOpen(false);
  };

  const handleSubscribeClick = (plan: string) => {
    console.log(`Plan seleccionado: ${plan}`);
    if (user) {
      navigate('/dashboard/billing');
    } else {
      navigate('/auth');
    }
  };

  return (
    <>
      <HeroSection
        user={profile}
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
