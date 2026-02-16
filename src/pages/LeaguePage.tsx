import StatsBar from "../components/StatsBar";
import { Crown, Medal, Award } from "lucide-react";

interface Player {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
}

const players: Player[] = [
  { rank: 1, name: "Ayşe", xp: 3200, avatar: "👩" },
  { rank: 2, name: "Mehmet", xp: 2800, avatar: "👨" },
  { rank: 3, name: "Zeynep", xp: 2450, avatar: "👧" },
  { rank: 4, name: "Ali", xp: 2100, avatar: "🧑" },
  { rank: 5, name: "Fatma", xp: 1900, avatar: "👩‍🦱" },
  { rank: 6, name: "Sen", xp: 1450, avatar: "🦩" },
  { rank: 7, name: "Emre", xp: 1300, avatar: "👦" },
  { rank: 8, name: "Selin", xp: 1100, avatar: "👩‍🦰" },
  { rank: 9, name: "Can", xp: 900, avatar: "🧔" },
  { rank: 10, name: "Deniz", xp: 750, avatar: "🧑‍🦱" },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="w-5 h-5 text-gold" fill="hsl(var(--gold))" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
  if (rank === 3) return <Award className="w-5 h-5 text-flamingo" />;
  return <span className="text-sm font-extrabold text-muted-foreground w-5 text-center">{rank}</span>;
}

export default function LeaguePage() {
  return (
    <div className="pb-20">
      <StatsBar />

      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* League Header */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto gradient-gold rounded-full flex items-center justify-center mb-3 shadow-elevated">
            <span className="text-4xl">🏆</span>
          </div>
          <h1 className="text-xl font-black text-foreground">Bronz Lig</h1>
          <p className="text-muted-foreground text-sm font-semibold">
            İlk 3'e gir ve Gümüş Lig'e yüksel!
          </p>
        </div>

        {/* Countdown */}
        <div className="bg-card rounded-2xl p-3 shadow-card mb-6 text-center">
          <span className="text-xs font-bold text-muted-foreground">Kalan süre: </span>
          <span className="text-xs font-extrabold text-flamingo">2 gün 14 saat</span>
        </div>

        {/* Leaderboard */}
        <div className="bg-card rounded-2xl shadow-card overflow-hidden">
          {players.map((player, i) => {
            const isYou = player.name === "Sen";
            return (
              <div
                key={player.rank}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  i < players.length - 1 ? "border-b border-border" : ""
                } ${isYou ? "bg-flamingo-light" : ""} ${
                  player.rank <= 3 ? "bg-gold-light/30" : ""
                }`}
              >
                <div className="w-8 flex justify-center">
                  {getRankIcon(player.rank)}
                </div>
                <div className="text-2xl">{player.avatar}</div>
                <div className="flex-1">
                  <span
                    className={`font-bold text-sm ${
                      isYou ? "text-flamingo" : "text-foreground"
                    }`}
                  >
                    {player.name}
                    {isYou && " (Sen)"}
                  </span>
                </div>
                <span className="font-extrabold text-sm text-sky-brand">
                  {player.xp.toLocaleString()} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
