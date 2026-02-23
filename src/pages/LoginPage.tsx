import { lovable } from "@/integrations/lovable/index";
import { LogIn } from "lucide-react";
import { useState } from "react";

type LoginPageProps = {
  onGuestLogin: () => void;
};

export default function LoginPage({ onGuestLogin }: LoginPageProps) {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
          src="https://www.romingoakademi.com/static/images/logo.png"
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
