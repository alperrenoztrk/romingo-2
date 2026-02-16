import { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { lessonsData } from "../data/lessons";
import { X, Heart, Check, ArrowRight } from "lucide-react";
import MultipleChoiceEx from "../components/exercises/MultipleChoiceEx";
import FillBlankEx from "../components/exercises/FillBlankEx";
import TranslationEx from "../components/exercises/TranslationEx";
import MatchingEx from "../components/exercises/MatchingEx";
import LessonComplete from "../components/LessonComplete";
import { addTodayProgress } from "../lib/weeklyProgress";
import { orderedLessonIds } from "../data/lessonCatalog";
import { getLessonProgress, isLessonUnlocked, saveLessonCompletion } from "../lib/lessonProgress";
import { addTodayCorrectAnswer } from "../lib/dailyGoals";
import { applyLessonCompletion } from "../lib/profileStats";

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const lesson = lessonsData[id || ""];
  const lessonId = id || "";
  const lessonProgress = getLessonProgress();
  const isUnlocked = isLessonUnlocked(lessonId, orderedLessonIds, lessonProgress);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [correctCount, setCorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const progressSavedRef = useRef(false);

  const handleAnswer = useCallback((correct: boolean) => {
    setAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setCorrectCount((c) => c + 1);
      addTodayCorrectAnswer();
    } else {
      setHearts((h) => Math.max(0, h - 1));
    }
  }, []);

  const handleNext = useCallback(() => {
    if (!lesson) return;
    if (currentIndex + 1 >= lesson.exercises.length || hearts <= 0) {
      if (!progressSavedRef.current && hearts > 0) {
        addTodayProgress(lesson.xpReward);
        const stars = hearts >= 4 ? 3 : hearts >= 2 ? 2 : 1;
        saveLessonCompletion(lesson.id, stars);
        applyLessonCompletion({ xpEarned: lesson.xpReward, heartsRemaining: hearts });
        progressSavedRef.current = true;
      }
      setCompleted(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setAnswered(false);
      setIsCorrect(false);
    }
  }, [currentIndex, hearts, lesson]);

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

  const exercises = lesson.exercises;
  const progress = (currentIndex / exercises.length) * 100;
  const currentExercise = exercises[currentIndex];

  if (completed) {
    const stars = hearts >= 4 ? 3 : hearts >= 2 ? 2 : hearts > 0 ? 1 : 0;
    const comboBonus = stars >= 3 ? 20 : stars >= 2 ? 10 : 0;
    const tomorrowGoal =
      stars >= 3
        ? "Yarın iki ders tamamlayarak serini büyüt."
        : "Yarın aynı konuyu tekrar edip 3 yıldızı hedefle.";

    return (
      <LessonComplete
        lesson={lesson}
        correctCount={correctCount}
        totalCount={exercises.length}
        stars={stars}
        xpEarned={lesson.xpReward}
        comboBonus={comboBonus}
        tomorrowGoal={tomorrowGoal}
        onContinue={() => navigate("/learn")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
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
        <div className="flex items-center gap-1">
          <Heart className="w-5 h-5 text-flamingo" fill="hsl(var(--flamingo))" />
          <span className="font-extrabold text-sm text-flamingo">{hearts}</span>
        </div>
      </div>

      {/* Exercise Content */}
      <div className="flex-1 flex flex-col max-w-lg mx-auto w-full px-4 py-6">
        <div className="text-xs font-bold text-muted-foreground mb-1 uppercase">
          {currentExercise.type === "multiple_choice" && "Doğru cevabı seç"}
          {currentExercise.type === "fill_blank" && "Boşluğu doldur"}
          {currentExercise.type === "translation" && "Çevir"}
          {currentExercise.type === "matching" && "Eşleştir"}
        </div>

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
        </div>
      </div>

      {/* Bottom Feedback Bar */}
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
                {isCorrect ? "Harika!" : "Yanlış cevap"}
              </span>
            </div>
            <button
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-2xl font-extrabold text-sm flex items-center gap-2 active:translate-y-0.5 transition-all ${
                isCorrect
                  ? "bg-success text-accent-foreground shadow-button-success active:shadow-none"
                  : "bg-flamingo text-primary-foreground shadow-button-primary active:shadow-none"
              }`}
            >
              Devam Et
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
