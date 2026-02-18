import { useEffect, useMemo, useState } from "react";
import type { SentenceBuilderExercise } from "../../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: SentenceBuilderExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function SentenceBuilderEx({ exercise, onAnswer, answered }: Props) {
  const [selectedWordIndexes, setSelectedWordIndexes] = useState<number[]>([]);
  const [lastSubmitted, setLastSubmitted] = useState<string | null>(null);

  useEffect(() => {
    setSelectedWordIndexes([]);
    setLastSubmitted(null);
  }, [exercise.correctAnswer]);

  const selectedSentence = useMemo(
    () => selectedWordIndexes.map((index) => exercise.words[index]).join(" ").trim(),
    [exercise.words, selectedWordIndexes],
  );

  const shuffledWordIndexes = useMemo(() => {
    const indexes = exercise.words.map((_, index) => index);

    for (let i = indexes.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[randomIndex]] = [indexes[randomIndex], indexes[i]];
    }

    return indexes;
  }, [exercise.words]);

  const availableWordIndexes = useMemo(() => {
    const selectedSet = new Set(selectedWordIndexes);
    return shuffledWordIndexes.filter((index) => !selectedSet.has(index));
  }, [selectedWordIndexes, shuffledWordIndexes]);

  const handleWordSelect = (index: number) => {
    if (answered) return;
    setSelectedWordIndexes((prev) => [...prev, index]);
  };

  const handleWordRemove = (position: number) => {
    if (answered) return;
    setSelectedWordIndexes((prev) => prev.filter((_, index) => index !== position));
  };

  const handleSubmit = () => {
    if (answered || selectedWordIndexes.length === 0) {
      return;
    }

    const normalizedAcceptedAnswers = [exercise.correctAnswer, ...exercise.acceptedAnswers];
    const isCorrect = normalizedAcceptedAnswers.some((answer) =>
      matchesWithOneLetterTolerancePerWord(selectedSentence, answer),
    );

    setLastSubmitted(selectedSentence);
    onAnswer(isCorrect);
  };

  return (
    <div>
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6 space-y-4">
        <p className="text-lg font-bold text-foreground leading-relaxed">{exercise.prompt}</p>

        <div
          className={`min-h-[72px] rounded-xl border-2 p-3 flex flex-wrap gap-2 ${
            !answered
              ? "border-border bg-background"
              : lastSubmitted &&
                [exercise.correctAnswer, ...exercise.acceptedAnswers].some((answer) =>
                  matchesWithOneLetterTolerancePerWord(lastSubmitted, answer),
                )
              ? "border-success bg-success-light"
              : "border-flamingo bg-flamingo-light"
          }`}
        >
          {selectedWordIndexes.length === 0 && (
            <span className="text-sm font-semibold text-muted-foreground">Kelime seçerek cümleyi oluştur</span>
          )}

          {selectedWordIndexes.map((wordIndex, position) => (
            <button
              key={`${wordIndex}-${position}`}
              onClick={() => handleWordRemove(position)}
              disabled={answered}
              className="px-3 py-1.5 rounded-lg bg-sky-light text-sky-brand font-bold text-sm"
            >
              {exercise.words[wordIndex]}
            </button>
          ))}
        </div>
      </div>

      {exercise.hint && <p className="text-xs font-semibold text-muted-foreground mb-3">💡 İpucu: {exercise.hint}</p>}

      <div className="flex flex-wrap gap-2 mb-5">
        {availableWordIndexes.map((index) => (
          <button
            key={index}
            onClick={() => handleWordSelect(index)}
            disabled={answered}
            className="px-3 py-2 rounded-xl border-2 border-border bg-card text-sm font-bold hover:border-sky transition-colors"
          >
            {exercise.words[index]}
          </button>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={answered || selectedWordIndexes.length === 0}
        className="w-full rounded-2xl py-3 font-extrabold bg-sky text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Kontrol et
      </button>
    </div>
  );
}
