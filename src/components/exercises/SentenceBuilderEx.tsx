import { useEffect, useMemo, useState } from "react";
import type { SentenceBuilderExercise } from "../../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: SentenceBuilderExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
  showHint?: boolean;
}

type DragSource = "bank" | "answer";

interface DragState {
  source: DragSource;
  index: number;
}

const normalizeSentence = (sentence: string) => sentence.replace(/\s+/g, " ").trim();

export default function SentenceBuilderEx({ exercise, onAnswer, answered, showHint = false }: Props) {
  const [bankWords, setBankWords] = useState<string[]>(exercise.words);
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  const [dragState, setDragState] = useState<DragState | null>(null);

  useEffect(() => {
    setBankWords(exercise.words);
    setAnswerWords([]);
    setDragState(null);
  }, [exercise]);

  const builtSentence = useMemo(() => normalizeSentence(answerWords.join(" ")), [answerWords]);
  const isCorrect = matchesWithOneLetterTolerancePerWord(builtSentence, normalizeSentence(exercise.correctSentence));

  const moveWord = (from: DragSource, fromIndex: number, to: DragSource, toIndex?: number) => {
    if (answered) return;

    const nextBank = [...bankWords];
    const nextAnswer = [...answerWords];

    const sourceList = from === "bank" ? nextBank : nextAnswer;
    const targetList = to === "bank" ? nextBank : nextAnswer;

    const [word] = sourceList.splice(fromIndex, 1);
    if (!word) return;

    const insertAt = typeof toIndex === "number" ? toIndex : targetList.length;
    targetList.splice(insertAt, 0, word);

    setBankWords(nextBank);
    setAnswerWords(nextAnswer);
  };

  const handleCheck = () => {
    if (answered || answerWords.length !== exercise.words.length) return;
    onAnswer(isCorrect);
  };

  return (
    <div>
      {showHint && exercise.hint && <p className="text-xs font-semibold text-muted-foreground mb-3">💡 İpucu: {exercise.hint}</p>}

      <div
        className="min-h-20 rounded-2xl border-2 border-dashed border-sky/40 bg-sky-light/30 p-3 mb-4"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => {
          if (!dragState) return;
          moveWord(dragState.source, dragState.index, "answer");
          setDragState(null);
        }}
      >
        <p className="text-[11px] font-bold text-muted-foreground mb-2 uppercase">Cümle alanı</p>
        <div className="flex flex-wrap gap-2">
          {answerWords.length === 0 && <span className="text-sm text-muted-foreground">Kelimeleri buraya sürükle</span>}
          {answerWords.map((word, index) => (
            <button
              key={`${word}-${index}-answer`}
              type="button"
              draggable={!answered}
              onDragStart={() => setDragState({ source: "answer", index })}
              onDragEnd={() => setDragState(null)}
              onClick={() => moveWord("answer", index, "bank")}
              className="px-3 py-1.5 rounded-xl bg-sky text-secondary-foreground font-extrabold"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div
        className="min-h-20 rounded-2xl border border-border bg-card p-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={() => {
          if (!dragState) return;
          moveWord(dragState.source, dragState.index, "bank");
          setDragState(null);
        }}
      >
        <p className="text-[11px] font-bold text-muted-foreground mb-2 uppercase">Kelime havuzu</p>
        <div className="flex flex-wrap gap-2">
          {bankWords.map((word, index) => (
            <button
              key={`${word}-${index}-bank`}
              type="button"
              draggable={!answered}
              onDragStart={() => setDragState({ source: "bank", index })}
              onDragEnd={() => setDragState(null)}
              onClick={() => moveWord("bank", index, "answer")}
              className="px-3 py-1.5 rounded-xl bg-muted text-foreground font-bold"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={answered || answerWords.length !== exercise.words.length}
        className="w-full mt-4 p-3 rounded-2xl font-extrabold text-sm bg-sky text-secondary-foreground disabled:opacity-40"
      >
        Kontrol et
      </button>

      {answered && !isCorrect && (
        <div className="mt-3 p-3 bg-card rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground">Doğru sıra: </span>
          <span className="text-sm font-extrabold text-success">{exercise.correctSentence}</span>
        </div>
      )}
    </div>
  );
}
