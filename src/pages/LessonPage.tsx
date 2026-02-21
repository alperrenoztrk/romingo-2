import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { lessonsData } from "../data/lessons";
import { X, Heart, Check, ArrowRight } from "lucide-react";
import MultipleChoiceEx from "../components/exercises/MultipleChoiceEx";
import FillBlankEx from "../components/exercises/FillBlankEx";
import TranslationEx from "../components/exercises/TranslationEx";
import MatchingEx from "../components/exercises/MatchingEx";
import ListeningEx from "../components/exercises/ListeningEx";
import SentenceBuilderEx from "../components/exercises/SentenceBuilderEx";
import LessonComplete from "../components/LessonComplete";
import { addTodayProgress } from "../lib/weeklyProgress";
import { orderedLessonIds } from "../data/lessonCatalog";
import { getLessonProgress, isLessonUnlocked, saveLessonCompletion } from "../lib/lessonProgress";
import { addTodayCorrectAnswer } from "../lib/dailyGoals";
import { consumeHeart, consumeHearts, getHeartStatus, markLessonActivity, syncHearts } from "@/lib/learningEconomy";
import { recordAdaptiveAnswer } from "@/lib/adaptivePractice";
import { addXpToProfile } from "@/lib/liveProfile";

const PERFECT_LESSON_BONUS_XP = 25;
const HATTRICK_BONUS_XP = 5;
const MIN_STARS_TO_UNLOCK_NEXT_LESSON = 2;
const CORRECT_FEEDBACK_MESSAGES = [
  "Mükemmel!",
  "Harikasın!",
  "Tebrikler!",
  "Muhteşemsin!",
] as const;
const ANSWER_FEEDBACK_PATTERN = {
  correct: [
    { frequency: 783.99, duration: 0.08 },
    { frequency: 1046.5, duration: 0.12 },
    { frequency: 1318.51, duration: 0.15 },
  ],
  wrong: [
    { frequency: 392, duration: 0.09 },
    { frequency: 329.63, duration: 0.1 },
    { frequency: 261.63, duration: 0.14 },
  ],
} as const;

const lessonMascots = [
  {
    id: "flamingo",
    name: "Flamingo",
    vibe: "Harika gidiyorsun! Bu turu birlikte çözelim.",
    gradient: "from-pink-500/30 via-fuchsia-400/20 to-transparent",
    border: "border-pink-300/40",
    orb: "from-pink-300 via-fuchsia-300 to-rose-400",
    ring: "ring-pink-200/70",
  },
  {
    id: "cat",
    name: "Kedi",
    vibe: "Dikkatli ol, doğru cevaba çok yakınsın.",
    gradient: "from-amber-500/30 via-orange-300/20 to-transparent",
    border: "border-amber-300/40",
    orb: "from-amber-200 via-orange-300 to-amber-500",
    ring: "ring-amber-100/80",
  },
  {
    id: "toucan",
    name: "Tukan",
    vibe: "Sesleri dinle ve kelimeleri yakala!",
    gradient: "from-sky-500/30 via-cyan-300/20 to-transparent",
    border: "border-sky-300/40",
    orb: "from-sky-200 via-cyan-300 to-blue-400",
    ring: "ring-sky-100/80",
  },
  {
    id: "panda",
    name: "Panda",
    vibe: "Sakin kal, adım adım ilerleyip başaracaksın.",
    gradient: "from-slate-500/30 via-zinc-300/20 to-transparent",
    border: "border-slate-300/40",
    orb: "from-slate-100 via-slate-300 to-slate-500",
    ring: "ring-slate-100/80",
  },
] as const;

