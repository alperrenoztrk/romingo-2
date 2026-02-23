import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Trophy, XCircle, Zap } from "lucide-react";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "'Bună dimineața' ne anlama gelir?",
    options: ["İyi geceler", "Günaydın", "Hoşça kal", "İyi akşamlar"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "'Carte' kelimesinin Türkçe karşılığı nedir?",
    options: ["Kalem", "Defter", "Kitap", "Masa"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "'Eu învăț limba română.' cümlesinin doğru çevirisi hangisidir?",
    options: [
      "Romence öğretiyorum.",
      "Romence öğreniyorum.",
      "Romence konuşmuyorum.",
      "Romence çalıştım.",
    ],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "'Măr' kelimesi hangisini ifade eder?",
    options: ["Armut", "Portakal", "Elma", "Muz"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "'La revedere' hangi anlama gelir?",
    options: ["Hoşça kal", "Hemen gel", "Tekrar dene", "Memnun oldum"],
    correctIndex: 0,
  },
  {
    id: 6,
    question: "'Mulțumesc' ne demektir?",
    options: ["Lütfen", "Teşekkürler", "Özür dilerim", "Merhaba"],
    correctIndex: 1,
  },
  {
    id: 7,
    question: "'Apă' kelimesinin anlamı nedir?",
    options: ["Süt", "Çay", "Su", "Kahve"],
    correctIndex: 2,
  },
  {
    id: 8,
    question: "'Câine' hangi hayvanı ifade eder?",
    options: ["Kedi", "Köpek", "Kuş", "Balık"],
    correctIndex: 1,
  },
];

const TIMER_SECONDS = 10;

const OPTION_COLORS = [
  "bg-[hsl(0,70%,55%)]", // red
  "bg-[hsl(220,70%,55%)]", // blue
  "bg-[hsl(45,90%,50%)]", // yellow
  "bg-[hsl(140,60%,42%)]", // green
];

const OPTION_SHAPES = ["▲", "◆", "●", "■"];

export default function KahootPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastAnswer, setLastAnswer] = useState<number | null>(null);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isFinished = currentIndex >= totalQuestions;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const correctAnswers = useMemo(
    () =>
      selectedAnswers.reduce((total, answer, qi) => {
        return QUIZ_QUESTIONS[qi]?.correctIndex === answer ? total + 1 : total;
      }, 0),
    [selectedAnswers],
  );

  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

  const advanceQuestion = useCallback(() => {
    setShowFeedback(false);
    setLastAnswer(null);
    setCurrentIndex((v) => v + 1);
    setTimeLeft(TIMER_SECONDS);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (isFinished || showFeedback) return;
    if (timeLeft <= 0) {
      // Time's up — record null (no answer)
      setSelectedAnswers((a) => [...a, null]);
      setLastAnswer(null);
      setShowFeedback(true);
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, isFinished, showFeedback]);

  // Auto-advance after feedback
  useEffect(() => {
    if (!showFeedback) return;
    const timeout = setTimeout(advanceQuestion, 1500);
    return () => clearTimeout(timeout);
  }, [showFeedback, advanceQuestion]);

  const handleAnswer = (answerIndex: number) => {
    if (showFeedback) return;
    setSelectedAnswers((a) => [...a, answerIndex]);
    setLastAnswer(answerIndex);
    setShowFeedback(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setCurrentIndex(0);
    setTimeLeft(TIMER_SECONDS);
    setShowFeedback(false);
    setLastAnswer(null);
  };

  /* ─── Result screen ─── */
  if (isFinished) {
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="rounded-2xl p-8 text-center gradient-hero shadow-button-primary text-primary-foreground">
          <Trophy className="w-14 h-14 mx-auto mb-4 animate-bounce" />
          <h1 className="text-3xl font-black">Kahoot Sonucu</h1>
          <p className="mt-3 text-lg font-bold">
            {correctAnswers}/{totalQuestions} doğru cevap
          </p>
          <p className="text-5xl font-black mt-2">%{scorePercent}</p>
          <p className="text-sm mt-2 opacity-80">
            {scorePercent >= 80
              ? "Muhteşem! 🎉"
              : scorePercent >= 50
                ? "İyi gidiyorsun! 💪"
                : "Biraz daha çalışmalısın 📚"}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-5">
          <button
            onClick={resetQuiz}
            className="gradient-sky shadow-button-sky rounded-2xl p-4 font-extrabold text-primary-foreground text-lg active:translate-y-1 transition-transform"
          >
            🔄 Tekrar Oyna
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground active:translate-y-1 transition-transform"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  /* ─── Quiz screen ─── */
  const isCorrectAnswer = lastAnswer === currentQuestion.correctIndex;
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerUrgent = timeLeft <= 3;

  return (
    <div className="pb-20 px-4 py-4 max-w-lg mx-auto flex flex-col gap-3 min-h-[calc(100dvh-5rem)]">
      {/* Top bar: question count + timer */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
          <span>
            Soru {currentIndex + 1}/{totalQuestions}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-lg font-black transition-colors ${
              timerUrgent ? "text-flamingo animate-pulse" : "text-foreground"
            }`}
          >
            <Zap className="w-4 h-4" />
            {timeLeft}s
          </span>
        </div>
        {/* Timer bar */}
        <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-linear ${
              timerUrgent ? "bg-flamingo" : "bg-sky-brand"
            }`}
            style={{ width: `${timerPercent}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className="bg-card rounded-2xl p-6 shadow-card flex-shrink-0"
        key={currentQuestion.id}
      >
        <h1 className="text-xl font-black text-foreground leading-snug animate-in fade-in duration-300">
          {currentQuestion.question}
        </h1>
      </div>

      {/* Feedback overlay */}
      {showFeedback && (
        <div
          className={`rounded-2xl p-4 text-center font-black text-lg text-primary-foreground animate-in zoom-in-95 duration-200 ${
            lastAnswer === null
              ? "bg-muted-foreground"
              : isCorrectAnswer
                ? "bg-success"
                : "bg-flamingo"
          }`}
        >
          {lastAnswer === null ? (
            "⏰ Süre doldu!"
          ) : isCorrectAnswer ? (
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6" /> Doğru!
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <XCircle className="w-6 h-6" /> Yanlış!
              <span className="font-semibold text-sm opacity-90 ml-1">
                Doğrusu: {currentQuestion.options[currentQuestion.correctIndex]}
              </span>
            </span>
          )}
        </div>
      )}

      {/* Answer grid — 2x2 Kahoot style */}
      <div className="grid grid-cols-2 gap-3 flex-1">
        {currentQuestion.options.map((option, i) => {
          const isSelected = lastAnswer === i;
          const isCorrect = currentQuestion.correctIndex === i;
          const dimmed = showFeedback && !isSelected && !isCorrect;
          const highlighted = showFeedback && isCorrect;

          return (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showFeedback}
              className={`
                ${OPTION_COLORS[i]} rounded-2xl p-4 flex flex-col items-center justify-center gap-2
                text-primary-foreground font-bold text-sm shadow-lg
                transition-all duration-200 min-h-[5rem]
                ${dimmed ? "opacity-30 scale-95" : ""}
                ${highlighted ? "ring-4 ring-primary-foreground scale-105" : ""}
                ${!showFeedback ? "active:scale-95 active:opacity-90 hover:brightness-110" : ""}
              `}
            >
              <span className="text-2xl leading-none">{OPTION_SHAPES[i]}</span>
              <span className="text-center leading-tight">{option}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
