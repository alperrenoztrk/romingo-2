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

const queryClient = new QueryClient();

type SessionMode = "authenticated" | "logged_out" | "guest";

const SESSION_KEY = "romingo_session_mode";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/lesson/");
  const [sessionMode, setSessionMode] = useState<SessionMode>("logged_out");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem(SESSION_KEY) as SessionMode | null;
    const isGuestSession = storedMode === "guest";

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

      if (isGuestSession) {
        setSessionMode("guest");
        setActiveProfileScope("guest");
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

  const handleGuestLogin = () => {
    setSessionMode("guest");
    setActiveProfileScope("guest");
    localStorage.setItem(SESSION_KEY, "guest");
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

  if (sessionMode === "logged_out") {
    return <LoginPage onGuestLogin={handleGuestLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/league" element={<LeaguePage />} />
        <Route path="/profile" element={<ProfilePage isGuest={sessionMode === "guest"} onLogout={handleLogout} />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/profile" element={<ProfileSettingsPage />} />
        <Route path="/settings/security" element={<SecuritySettingsPage />} />
        <Route path="/settings/daily-goals" element={<DailyGoalsSettingsPage />} />
        <Route path="/translate" element={<TranslationPage />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/kahoot" element={<KahootPage />} />
        <Route path="/grammar" element={<GrammarPage />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNav && <BottomNav />}
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
