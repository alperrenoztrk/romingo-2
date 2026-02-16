import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyDarkMode, getStoredPreferences } from "@/lib/preferences";
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

const queryClient = new QueryClient();

type SessionMode = "authenticated" | "logged_out" | "guest";

const SESSION_KEY = "romingo_session_mode";

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/lesson/");
  const [sessionMode, setSessionMode] = useState<SessionMode>("authenticated");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem(SESSION_KEY) as SessionMode | null;
    if (storedMode === "authenticated" || storedMode === "logged_out" || storedMode === "guest") {
      setSessionMode(storedMode);
    }

    const { darkMode } = getStoredPreferences();
    applyDarkMode(darkMode);

    const splashTimer = window.setTimeout(() => {
      setShowSplash(false);
    }, 2800);

    return () => {
      window.clearTimeout(splashTimer);
    };
  }, []);

  const handleLogout = () => {
    setSessionMode("logged_out");
    localStorage.setItem(SESSION_KEY, "logged_out");
  };

  const handleGuestLogin = () => {
    setSessionMode("guest");
    localStorage.setItem(SESSION_KEY, "guest");
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-200 to-rose-300 dark:from-slate-900 dark:via-fuchsia-950 dark:to-rose-950">
        <div className="text-center">
          <div className="text-8xl leading-none animate-bounce">🦩</div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-wide text-rose-700 dark:text-pink-300">Romingo</h1>
          <p className="mt-2 text-base font-medium text-rose-800/80 dark:text-pink-200/90">Flamingo ile öğrenme başlıyor...</p>
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
        <Route path="/translate" element={<TranslationPage />} />
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
