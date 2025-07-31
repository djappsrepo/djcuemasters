import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { CtaSection } from "@/components/page-components/home/CtaSection";

const LandingPage = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

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
        user={user} 
        onDashboardClick={handleDashboardClick} 
        onAuthClick={handleAuthClick} 
      />

      <HowItWorksSection />

      <BenefitsSection />

      <CtaSection onAuthClick={handleAuthClick} />

      <Footer />
    </div>
  );
};

export default LandingPage;