function MascotFace({ mascotId, mascotName }: { mascotId: (typeof lessonMascots)[number]["id"]; mascotName: string }) {
  if (mascotId === "cat") {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label={mascotName}>
        <path d="M14 22 L20 8 L28 20" fill="#f59e0b" />
        <path d="M50 22 L44 8 L36 20" fill="#f59e0b" />
        <ellipse cx="32" cy="35" rx="22" ry="19" fill="#fbbf24" />
        <ellipse cx="25" cy="33" rx="4" ry="5" fill="white" />
        <ellipse cx="39" cy="33" rx="4" ry="5" fill="white" />
        <circle cx="25" cy="34" r="2" fill="#111827" />
        <circle cx="39" cy="34" r="2" fill="#111827" />
        <path d="M29 41 Q32 44 35 41" stroke="#111827" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="40" r="2" fill="#fb7185" />
      </svg>
    );
  }

  if (mascotId === "toucan") {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label={mascotName}>
        <ellipse cx="28" cy="34" rx="18" ry="18" fill="#38bdf8" />
        <ellipse cx="26" cy="33" rx="5" ry="6" fill="white" />
        <circle cx="26" cy="34" r="2.2" fill="#111827" />
        <path d="M31 34 C44 26, 56 27, 60 33 C56 40, 44 41, 31 38 Z" fill="#fb923c" />
        <path d="M31 36 C43 34, 55 35, 59 38 C54 42, 43 43, 31 40 Z" fill="#f43f5e" />
        <path d="M31 34 L59 38" stroke="#111827" strokeWidth="1.5" />
      </svg>
    );
  }

  if (mascotId === "panda") {
    return (
      <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label={mascotName}>
        <circle cx="19" cy="18" r="8" fill="#1f2937" />
        <circle cx="45" cy="18" r="8" fill="#1f2937" />
        <ellipse cx="32" cy="36" rx="22" ry="19" fill="#f8fafc" />
        <ellipse cx="24" cy="34" rx="5" ry="7" fill="#1f2937" />
        <ellipse cx="40" cy="34" rx="5" ry="7" fill="#1f2937" />
        <circle cx="24" cy="34" r="2" fill="white" />
        <circle cx="40" cy="34" r="2" fill="white" />
        <ellipse cx="32" cy="42" rx="4" ry="3" fill="#111827" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" role="img" aria-label={mascotName}>
      <ellipse cx="30" cy="36" rx="16" ry="19" fill="#f472b6" />
      <path d="M28 18 C26 8, 35 6, 38 14 C39 17, 37 21, 33 24" fill="#ec4899" />
      <ellipse cx="25" cy="34" rx="3.5" ry="4.5" fill="white" />
      <ellipse cx="34" cy="36" rx="3" ry="4" fill="white" />
      <circle cx="25" cy="35" r="1.7" fill="#111827" />
      <circle cx="34" cy="37" r="1.5" fill="#111827" />
      <path d="M42 39 C49 35, 54 36, 57 40 C54 45, 48 46, 42 44 Z" fill="#fbcfe8" />
    </svg>
  );
}

