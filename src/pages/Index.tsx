import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureCard } from "@/components/FeatureCard";
import { MusicWave } from "@/components/MusicWave";
import { PricingCard } from "@/components/PricingCard";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/page-components/home/HeroSection";
import { HowItWorksSection } from "@/components/page-components/home/HowItWorksSection";
import { BenefitsSection } from "@/components/page-components/home/BenefitsSection";
import { CtaSection } from "@/components/page-components/home/CtaSection";
import { 
  Music, 
  Users, 
  DollarSign, 
  Zap, 
  Shield, 
  BarChart3,
  Play,
  Heart,
  QrCode,
  Headphones,
  Crown,
  Star,
  LogOut
} from "lucide-react";
import djHero from "@/assets/dj-hero.jpg";
import djIcon from "@/assets/dj-icon.jpg";

const Index = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  const handleViewPlansClick = () => {
    navigate('/billing');
  };
  return (
    <div className="min-h-screen bg-background">
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
        onViewPlansClick={handleViewPlansClick}
      />

      <HowItWorksSection />

      <BenefitsSection />

      <CtaSection onAuthClick={handleAuthClick} />

      <Footer />
    </div>
  );
};

export default Index;
