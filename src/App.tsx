import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyDarkMode, getStoredPreferences } from "@/lib/preferences";
import { setActiveProfileScope } from "@/lib/profileScope";
import { supabase } from "@/integrations/supabase/client";
import BottomNav from "./components/BottomNav";
import WebsitePage from "./pages/WebsitePage";
import HomePage from "./pages/HomePage";
import LearnPage from "./pages/LearnPage";
import ShopPage from "./pages/ShopPage";
import LeaguePage from "./pages/LeaguePage";
import ProfilePage from "./pages/ProfilePage";
import LessonPage from "./pages/LessonPage";
import NotFound from "./pages/NotFound";
import TranslationPage from "./pages/TranslationPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import SecuritySettingsPage from "./pages/SecuritySettingsPage";
import DailyGoalsSettingsPage from "./pages/DailyGoalsSettingsPage";
import VideosPage from "./pages/VideosPage";
import KahootPage from "./pages/KahootPage";
import GrammarPage from "./pages/GrammarPage";
import BlogPage from "./pages/BlogPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import DeliveryReturnPolicyPage from "./pages/DeliveryReturnPolicyPage";
import TermsOfUsePage from "./pages/TermsOfUsePage";
import DistanceSalesContractPage from "./pages/DistanceSalesContractPage";

const queryClient = new QueryClient();

type SessionMode = "authenticated" | "logged_out";

const SESSION_KEY = "romingo_session_mode";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/app/lesson/");
  const isWebsite = !location.pathname.startsWith("/app");
  const [sessionMode, setSessionMode] = useState<SessionMode>("logged_out");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const { darkMode } = getStoredPreferences();
    applyDarkMode(darkMode);

    const syncSupabaseSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setSessionMode("authenticated");
        setActiveProfileScope(session.user.id);
        localStorage.setItem(SESSION_KEY, "authenticated");
        return;
      }

      setSessionMode("logged_out");
      setActiveProfileScope(null);
      localStorage.setItem(SESSION_KEY, "logged_out");
    };

    void syncSupabaseSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setSessionMode("authenticated");
        setActiveProfileScope(session.user.id);
        localStorage.setItem(SESSION_KEY, "authenticated");
        return;
      }

      setSessionMode("logged_out");
      setActiveProfileScope(null);
      localStorage.setItem(SESSION_KEY, "logged_out");
    });

    const splashTimer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => {
      window.clearTimeout(splashTimer);
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSessionMode("logged_out");
    setActiveProfileScope(null);
    localStorage.setItem(SESSION_KEY, "logged_out");
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="bg-white text-center">
          <img
            src="https://www.romingoakademi.com/static/images/logo.png"
            alt="Romingo logo"
            className="mx-auto w-60 max-w-[70vw]"
          />
        </div>
      </div>
    );
  }

  if (sessionMode === "logged_out" && location.pathname.startsWith("/app")) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<WebsitePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/gizlilik-politikasi" element={<PrivacyPolicyPage />} />
        <Route path="/teslimat-ve-iade-sartlari" element={<DeliveryReturnPolicyPage />} />
        <Route path="/kullanim-sartlari" element={<TermsOfUsePage />} />
        <Route path="/mesafeli-satis-sozlesmesi" element={<DistanceSalesContractPage />} />
        {sessionMode !== "logged_out" ? (
          <>
            <Route path="/app" element={<HomePage />} />
            <Route path="/app/learn" element={<LearnPage />} />
            <Route path="/app/shop" element={<ShopPage />} />
            <Route path="/app/league" element={<LeaguePage />} />
            <Route path="/app/profile" element={<ProfilePage onLogout={handleLogout} />} />
            <Route path="/app/settings" element={<SettingsPage />} />
            <Route path="/app/settings/profile" element={<ProfileSettingsPage />} />
            <Route path="/app/settings/security" element={<SecuritySettingsPage />} />
            <Route path="/app/settings/daily-goals" element={<DailyGoalsSettingsPage />} />
            <Route path="/app/translate" element={<TranslationPage />} />
            <Route path="/app/videos" element={<VideosPage />} />
            <Route path="/app/kahoot" element={<KahootPage />} />
            <Route path="/app/grammar" element={<GrammarPage />} />
            <Route path="/app/lesson/:id" element={<LessonPage />} />
          </>
        ) : (
          <Route path="/app/*" element={<LoginPage />} />
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNav && !isWebsite && <BottomNav />}
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
