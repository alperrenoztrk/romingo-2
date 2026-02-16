import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, loginAsGuest } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card rounded-2xl p-6 shadow-card space-y-6 text-center">
        <div className="text-6xl animate-float">🦩</div>
        <div>
          <h1 className="text-2xl font-black text-foreground">Romingo'ya Hoş Geldin</h1>
          <p className="text-sm text-muted-foreground font-semibold mt-2">
            Uygulamaya devam etmek için misafir olarak giriş yap.
          </p>
        </div>

        <button
          onClick={() => {
            loginAsGuest();
            navigate("/", { replace: true });
          }}
          className="w-full gradient-hero shadow-button-primary rounded-2xl px-4 py-3 text-primary-foreground font-extrabold active:translate-y-1 active:shadow-none transition-all"
        >
          Misafir Girişi Yap
        </button>
      </div>
    </div>
  );
}
