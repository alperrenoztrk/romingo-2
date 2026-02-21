import { useEffect, useMemo, useState } from "react";
import type { WordOrderExercise } from "../../data/lessons";

interface Props {
  exercise: WordOrderExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

function normalizeSentence(input: string) {
  return input
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("tr-TR");
}

export default function WordOrderEx({ exercise, onAnswer, answered }: Props) {
  const [orderedWords, setOrderedWords] = useState<string[]>(() => [...exercise.words].sort(() => Math.random() - 0.5));
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrderedWords([...exercise.words].sort(() => Math.random() - 0.5));
    setDraggedIndex(null);
  }, [exercise]);

  const currentSentence = orderedWords.join(" ");
  const isCorrect = useMemo(
    () => normalizeSentence(currentSentence) === normalizeSentence(exercise.correctSentence),
    [currentSentence, exercise.correctSentence]
  );

  const handleDrop = (targetIndex: number) => {
    if (answered || draggedIndex === null || draggedIndex === targetIndex) return;

    setOrderedWords((prev) => {
      const next = [...prev];
      const [draggedWord] = next.splice(draggedIndex, 1);
      next.splice(targetIndex, 0, draggedWord);
      return next;
    });
    setDraggedIndex(null);
  };

  const handleCheck = () => {
    if (answered) return;
    onAnswer(isCorrect);
  };

  return (
    <div>
      <h2 className="text-lg font-black text-foreground mb-2">Kelime sırasını düzenle</h2>
      <p className="text-sm font-semibold text-muted-foreground mb-5">{exercise.prompt}</p>

      <div className="bg-card rounded-2xl p-4 shadow-card mb-6 min-h-24 border-2 border-border">
        <div className="flex flex-wrap gap-2">
          {orderedWords.map((word, index) => (
            <button
              key={`${word}-${index}`}
              type="button"
              draggable={!answered}
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDrop(index)}
              disabled={answered}
              className={`px-3 py-2 rounded-xl border-2 font-bold text-sm transition-all ${
                answered
                  ? isCorrect
                    ? "bg-success-light border-success text-success"
                    : "bg-flamingo-light border-flamingo text-flamingo"
                  : "bg-muted/40 border-border text-foreground cursor-grab active:cursor-grabbing"
              }`}
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {exercise.hint && <p className="text-xs font-semibold text-muted-foreground mb-3">💡 İpucu: {exercise.hint}</p>}

      {!answered && (
        <button
          type="button"
          onClick={handleCheck}
          className="w-full rounded-2xl bg-sky text-secondary-foreground font-black py-3 disabled:opacity-50"
        >
          Kontrol Et
        </button>
      )}

      {answered && !isCorrect && (
        <div className="mt-3 p-3 bg-card rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground">Doğru cümle: </span>
          <span className="text-sm font-extrabold text-success">{exercise.correctSentence}</span>
        </div>
      )}
    </div>
  );
}
