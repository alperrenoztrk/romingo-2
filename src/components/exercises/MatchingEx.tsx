import { useState, useEffect } from "react";
import type { MatchingExercise } from "../../data/lessons";

interface Props {
  exercise: MatchingExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function MatchingEx({ exercise, onAnswer, answered }: Props) {
  const [shuffledRight, setShuffledRight] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ left: number; right: number } | null>(null);

  useEffect(() => {
    const shuffled = [...exercise.pairs.map((p) => p.right)].sort(() => Math.random() - 0.5);
    setShuffledRight(shuffled);
  }, [exercise]);

  useEffect(() => {
    if (selectedLeft !== null && selectedRight !== null) {
      const leftWord = exercise.pairs[selectedLeft].right;
      const rightWord = shuffledRight[selectedRight];

      if (leftWord === rightWord) {
        const newMatched = new Set(matched);
        newMatched.add(selectedLeft);
        setMatched(newMatched);
        setSelectedLeft(null);
        setSelectedRight(null);

        if (newMatched.size === exercise.pairs.length) {
          onAnswer(true);
        }
      } else {
        setWrongPair({ left: selectedLeft, right: selectedRight });
        setTimeout(() => {
          setWrongPair(null);
          setSelectedLeft(null);
          setSelectedRight(null);
        }, 600);
      }
    }
  }, [selectedLeft, selectedRight]);

  const isLeftMatched = (i: number) => matched.has(i);
  const isRightMatched = (i: number) => {
    const rightWord = shuffledRight[i];
    return [...matched].some((m) => exercise.pairs[m].right === rightWord);
  };

  return (
    <div>
      <div className="flex gap-3">
        {/* Left column */}
        <div className="flex-1 space-y-3">
          {exercise.pairs.map((pair, i) => {
            const isMatched = isLeftMatched(i);
            const isSelected = selectedLeft === i;
            const isWrong = wrongPair?.left === i;

            return (
              <button
                key={i}
                onClick={() => !isMatched && !answered && setSelectedLeft(i)}
                disabled={isMatched || answered}
                className={`w-full p-3 rounded-2xl font-bold text-sm text-center transition-all border-2 ${
                  isMatched
                    ? "bg-success-light border-success text-success opacity-60"
                    : isWrong
                    ? "bg-flamingo-light border-flamingo text-flamingo animate-[shake_0.3s]"
                    : isSelected
                    ? "bg-sky-light border-sky text-sky-brand"
                    : "bg-card border-border text-foreground hover:border-sky"
                }`}
              >
                {pair.left}
              </button>
            );
          })}
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-3">
          {shuffledRight.map((word, i) => {
            const isMatched = isRightMatched(i);
            const isSelected = selectedRight === i;
            const isWrong = wrongPair?.right === i;

            return (
              <button
                key={i}
                onClick={() => !isMatched && !answered && setSelectedRight(i)}
                disabled={isMatched || answered}
                className={`w-full p-3 rounded-2xl font-bold text-sm text-center transition-all border-2 ${
                  isMatched
                    ? "bg-success-light border-success text-success opacity-60"
                    : isWrong
                    ? "bg-flamingo-light border-flamingo text-flamingo"
                    : isSelected
                    ? "bg-sky-light border-sky text-sky-brand"
                    : "bg-card border-border text-foreground hover:border-sky"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
