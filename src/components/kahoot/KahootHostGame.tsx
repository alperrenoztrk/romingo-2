import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getQuestionsForDifficulty, shuffleAndPick, type KahootQuestion } from "@/data/kahootQuestions";
import { Users, Play, SkipForward, Trophy } from "lucide-react";
import QRCode from "@/components/kahoot/QRCode";

type Props = { roomId: string; onExit: () => void };

type Player = { id: string; nickname: string; total_score: number };
type Room = { pin: string; title: string; difficulty: "temel" | "orta"; status: string; current_question_index: number; question_count: number };

export default function KahootHostGame({ roomId, onExit }: Props) {
  const [room, setRoom] = useState<Room | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<KahootQuestion[]>([]);
  const [answerCounts, setAnswerCounts] = useState<Record<number, number>>({});

  // Fetch room
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await supabase
        .from("kahoot_rooms")
        .select("pin, title, difficulty, status, current_question_index, question_count")
        .eq("id", roomId)
        .single();
      if (data) {
        setRoom(data as Room);
        const qs = shuffleAndPick(getQuestionsForDifficulty(data.difficulty as "temel" | "orta"), data.question_count);
        setQuestions(qs);
      }
    };
    fetchRoom();
  }, [roomId]);

  // Fetch players
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from("kahoot_players")
        .select("id, nickname, total_score")
        .eq("room_id", roomId)
        .order("total_score", { ascending: false });
      if (data) setPlayers(data);
    };
    fetchPlayers();

    const channel = supabase
      .channel(`room-players-${roomId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "kahoot_players", filter: `room_id=eq.${roomId}` }, () => fetchPlayers())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  // Listen for room changes
  useEffect(() => {
    const channel = supabase
      .channel(`room-state-${roomId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "kahoot_rooms", filter: `id=eq.${roomId}` }, (payload) => {
        const updated = payload.new as any;
        setRoom((prev) => prev ? { ...prev, ...updated } : prev);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  // Listen for answers to count
  useEffect(() => {
    if (!room || room.status !== "playing") return;

    const fetchAnswerCounts = async () => {
      const { data } = await supabase
        .from("kahoot_answers")
        .select("question_index")
        .eq("room_id", roomId)
        .eq("question_index", room.current_question_index);
      if (data) {
        setAnswerCounts((prev) => ({ ...prev, [room.current_question_index]: data.length }));
      }
    };
    fetchAnswerCounts();

    const channel = supabase
      .channel(`room-answers-${roomId}-${room.current_question_index}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "kahoot_answers", filter: `room_id=eq.${roomId}` }, () => fetchAnswerCounts())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId, room?.status, room?.current_question_index]);

  const startGame = useCallback(async () => {
    await supabase.from("kahoot_rooms").update({ status: "playing", current_question_index: 0 }).eq("id", roomId);
  }, [roomId]);

  const nextQuestion = useCallback(async () => {
    if (!room) return;
    const nextIdx = room.current_question_index + 1;
    if (nextIdx >= questions.length) {
      await supabase.from("kahoot_rooms").update({ status: "finished", current_question_index: nextIdx }).eq("id", roomId);
    } else {
      await supabase.from("kahoot_rooms").update({ current_question_index: nextIdx }).eq("id", roomId);
    }
  }, [room, roomId, questions.length]);

  const currentQ = room && room.current_question_index >= 0 && room.current_question_index < questions.length
    ? questions[room.current_question_index]
    : null;

  const sortedPlayers = useMemo(() => [...players].sort((a, b) => b.total_score - a.total_score), [players]);

  if (!room) return <div className="p-6 text-center text-muted-foreground font-bold">Yükleniyor...</div>;

  const joinUrl = `${window.location.origin}/kahoot`;

  /* ─── Finished ─── */
  if (room.status === "finished") {
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4 animate-in fade-in">
        <div className="rounded-2xl p-6 text-center gradient-hero shadow-button-primary text-primary-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-3 animate-bounce" />
          <h1 className="text-2xl font-black">Sonuçlar</h1>
          <p className="font-semibold mt-1">{room.title}</p>
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-2">
          {sortedPlayers.map((p, i) => (
            <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
              <span className="font-black text-foreground">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {p.nickname}
              </span>
              <span className="font-bold text-flamingo">{p.total_score} puan</span>
            </div>
          ))}
        </div>
        <button onClick={onExit} className="w-full bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground active:translate-y-1 transition-transform">
          ← Ana Menü
        </button>
      </div>
    );
  }

  /* ─── Waiting ─── */
  if (room.status === "waiting") {
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4">
        <div className="rounded-2xl p-5 text-center gradient-sky shadow-button-sky text-primary-foreground">
          <h1 className="text-xl font-black">{room.title}</h1>
          <p className="font-semibold text-sm mt-1">
            {room.difficulty === "temel" ? "📗 Temel" : "📙 Orta"} Seviye
          </p>
        </div>

        <div className="bg-card rounded-2xl p-6 shadow-card text-center space-y-3">
          <p className="text-sm font-bold text-muted-foreground">Oyun PIN'i</p>
          <p className="text-5xl font-black tracking-[0.3em] text-foreground">{room.pin}</p>
          <QRCode value={joinUrl} />
          <p className="text-xs text-muted-foreground">QR kodu tarayarak veya PIN girerek katılın</p>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mb-3">
            <Users className="w-4 h-4" />
            <span>Oyuncular ({players.length}/50)</span>
          </div>
          {players.length === 0 ? (
            <p className="text-center text-muted-foreground text-sm py-4">Oyuncu bekleniyor...</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {players.map((p) => (
                <span key={p.id} className="bg-muted rounded-xl px-3 py-1.5 text-sm font-bold text-foreground">
                  {p.nickname}
                </span>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={startGame}
          disabled={players.length === 0}
          className="w-full gradient-success shadow-button-success rounded-2xl p-4 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Play className="w-5 h-5" /> Oyunu Başlat
        </button>
      </div>
    );
  }

  /* ─── Playing ─── */
  const answered = answerCounts[room.current_question_index] || 0;

  return (
    <div className="pb-20 px-4 py-4 max-w-lg mx-auto space-y-3">
      <div className="bg-card rounded-2xl p-4 shadow-card flex items-center justify-between">
        <span className="font-bold text-sm text-muted-foreground">
          Soru {room.current_question_index + 1}/{questions.length}
        </span>
        <span className="text-sm font-bold text-muted-foreground">
          {answered}/{players.length} cevapladı
        </span>
      </div>

      {currentQ && (
        <div className="bg-card rounded-2xl p-6 shadow-card">
          <h2 className="text-xl font-black text-foreground leading-snug">{currentQ.question}</h2>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {currentQ.options.map((opt, i) => {
              const colors = ["bg-[hsl(0,70%,55%)]", "bg-[hsl(220,70%,55%)]", "bg-[hsl(45,90%,50%)]", "bg-[hsl(140,60%,42%)]"];
              const shapes = ["▲", "◆", "●", "■"];
              return (
                <div key={i} className={`${colors[i]} rounded-xl p-3 text-primary-foreground font-bold text-sm flex items-center gap-2`}>
                  <span>{shapes[i]}</span>
                  <span>{opt}</span>
                  {i === currentQ.correctIndex && <span className="ml-auto">✓</span>}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <p className="text-sm font-bold text-muted-foreground mb-2">🏆 Sıralama</p>
        {sortedPlayers.slice(0, 5).map((p, i) => (
          <div key={p.id} className="flex items-center justify-between py-1.5">
            <span className="text-sm font-bold text-foreground">
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {p.nickname}
            </span>
            <span className="text-sm font-bold text-flamingo">{p.total_score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={nextQuestion}
        className="w-full gradient-sky shadow-button-sky rounded-2xl p-4 font-extrabold text-primary-foreground flex items-center justify-center gap-2 active:translate-y-1 transition-transform"
      >
        <SkipForward className="w-5 h-5" />
        {room.current_question_index + 1 >= questions.length ? "Sonuçları Göster" : "Sonraki Soru"}
      </button>
    </div>
  );
}
