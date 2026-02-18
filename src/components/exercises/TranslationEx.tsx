import { useState } from "react";
import type { TranslationExercise } from "../../data/lessons";
import { ArrowRight, Languages } from "lucide-react";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: TranslationExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function TranslationEx({ exercise, onAnswer, answered }: Props) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (answered || !input.trim()) return;
    const isCorrect = exercise.acceptedAnswers.some(
      (a) => matchesWithOneLetterTolerancePerWord(input.trim(), a)
    );
    onAnswer(isCorrect);
  };

  const dirLabel = exercise.direction === "ro-tr" ? "Romence → Türkçe" : "Türkçe → Romence";
  const targetLangLabel = exercise.direction === "ro-tr" ? "Türkçe" : "Romence";
  const sourceLangLabel = exercise.direction === "ro-tr" ? "Romence" : "Türkçe";

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-5 h-5 text-sky-brand" />
        <span className="text-sm font-bold text-muted-foreground">{dirLabel}</span>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
        <p className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wide">{sourceLangLabel}</p>
        <p className="text-xl font-black text-foreground">"{exercise.sentence}"</p>
      </div>

      <p className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">{targetLangLabel} çevirisi</p>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={answered}
          placeholder={`${targetLangLabel} çevirisini yaz...`}
          className={`w-full p-4 rounded-2xl border-2 font-bold text-foreground bg-card outline-none transition-all ${
            !answered
              ? "border-border focus:border-sky"
            : exercise.acceptedAnswers.some(
                  (a) => matchesWithOneLetterTolerancePerWord(input.trim(), a)
                )
              ? "border-success bg-success-light"
              : "border-flamingo bg-flamingo-light"
          }`}
        />

        {!answered && (
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-sky flex items-center justify-center text-secondary-foreground disabled:opacity-30 transition-opacity"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {answered && !exercise.acceptedAnswers.some(
        (a) => matchesWithOneLetterTolerancePerWord(input.trim(), a)
      ) && (
        <div className="mt-3 p-3 bg-card rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground">Doğru cevap: </span>
          <span className="text-sm font-extrabold text-success">{exercise.correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
