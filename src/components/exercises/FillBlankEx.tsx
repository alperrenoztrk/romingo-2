import { useState } from "react";
import type { FillBlankExercise } from "../../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: FillBlankExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function FillBlankEx({ exercise, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedIsCorrect =
    selected !== null &&
    matchesWithOneLetterTolerancePerWord(selected, exercise.correctAnswer);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    onAnswer(matchesWithOneLetterTolerancePerWord(option, exercise.correctAnswer));
  };

  // Split sentence at ___
  const parts = exercise.sentence.split("___");

  return (
    <div>
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
        <p className="text-lg font-bold text-foreground leading-relaxed">
          {parts[0]}
          <span
            className={`inline-block min-w-[80px] border-b-2 mx-1 px-2 py-0.5 font-extrabold text-center ${
              !selected
                ? "border-muted-foreground text-muted-foreground"
                : answered && selectedIsCorrect
                ? "border-success text-success bg-success-light rounded-lg"
                : answered
                ? "border-flamingo text-flamingo bg-flamingo-light rounded-lg"
                : "border-sky text-sky-brand bg-sky-light rounded-lg"
            }`}
          >
            {selected || "___"}
          </span>
          {parts[1]}
        </p>
      </div>

      {exercise.hint && (
        <p className="text-xs font-semibold text-muted-foreground mb-3">
          💡 İpucu: {exercise.hint}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map((option, i) => {
          let style = "bg-card border-2 border-border text-foreground hover:border-sky";

          if (answered && option === selected && selectedIsCorrect) {
            style = "bg-success-light border-2 border-success text-success";
          } else if (answered && option === selected && !selectedIsCorrect) {
            style = "bg-flamingo-light border-2 border-flamingo text-flamingo";
          } else if (!answered && option === selected) {
            style = "bg-sky-light border-2 border-sky text-sky-brand";
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`p-3 rounded-2xl font-bold text-center transition-all ${style}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
