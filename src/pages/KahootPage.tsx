import { useState } from "react";
import KahootLobby from "@/components/kahoot/KahootLobby";
import KahootJoin from "@/components/kahoot/KahootJoin";
import KahootHostGame from "@/components/kahoot/KahootHostGame";
import KahootPlayerGame from "@/components/kahoot/KahootPlayerGame";
import { useNavigate } from "react-router-dom";

type KahootView =
  | { type: "menu" }
  | { type: "create" }
  | { type: "join" }
  | { type: "host"; roomId: string }
  | { type: "player"; roomId: string; playerId: string; nickname: string };

export default function KahootPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<KahootView>({ type: "menu" });

  if (view.type === "host") {
    return (
      <KahootHostGame
        roomId={view.roomId}
        onExit={() => setView({ type: "menu" })}
      />
    );
  }

  if (view.type === "player") {
    return (
      <KahootPlayerGame
        roomId={view.roomId}
        playerId={view.playerId}
        nickname={view.nickname}
        onExit={() => setView({ type: "menu" })}
      />
    );
  }

  if (view.type === "create") {
    return (
      <KahootLobby
        onRoomCreated={(roomId) => setView({ type: "host", roomId })}
        onBack={() => setView({ type: "menu" })}
      />
    );
  }

  if (view.type === "join") {
    return (
      <KahootJoin
        onJoined={(roomId, playerId, nickname) =>
          setView({ type: "player", roomId, playerId, nickname })
        }
        onBack={() => setView({ type: "menu" })}
      />
    );
  }

  // Menu
  return (
    <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4">
      <div className="rounded-2xl p-6 text-center gradient-hero shadow-button-primary text-primary-foreground">
        <h1 className="text-3xl font-black">🎯 Kahoot</h1>
        <p className="text-sm font-semibold mt-1 opacity-90">Çok oyunculu Romence bilgi yarışması</p>
      </div>

      <button
        onClick={() => setView({ type: "create" })}
        className="w-full gradient-sky shadow-button-sky rounded-2xl p-5 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform"
      >
        🏠 Oda Oluştur
      </button>

      <button
        onClick={() => setView({ type: "join" })}
        className="w-full gradient-success shadow-button-success rounded-2xl p-5 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform"
      >
        🎮 Oyuna Katıl
      </button>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground active:translate-y-1 transition-transform"
      >
        ← Anasayfaya Dön
      </button>
    </div>
  );
}