function calculateStars(correctCount: number, totalCount: number) {
  if (totalCount <= 0) {
    return 0;
  }

  const percentage = (correctCount / totalCount) * 100;
  if (percentage >= 85) {
    return 3;
  }

  if (percentage >= 50) {
    return 2;
  }

  if (percentage >= 35) {
    return 1;
  }

  return 0;
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lesson = lessonsData[id || ""];
  const lessonId = id || "";
  const shouldSkipExerciseIntro = searchParams.get("skipIntro") === "1";
  const lessonProgress = getLessonProgress();
  const isUnlocked = isLessonUnlocked(lessonId, orderedLessonIds, lessonProgress);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(() => getHeartStatus().hearts);
  const [maxHearts, setMaxHearts] = useState(() => getHeartStatus().maxHearts);
  const [minutesToNextHeart, setMinutesToNextHeart] = useState(() => getHeartStatus().minutesToNextHeart);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [feedbackSpark, setFeedbackSpark] = useState(0);
  const [, setCorrectStreak] = useState(0);
  const [hattrickBonusXp, setHattrickBonusXp] = useState(0);
  const [correctFeedbackMessage, setCorrectFeedbackMessage] = useState(CORRECT_FEEDBACK_MESSAGES[0]);
  const [exerciseIndexes, setExerciseIndexes] = useState<number[]>([]);
  const [wrongExerciseIndexes, setWrongExerciseIndexes] = useState<number[]>([]);
  const [queuedRetryIndexes, setQueuedRetryIndexes] = useState<number[]>([]);
  const [retryExerciseIndexes, setRetryExerciseIndexes] = useState<number[]>([]);
  const [revealedAnswerIndex, setRevealedAnswerIndex] = useState<number | null>(null);
  const [isHeartBreakAnimating, setIsHeartBreakAnimating] = useState(false);
  const [showExerciseIntro, setShowExerciseIntro] = useState(!shouldSkipExerciseIntro);
  const progressSavedRef = useRef(false);
  const lessonStartedAtRef = useRef(Date.now());
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    syncHearts();
    const sync = () => {
      const heartStatus = getHeartStatus();
      setHearts(heartStatus.hearts);
      setMaxHearts(heartStatus.maxHearts);
      setMinutesToNextHeart(heartStatus.minutesToNextHeart);
    };

    sync();
    const interval = window.setInterval(sync, 15000);
    window.addEventListener("romingo:learning-economy-updated", sync);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("romingo:learning-economy-updated", sync);
    };
  }, []);

  const exercises = lesson?.exercises ?? [];

  useEffect(() => {
    setExerciseIndexes(exercises.map((_, index) => index));
    setWrongExerciseIndexes([]);
    setQueuedRetryIndexes([]);
    setRetryExerciseIndexes([]);
    setRevealedAnswerIndex(null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setAnswered(false);
    setIsCorrect(false);
    setCompleted(false);
    setCorrectStreak(0);
    setHattrickBonusXp(0);
    setCorrectFeedbackMessage(CORRECT_FEEDBACK_MESSAGES[0]);
    setShowExerciseIntro(true);
    progressSavedRef.current = false;
    lessonStartedAtRef.current = Date.now();
  }, [lessonId, exercises]);

  const currentExerciseIndex = exerciseIndexes[currentIndex];
  const currentMascot = useMemo(() => {
    const mascotIndex = typeof currentExerciseIndex === "number"
      ? Math.abs(currentExerciseIndex) % lessonMascots.length
      : currentIndex % lessonMascots.length;

    return lessonMascots[mascotIndex];
  }, [currentExerciseIndex, currentIndex]);

  const currentExercise = useMemo(() => {
    if (typeof currentExerciseIndex !== "number") {
      return undefined;
    }

    return exercises[currentExerciseIndex];
  }, [currentExerciseIndex, exercises]);

  const exercisePrompt = useMemo(() => {
    if (!currentExercise) return "";

    if (currentExercise.type === "multiple_choice") {
      return currentExercise.question;
    }

    if (currentExercise.type === "listening") {
      return "Duyduğun kelimeyi seç";
    }

    if (currentExercise.type === "matching") {
      return "Eşleşenleri bul";
    }

    if (currentExercise.type === "sentence_builder") {
      return currentExercise.prompt;
    }

    if (currentExercise.type === "fill_blank") {
      return "";
    }

    if (currentExercise.type === "translation") {
      return "";
    }

    return "";
  }, [currentExercise]);

  const playAnswerFeedback = useCallback((correct: boolean) => {
    if (typeof window === "undefined") return;

    if ("vibrate" in navigator) {
      window.navigator.vibrate(correct ? [35] : [20, 35, 20]);
    }

    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new window.AudioContext();
    }

    const audioContext = audioContextRef.current;
    if (audioContext.state === "suspended") {
      void audioContext.resume();
    }

    const pattern = correct ? ANSWER_FEEDBACK_PATTERN.correct : ANSWER_FEEDBACK_PATTERN.wrong;
    let cursor = audioContext.currentTime;

    pattern.forEach(({ frequency, duration }, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = correct ? "triangle" : "square";
      oscillator.frequency.setValueAtTime(frequency, cursor);

      gainNode.gain.setValueAtTime(0.0001, cursor);
      gainNode.gain.exponentialRampToValueAtTime(correct ? 0.13 : 0.1, cursor + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, cursor + duration);

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start(cursor);
      oscillator.stop(cursor + duration + 0.01);

      cursor += duration + (index === pattern.length - 1 ? 0 : 0.012);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        void audioContextRef.current.close();
      }
    };
  }, []);

  const handleAnswer = useCallback((correct: boolean) => {
    if (!lesson || !currentExercise) return;

    setAnswered(true);
    setIsCorrect(correct);
    playAnswerFeedback(correct);
    recordAdaptiveAnswer({ lessonId: lesson.id, type: currentExercise.type, correct });

    if (correct) {
      setFeedbackSpark((prev) => prev + 1);
      setCorrectCount((c) => c + 1);
      setCorrectStreak((previousStreak) => {
        const nextStreak = previousStreak + 1;
        if (nextStreak % 3 === 0) {
          setHattrickBonusXp((previousBonus) => previousBonus + HATTRICK_BONUS_XP);
          setCorrectFeedbackMessage(`Ooo tebrikler hatrick yaptın! +${HATTRICK_BONUS_XP} XP`);
        } else {
          const randomIndex = Math.floor(Math.random() * CORRECT_FEEDBACK_MESSAGES.length);
          setCorrectFeedbackMessage(CORRECT_FEEDBACK_MESSAGES[randomIndex]);
        }

        return nextStreak;
      });
      addTodayCorrectAnswer();
    } else {
      setCorrectStreak(0);
      if (typeof currentExerciseIndex === "number") {
        setWrongExerciseIndexes((prev) => {
          if (prev.includes(currentExerciseIndex)) {
            return prev;
          }

          return [...prev, currentExerciseIndex];
        });

        setQueuedRetryIndexes((prev) => {
          if (prev.includes(currentExerciseIndex)) {
            return prev;
          }

          setExerciseIndexes((existing) => [...existing, currentExerciseIndex]);
          return [...prev, currentExerciseIndex];
        });
      }
      const nextHeartState = consumeHeart();
      setHearts(nextHeartState.hearts);
      setMinutesToNextHeart(getHeartStatus().minutesToNextHeart);
    }
  }, [currentExercise, currentExerciseIndex, lesson, playAnswerFeedback]);

  const handleNext = useCallback(() => {
    if (!lesson) return;
    if (currentIndex + 1 >= exerciseIndexes.length) {
      const stars = calculateStars(correctCount, exerciseIndexes.length);
      const isPerfectLesson = exerciseIndexes.length > 0 && correctCount === exerciseIndexes.length;
      const totalXpReward = lesson.xpReward + (isPerfectLesson ? PERFECT_LESSON_BONUS_XP : 0) + hattrickBonusXp;

      if (!progressSavedRef.current) {
        const canUnlockNextLesson = stars >= MIN_STARS_TO_UNLOCK_NEXT_LESSON;

        if (hearts > 0) {
          addTodayProgress(totalXpReward);
          addXpToProfile(totalXpReward);
          markLessonActivity();
        }

        if (hearts > 0 || canUnlockNextLesson) {
          saveLessonCompletion(lesson.id, stars, isPerfectLesson);
          progressSavedRef.current = true;
        }
      }

      setRetryExerciseIndexes(wrongExerciseIndexes);
      setCompleted(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [correctCount, currentIndex, exerciseIndexes.length, hattrickBonusXp, hearts, lesson, wrongExerciseIndexes]);

  const handleRetryWrongAnswers = useCallback(() => {
    if (retryExerciseIndexes.length === 0) {
      return;
    }

    setExerciseIndexes(retryExerciseIndexes);
    setWrongExerciseIndexes([]);
    setQueuedRetryIndexes([]);
    setRetryExerciseIndexes([]);
    setRevealedAnswerIndex(null);
    setCurrentIndex(0);
    setCorrectCount(0);
    setAnswered(false);
    setIsCorrect(false);
    setCorrectStreak(0);
    setHattrickBonusXp(0);
    setCorrectFeedbackMessage(CORRECT_FEEDBACK_MESSAGES[0]);
    setCompleted(false);
    progressSavedRef.current = false;
  }, [retryExerciseIndexes]);

  useEffect(() => {
    if (!answered || !isCorrect) {
      return;
    }

    const timer = window.setTimeout(() => {
      handleNext();
    }, 700);

    return () => {
      window.clearTimeout(timer);
    };
  }, [answered, handleNext, isCorrect]);

  useEffect(() => {
    if (lesson && !isUnlocked) {
      navigate("/learn", { replace: true });
    }
  }, [isUnlocked, lesson, navigate]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground font-bold">Ders bulunamadı</p>
      </div>
    );
  }

  if (!isUnlocked) {
    return null;
  }

  const progressBase = exerciseIndexes.length || 1;
  const progress = (currentIndex / progressBase) * 100;
  const isAnswerRevealed = typeof currentExerciseIndex === "number" && revealedAnswerIndex === currentExerciseIndex;

  const revealedAnswerText = !currentExercise
    ? ""
    : currentExercise.type === "multiple_choice" || currentExercise.type === "listening"
      ? currentExercise.options[currentExercise.correctIndex] ?? ""
      : currentExercise.type === "fill_blank" || currentExercise.type === "translation"
      ? currentExercise.correctAnswer
      : currentExercise.type === "sentence_builder"
        ? currentExercise.correctSentence
        : currentExercise.pairs.map((pair) => `${pair.left} = ${pair.right}`).join(" • ");

  const handleRevealAnswer = () => {
    if (typeof currentExerciseIndex !== "number") {
      return;
    }

    if (hearts <= 0) {
      return;
    }

    if (revealedAnswerIndex === currentExerciseIndex) {
      return;
    }

    const nextHeartState = consumeHearts(0.5);
    setHearts(nextHeartState.hearts);
    setMinutesToNextHeart(getHeartStatus().minutesToNextHeart);
    setRevealedAnswerIndex(currentExerciseIndex);
    setIsHeartBreakAnimating(true);
  };

  useEffect(() => {
    if (!isHeartBreakAnimating) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsHeartBreakAnimating(false);
    }, 550);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isHeartBreakAnimating]);

  useEffect(() => {
    if (revealedAnswerIndex === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setRevealedAnswerIndex(null);
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [revealedAnswerIndex]);

  if (completed) {
    const stars = calculateStars(correctCount, exerciseIndexes.length);
    const isPerfectLesson = exerciseIndexes.length > 0 && correctCount === exerciseIndexes.length;
    const totalXpReward = lesson.xpReward + (isPerfectLesson ? PERFECT_LESSON_BONUS_XP : 0) + hattrickBonusXp;
    const elapsedSeconds = Math.max(1, Math.round((Date.now() - lessonStartedAtRef.current) / 1000));
    return (
      <LessonComplete
        lesson={lesson}
        correctCount={correctCount}
        totalCount={exerciseIndexes.length}
        elapsedSeconds={elapsedSeconds}
        stars={stars}
        xpEarned={totalXpReward}
        isPerfectLesson={isPerfectLesson}
        onRetryWrongAnswers={stars >= 1 && retryExerciseIndexes.length > 0 ? handleRetryWrongAnswers : undefined}
        onContinue={() => navigate("/learn")}
      />
    );
  }

  if (showExerciseIntro) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-xl">
          <p className="text-xs font-black uppercase tracking-wide text-warning mb-2">Ders öncesi alıştırma</p>
          <h1 className="text-2xl font-black text-foreground mb-2">{lesson.title}</h1>
          <p className="text-sm font-semibold text-muted-foreground mb-6">{lesson.description}</p>

          <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 mb-6">
            <p className="text-sm font-bold text-foreground">Bu derste seni ne bekliyor?</p>
            <ul className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground list-disc pl-4">
              <li>{exerciseIndexes.length} soru</li>
              <li>Doğru cevaplarla yıldız topla ve yeni derslerin kilidini aç</li>
              <li>İstersen bu ekranı atlayıp direkt sorulara geçebilirsin</li>
            </ul>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => setShowExerciseIntro(false)}
              className="px-4 py-2 text-sm font-extrabold rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors"
            >
              Atla
            </button>
            <button
              onClick={() => navigate(`/learn?view=tutorial&lessonId=${lesson.id}`)}
              className="px-5 py-2 text-sm font-extrabold rounded-xl bg-success text-accent-foreground shadow-button-success active:shadow-none"
            >
              Alıştırmaya başla
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
        <button
          onClick={() => navigate("/learn")}
          className="p-1 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-6 h-6 text-muted-foreground" />
        </button>
        <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full gradient-success rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {isHeartBreakAnimating ? (
              <span className="relative h-5 w-5" aria-hidden>
                <span className="absolute inset-0 overflow-hidden [clip-path:inset(0_50%_0_0)]">
                  <Heart className="h-5 w-5 text-flamingo transition-transform duration-500 -translate-x-[2px] -rotate-12" fill="hsl(var(--flamingo))" />
                </span>
                <span className="absolute inset-0 overflow-hidden [clip-path:inset(0_0_0_50%)]">
                  <Heart className="h-5 w-5 text-flamingo transition-transform duration-500 translate-x-[2px] rotate-12" fill="hsl(var(--flamingo))" />
                </span>
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-background/80" />
              </span>
            ) : (
              <Heart className="w-5 h-5 text-flamingo" fill="hsl(var(--flamingo))" />
            )}
            <span className="font-extrabold text-sm text-flamingo">{hearts}</span>
          </div>
          {hearts < maxHearts && (
            <span className="text-[10px] font-bold text-muted-foreground">+1 can {minutesToNextHeart} dk</span>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">
        {currentExercise && (
          <>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="text-xs font-bold text-muted-foreground uppercase">
                {currentExercise.type === "translation" && "Çevir"}
                {currentExercise.type === "listening" && "Dinleyip seç"}
                {currentExercise.type === "sentence_builder" && "Sürükleyip cümle kur"}
              </div>

              {hearts > 0 && (
                <button
                  onClick={handleRevealAnswer}
                  disabled={isAnswerRevealed}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-black border transition-all ${
                    isAnswerRevealed
                      ? "bg-success-light text-success border-success/40"
                      : "bg-card text-warning border-warning/40 shadow-sm hover:scale-105"
                  }`}
                  aria-label="Cevabı göster (0.5 can)"
                >
                  ?
                </button>
              )}
            </div>

            {isAnswerRevealed && (
              <div className="mb-3 rounded-2xl px-3 py-2 border border-warning/40 bg-gradient-to-r from-warning/25 via-warning/10 to-transparent animate-pulse">
                <p className="text-xs font-bold text-warning">İpucu: {revealedAnswerText}</p>
              </div>
            )}

            {exercisePrompt && (
              <div
                className={`relative mb-4 rounded-2xl border px-3 pb-2 pt-7 bg-gradient-to-r shadow-[0_10px_22px_-14px_rgba(0,0,0,0.7)] ${currentMascot.gradient} ${currentMascot.border}`}
                aria-live="polite"
              >
                <div className="absolute -top-6 left-3">
                  <div className="relative shrink-0">
                    <div className={`relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br ${currentMascot.orb} shadow-[inset_0_-8px_12px_rgba(0,0,0,0.24),0_10px_16px_-8px_rgba(0,0,0,0.85)] ring-2 ${currentMascot.ring}`}>
                      <MascotFace mascotId={currentMascot.id} mascotName={currentMascot.name} />
                      <span className="pointer-events-none absolute left-2 top-2 h-3 w-6 rounded-full bg-white/60 blur-[1px]" aria-hidden />
                    </div>
                    <span className="pointer-events-none absolute -bottom-1.5 left-1/2 h-3 w-10 -translate-x-1/2 rounded-full bg-black/25 blur-[2px]" aria-hidden />
                  </div>
                </div>
                <p className="pl-[4.6rem] text-lg font-black text-foreground">{exercisePrompt}</p>
              </div>
            )}

            <div className="flex-1">
              {currentExercise.type === "multiple_choice" && (
                <MultipleChoiceEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
              {currentExercise.type === "fill_blank" && (
                <FillBlankEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
              {currentExercise.type === "translation" && (
                <TranslationEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
              {currentExercise.type === "matching" && (
                <MatchingEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
              {currentExercise.type === "listening" && (
                <ListeningEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
              {currentExercise.type === "sentence_builder" && (
                <SentenceBuilderEx exercise={currentExercise} onAnswer={handleAnswer} answered={answered} />
              )}
            </div>
          </>
        )}
      </div>

      {answered && (
        <div
          className={`px-4 py-4 border-t-2 ${
            isCorrect ? "bg-success-light border-success" : "bg-flamingo-light border-flamingo"
          }`}
        >
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <Check className="w-6 h-6 text-success" />
              ) : (
                <X className="w-6 h-6 text-flamingo" />
              )}
              <span className={`font-extrabold ${isCorrect ? "text-success" : "text-flamingo"}`}>
                {isCorrect ? correctFeedbackMessage : hearts <= 0 ? "Canların tükendi" : "Tekrar dene"}
              </span>
              {isCorrect && (
                <span key={feedbackSpark} className="text-lg animate-bounce" aria-hidden>
                  ✨🎉
                </span>
              )}
            </div>
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 active:translate-y-0.5 transition-all ${
                isCorrect
                  ? "bg-success text-accent-foreground shadow-button-success active:shadow-none"
                  : "bg-flamingo text-primary-foreground shadow-button-primary active:shadow-none"
              }`}
            >
              Devam et
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
