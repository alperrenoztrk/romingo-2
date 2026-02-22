import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock3, Trophy } from "lucide-react";

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "'Good morning' ifadesinin Türkçe karşılığı nedir?",
    options: ["İyi geceler", "Günaydın", "Hoşça kal", "İyi akşamlar"],
    correctIndex: 1,
  },
  {
    id: 2,
    question: "'Book' kelimesinin doğru anlamı hangisidir?",
    options: ["Kalem", "Defter", "Kitap", "Masa"],
    correctIndex: 2,
  },
  {
    id: 3,
    question: "'I am learning English.' cümlesinin en doğru çevirisi nedir?",
    options: ["İngilizce öğretiyorum.", "İngilizce öğreniyorum.", "İngilizce konuşmuyorum.", "İngilizce çalıştım."],
    correctIndex: 1,
  },
  {
    id: 4,
    question: "'Apple' kelimesi hangisini ifade eder?",
    options: ["Armut", "Portakal", "Elma", "Muz"],
    correctIndex: 2,
  },
  {
    id: 5,
    question: "'See you later' için en uygun Türkçe seçenek hangisidir?",
    options: ["Sonra görüşürüz", "Hemen gel", "Tekrar dene", "Memnun oldum"],
    correctIndex: 0,
  },
];

export default function KahootPage() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const isFinished = currentIndex >= totalQuestions;
  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const correctAnswers = useMemo(
    () =>
      selectedAnswers.reduce((total, answer, questionIndex) => {
        const isCorrect = QUIZ_QUESTIONS[questionIndex]?.correctIndex === answer;
        return isCorrect ? total + 1 : total;
      }, 0),
    [selectedAnswers],
  );

  const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswers((currentAnswers) => [...currentAnswers, answerIndex]);
    setCurrentIndex((value) => value + 1);
  };

  const resetQuiz = () => {
    setSelectedAnswers([]);
    setCurrentIndex(0);
  };

  if (isFinished) {
    return (
      <div className="pb-20 px-4 py-6 max-w-lg mx-auto">
        <div className="rounded-2xl p-6 text-center gradient-hero shadow-button-primary text-primary-foreground">
          <Trophy className="w-10 h-10 mx-auto mb-3" />
          <h1 className="text-2xl font-black">Kahoot Sonucu</h1>
          <p className="mt-2 text-sm font-semibold">{correctAnswers}/{totalQuestions} doğru cevap</p>
          <p className="mt-1 text-sm font-semibold">Skor: %{scorePercent}</p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-4">
          <button
            onClick={resetQuiz}
            className="gradient-sky shadow-button-sky rounded-2xl p-4 font-extrabold text-primary-foreground"
          >
            Tekrar Oyna
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-card rounded-2xl p-4 shadow-card font-extrabold text-foreground"
          >
            Anasayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 px-4 py-6 max-w-lg mx-auto space-y-4">
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
          <span>Soru {currentIndex + 1}/{totalQuestions}</span>
          <span className="inline-flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" />Hızlı mod</span>
        </div>
        <div className="h-2 rounded-full bg-muted mt-3 overflow-hidden">
          <div
            className="h-full gradient-hero rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-card rounded-2xl p-5 shadow-card">
        <h1 className="text-lg font-black text-foreground leading-snug">{currentQuestion.question}</h1>
        <p className="text-xs text-muted-foreground font-semibold mt-2">Kahoot tarzı hızlı seçim: doğru cevabı yakala!</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {currentQuestion.options.map((option, optionIndex) => (
          <button
            key={option}
            onClick={() => handleAnswer(optionIndex)}
            className="rounded-2xl border border-border bg-card p-4 text-left font-bold text-foreground shadow-card active:translate-y-1 transition-all"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-flamingo" />
              {option}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
