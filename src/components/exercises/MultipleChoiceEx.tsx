import { useState } from "react";
import type { MultipleChoiceExercise } from "../../data/lessons";

interface Props {
  exercise: MultipleChoiceExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function MultipleChoiceEx({ exercise, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correctIndex);
  };

  return (
    <div>
      <div className="space-y-3">
        {exercise.options.map((option, i) => {
          let style = "bg-card border-2 border-border text-foreground hover:border-sky hover:bg-sky-light";

          if (answered && i === exercise.correctIndex) {
            style = "bg-success-light border-2 border-success text-success";
          } else if (answered && i === selected && i !== exercise.correctIndex) {
            style = "bg-flamingo-light border-2 border-flamingo text-flamingo";
          } else if (!answered && i === selected) {
            style = "bg-sky-light border-2 border-sky text-sky-brand";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              className={`w-full p-4 rounded-2xl font-bold text-left transition-all ${style}`}
            >
              <span className="text-sm font-extrabold mr-3 opacity-50">{i + 1}</span>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
