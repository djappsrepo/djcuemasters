import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header
        user={user}
        profile={profile}
        onSignOut={handleSignOut}
        onDashboardClick={handleDashboardClick}
        onAuthClick={handleAuthClick}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};