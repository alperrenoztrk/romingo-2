import { lovable } from "@/integrations/lovable/index";
import { LogIn } from "lucide-react";
import { useState } from "react";

type LoginPageProps = {
  onGuestLogin: () => void;
};

export default function LoginPage({ onGuestLogin }: LoginPageProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);

  const handleAppleLogin = async () => {
    setIsAppleLoading(true);
    const { error } = await lovable.auth.signInWithOAuth("apple", {
      redirect_uri: window.location.origin,
    });
    if (error) {
      console.error("Apple ile giriş başlatılamadı", error);
      setIsAppleLoading(false);
    }
  };
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);

    const { error } = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });

    if (error) {
      console.error("Google ile giriş başlatılamadı", error);
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-card text-center space-y-4">
        <img
          src="/romingo-logo.svg"
          alt="Romingo logo"
          className="mx-auto w-44 max-w-[65vw]"
        />
        <p className="text-sm text-muted-foreground font-medium">Uygulamaya devam etmek için giriş yapın.</p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isGoogleLoading}
          className="w-full border border-border bg-background text-foreground font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-muted transition-colors disabled:opacity-70"
        >
          <span className="text-base" aria-hidden="true">G</span>
          {isGoogleLoading ? "Yönlendiriliyor..." : "Google ile devam et"}
        </button>

        <button
          type="button"
          onClick={handleAppleLogin}
          disabled={isAppleLoading}
          className="w-full border border-border bg-foreground text-background font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          {isAppleLoading ? "Yönlendiriliyor..." : "Apple ile devam et"}
        </button>

        <button
          type="button"
          onClick={onGuestLogin}
          className="w-full bg-flamingo text-white font-bold rounded-xl py-3 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <LogIn className="w-4 h-4" />
          Misafir olarak giriş yap
        </button>
      </div>
    </div>
  );
}
