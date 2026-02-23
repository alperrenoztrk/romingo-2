import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getQuestionsForDifficulty, shuffleAndPick, type KahootQuestion } from "@/data/kahootQuestions";
import { CheckCircle2, Clock3, Trophy, XCircle } from "lucide-react";

type Props = { roomId: string; playerId: string; nickname: string; onExit: () => void };

const OPTION_COLORS = ["bg-[hsl(0,70%,55%)]", "bg-[hsl(220,70%,55%)]", "bg-[hsl(45,90%,50%)]", "bg-[hsl(140,60%,42%)]"];
const OPTION_SHAPES = ["▲", "◆", "●", "■"];
const TIMER_SECONDS = 15;
const MAX_SCORE = 1000;

type RoomState = { status: string; current_question_index: number; difficulty: "temel" | "orta"; question_count: number; title: string };
type PlayerScore = { id: string; nickname: string; total_score: number };

export default function KahootPlayerGame({ roomId, playerId, nickname, onExit }: Props) {
  const [room, setRoom] = useState<RoomState | null>(null);
  const [questions, setQuestions] = useState<KahootQuestion[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [lastScore, setLastScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [players, setPlayers] = useState<PlayerScore[]>([]);

  // Fetch room state
  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("kahoot_rooms")
        .select("status, current_question_index, difficulty, question_count, title")
        .eq("id", roomId)
        .single();
      if (data) {
        setRoom(data as RoomState);
        const qs = shuffleAndPick(getQuestionsForDifficulty(data.difficulty as "temel" | "orta"), data.question_count);
        setQuestions(qs);
      }
    };
    fetch();
  }, [roomId]);

  // Listen for room updates
  useEffect(() => {
    const channel = supabase
      .channel(`player-room-${roomId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "kahoot_rooms", filter: `id=eq.${roomId}` }, (payload) => {
        const updated = payload.new as any;
        setRoom((prev) => {
          if (!prev) return prev;
          // Reset state for new question
          if (updated.current_question_index !== prev.current_question_index) {
            setAnswered(false);
            setLastCorrect(null);
            setLastScore(0);
            setTimeLeft(TIMER_SECONDS);
            setQuestionStartTime(Date.now());
          }
          return { ...prev, ...updated };
        });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [roomId]);

  // Timer
  useEffect(() => {
    if (!room || room.status !== "playing" || answered || room.current_question_index < 0) return;
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, room?.status, room?.current_question_index, answered]);

  // Fetch leaderboard on finish
  useEffect(() => {
    if (!room || room.status !== "finished") return;
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from("kahoot_players")
        .select("id, nickname, total_score")
        .eq("room_id", roomId)
        .order("total_score", { ascending: false });
      if (data) setPlayers(data);
    };
    fetchPlayers();
  }, [room?.status, roomId]);

  const handleTimeout = useCallback(async () => {
    if (answered) return;
    setAnswered(true);
    setLastCorrect(false);
    setLastScore(0);
    // Record null answer
    await supabase.from("kahoot_answers").insert({
      player_id: playerId,
      room_id: roomId,
      question_index: room!.current_question_index,
      selected_option: null,
      is_correct: false,
      answer_time_ms: TIMER_SECONDS * 1000,
      score: 0,
    });
  }, [answered, playerId, roomId, room?.current_question_index]);

  const handleAnswer = useCallback(async (optionIndex: number) => {
    if (answered || !room || !questions.length) return;
    setAnswered(true);

    const currentQ = questions[room.current_question_index];
    const isCorrect = optionIndex === currentQ.correctIndex;
    const elapsed = Date.now() - questionStartTime;
    const timeBonus = Math.max(0, 1 - elapsed / (TIMER_SECONDS * 1000));
    const score = isCorrect ? Math.round(MAX_SCORE * (0.5 + 0.5 * timeBonus)) : 0;

    setLastCorrect(isCorrect);
    setLastScore(score);
    const newTotal = totalScore + score;
    setTotalScore(newTotal);

    // Save answer
    await supabase.from("kahoot_answers").insert({
      player_id: playerId,
      room_id: roomId,
      question_index: room.current_question_index,
      selected_option: optionIndex,
      is_correct: isCorrect,
      answer_time_ms: elapsed,
      score,
    });

    // Update player score
    await supabase.from("kahoot_players").update({ total_score: newTotal }).eq("id", playerId);
  }, [answered, room, questions, questionStartTime, totalScore, playerId, roomId]);

  if (!room) return <div className="p-6 text-center text-muted-foreground font-bold">Bağlanılıyor...</div>;

  /* ─── Waiting ─── */
  if (room.status === "waiting") {
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4 text-center">
        <div className="rounded-2xl p-6 gradient-sky shadow-button-sky text-primary-foreground">
          <h1 className="text-2xl font-black">{room.title}</h1>
          <p className="font-semibold mt-2">Merhaba, {nickname}! 👋</p>
        </div>
        <div className="bg-card rounded-2xl p-8 shadow-card">
          <Clock3 className="w-10 h-10 mx-auto mb-3 text-muted-foreground animate-pulse" />
          <p className="font-bold text-foreground">Oyun başlamak üzere...</p>
          <p className="text-sm text-muted-foreground mt-1">Sunucu oyunu başlattığında sorular ekranınızda görünecek</p>
        </div>
      </div>
    );
  }

  /* ─── Finished ─── */
  if (room.status === "finished") {
    const myRank = players.findIndex((p) => p.id === playerId) + 1;
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4 animate-in fade-in">
        <div className="rounded-2xl p-6 text-center gradient-hero shadow-button-primary text-primary-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-3 animate-bounce" />
          <h1 className="text-2xl font-black">Oyun Bitti!</h1>
          <p className="font-bold mt-2">{nickname} — {totalScore} puan</p>
          {myRank > 0 && <p className="text-sm font-semibold mt-1">Sıralaman: {myRank}. / {players.length}</p>}
        </div>
        <div className="bg-card rounded-2xl p-4 shadow-card space-y-2">
          {players.slice(0, 10).map((p, i) => (
            <div key={p.id} className={`flex items-center justify-between p-3 rounded-xl ${p.id === playerId ? "bg-flamingo-light" : "bg-muted"}`}>
              <span className="font-black text-foreground">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`} {p.nickname}
              </span>
              <span className="font-bold text-flamingo">{p.total_score}</span>
            </div>
          ))}
        </div>
        <button onClick={onExit} className="w-full bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground active:translate-y-1 transition-transform">
          ← Ana Menü
        </button>
      </div>
    );
  }

  /* ─── Playing ─── */
  if (room.current_question_index < 0 || room.current_question_index >= questions.length) {
    return <div className="p-6 text-center text-muted-foreground font-bold">Soru yükleniyor...</div>;
  }

  const currentQ = questions[room.current_question_index];
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerUrgent = timeLeft <= 3;

  return (
    <div className="pb-20 px-4 py-4 max-w-lg mx-auto flex flex-col gap-3 min-h-[calc(100dvh-5rem)]">
      {/* Timer bar */}
      <div className="bg-card rounded-2xl p-3 shadow-card">
        <div className="flex items-center justify-between text-sm font-bold text-muted-foreground mb-2">
          <span>Soru {room.current_question_index + 1}/{questions.length}</span>
          <span className={`font-black text-lg ${timerUrgent ? "text-flamingo animate-pulse" : "text-foreground"}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${timerUrgent ? "bg-flamingo" : "bg-sky-brand"}`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-card rounded-2xl p-5 shadow-card">
        <h2 className="text-lg font-black text-foreground leading-snug">{currentQ.question}</h2>
      </div>

      {/* Feedback */}
      {answered && lastCorrect !== null && (
        <div className={`rounded-2xl p-4 text-center font-black text-lg text-primary-foreground animate-in zoom-in-95 duration-200 ${lastCorrect ? "bg-success" : "bg-flamingo"}`}>
          {lastCorrect ? (
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="w-6 h-6" /> Doğru! +{lastScore} puan</span>
          ) : (
            <span className="inline-flex items-center gap-2"><XCircle className="w-6 h-6" /> {timeLeft <= 0 ? "Süre doldu!" : "Yanlış!"}</span>
          )}
        </div>
      )}

      {/* Answer grid */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {currentQ.options.map((option, i) => {
          const isSelected = answered && lastCorrect !== null;
          const isCorrect = currentQ.correctIndex === i;
          const dimmed = answered && !isCorrect;
          const highlighted = answered && isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={answered}
              className={`
                ${OPTION_COLORS[i]} rounded-2xl p-4 flex flex-col items-center justify-center gap-2
                text-primary-foreground font-bold text-sm shadow-lg
                transition-all duration-200 min-h-[5rem]
                ${dimmed ? "opacity-30 scale-95" : ""}
                ${highlighted ? "ring-4 ring-primary-foreground scale-105" : ""}
                ${!answered ? "active:scale-95 active:opacity-90" : ""}
              `}
            >
              <span className="text-2xl leading-none">{OPTION_SHAPES[i]}</span>
              <span className="text-center leading-tight">{option}</span>
            </button>
          );
        })}
      </div>

      <div className="text-center text-sm font-bold text-muted-foreground">
        Toplam: {totalScore} puan
      </div>
    </div>
  );
}
