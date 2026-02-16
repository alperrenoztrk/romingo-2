import { useState } from "react";
import { Volume2 } from "lucide-react";
import type { ListeningExercise } from "../../data/lessons";

interface Props {
  exercise: ListeningExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

export default function ListeningEx({ exercise, onAnswer, answered }: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  const playAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(exercise.word);
    utterance.lang = "ro-RO";
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (index: number) => {
    if (answered) return;
    setSelected(index);
    onAnswer(index === exercise.correctIndex);
  };

  return (
    <div>
      <h2 className="text-xl font-black text-foreground mb-4">Duyduğun kelimeyi seç</h2>

      <button
        type="button"
        onClick={playAudio}
        className="mb-6 w-full rounded-2xl border-2 border-border bg-card p-5 text-left hover:border-sky transition-colors"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Dinleme</p>
            <p className="text-sm font-semibold text-foreground mt-1">Sesi çal ve doğru kelimeyi işaretle.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-sky-light text-sky-brand flex items-center justify-center">
            <Volume2 className="w-6 h-6" />
          </div>
        </div>
      </button>

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
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
