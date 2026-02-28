import { useEffect, useMemo, useState } from "react";
import type { TranslationExercise } from "../../data/lessons";
import { ArrowRight } from "lucide-react";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: TranslationExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

type DragSource = "bank" | "answer";

interface DragState {
  source: DragSource;
  index: number;
}

const normalizeSentence = (sentence: string) => sentence.replace(/\s+/g, " ").trim();

const shuffleWords = (words: string[]) => {
  const shuffled = [...words];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function TranslationEx({ exercise, onAnswer, answered }: Props) {
  const [input, setInput] = useState("");
  const [bankWords, setBankWords] = useState<string[]>([]);
  const [answerWords, setAnswerWords] = useState<string[]>([]);
  const [dragState, setDragState] = useState<DragState | null>(null);

  const isWordBuilderMode = exercise.direction === "tr-ro";

  useEffect(() => {
    setInput("");
    if (!isWordBuilderMode) {
      setBankWords([]);
      setAnswerWords([]);
      setDragState(null);
      return;
    }

    const words = normalizeSentence(exercise.correctAnswer).split(" ");
    setBankWords(shuffleWords(words));
    setAnswerWords([]);
    setDragState(null);
  }, [exercise, isWordBuilderMode]);

  const textInputCorrect = exercise.acceptedAnswers.some((a) =>
    matchesWithOneLetterTolerancePerWord(input.trim(), a)
  );

  const builtSentence = useMemo(() => normalizeSentence(answerWords.join(" ")), [answerWords]);
  const wordBuilderCorrect = matchesWithOneLetterTolerancePerWord(
    builtSentence,
    normalizeSentence(exercise.correctAnswer)
  );

  const moveWord = (from: DragSource, fromIndex: number, to: DragSource, toIndex?: number) => {
    if (answered || !isWordBuilderMode) return;

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

  const handleSubmit = () => {
    if (answered) return;

    if (isWordBuilderMode) {
      if (answerWords.length !== normalizeSentence(exercise.correctAnswer).split(" ").length) return;
      onAnswer(wordBuilderCorrect);
      return;
    }

    if (!input.trim()) return;
    onAnswer(textInputCorrect);
  };

  return (
    <div>
      <div className="bg-card rounded-2xl p-6 shadow-card mb-6">
        <p className="text-xl font-black text-foreground">"{exercise.sentence}"</p>
      </div>

      {isWordBuilderMode ? (
        <>
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
            <p className="text-[11px] font-bold text-muted-foreground mb-2 uppercase">Karışık Rumence kelimeler</p>
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
            onClick={handleSubmit}
            disabled={answered || answerWords.length !== normalizeSentence(exercise.correctAnswer).split(" ").length}
            className="w-full mt-4 p-3 rounded-2xl font-extrabold text-sm bg-sky text-secondary-foreground disabled:opacity-40"
          >
            Kontrol et
          </button>
        </>
      ) : (
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={answered}
            placeholder="Çeviriyi yaz..."
            className={`w-full p-4 rounded-2xl border-2 font-bold text-foreground bg-card outline-none transition-all ${
              !answered
                ? "border-border focus:border-sky"
                : textInputCorrect
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
      )}

      {answered && (!isWordBuilderMode ? !textInputCorrect : !wordBuilderCorrect) && (
        <div className="mt-3 p-3 bg-card rounded-xl border border-border">
          <span className="text-xs font-bold text-muted-foreground">Doğru cevap: </span>
          <span className="text-sm font-extrabold text-success">{exercise.correctAnswer}</span>
        </div>
      )}
    </div>
  );
}
