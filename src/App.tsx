import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideNav = location.pathname.startsWith("/lesson/");

  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/league" element={<LeaguePage />} />
        <Route path="/profile" element={<ProfilePage />} />
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
