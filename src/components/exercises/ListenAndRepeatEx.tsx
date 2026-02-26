import { useMemo, useState } from "react";
import { Mic, Volume2 } from "lucide-react";
import type { ListenAndRepeatExercise } from "../../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "../../lib/answerTolerance";

interface Props {
  exercise: ListenAndRepeatExercise;
  onAnswer: (correct: boolean) => void;
  answered: boolean;
}

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
};
type SpeechRecognitionCtor = new () => BrowserSpeechRecognition;

declare global {
  interface Window {
    webkitSpeechRecognition?: SpeechRecognitionCtor;
    SpeechRecognition?: SpeechRecognitionCtor;
  }
}

function normalizeSpeech(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export function isAcceptedSpeechAnswer(input: string, acceptedAnswers: string[]) {
  return acceptedAnswers.some((acceptedAnswer) => {
    if (acceptedAnswer === input) {
      return true;
    }

    if (matchesWithOneLetterTolerancePerWord(input, acceptedAnswer)) {
      return true;
    }

    if (input.length < 6 || acceptedAnswer.length < 6) {
      return false;
    }

    return input.includes(acceptedAnswer) || acceptedAnswer.includes(input);
  });
}

export default function ListenAndRepeatEx({ exercise, onAnswer, answered }: Props) {
  const [recognizedText, setRecognizedText] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const speechRecognitionSupported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
  }, []);

  const playAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(exercise.phrase);
    utterance.lang = "ro-RO";
    utterance.rate = 0.87;
    window.speechSynthesis.speak(utterance);
  };

  const checkAnswer = (value: string) => {
    if (answered) return;

    const normalizedValue = normalizeSpeech(value);
    const isCorrect = isAcceptedSpeechAnswer(normalizedValue, exercise.acceptedAnswers);
    onAnswer(isCorrect);
  };

  const startRecording = () => {
    if (answered || !speechRecognitionSupported) return;

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) return;

    const recognition = new SpeechRecognitionClass();
    recognition.lang = "ro-RO";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsRecording(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      setRecognizedText(transcript);
      checkAnswer(transcript);
    };

    recognition.onerror = () => {
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  return (
    <div>
      <button
        type="button"
        onClick={playAudio}
        className="mb-4 w-full rounded-2xl border-2 border-border bg-card p-5 text-left hover:border-sky transition-colors"
      >
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase text-muted-foreground">Dinle ve tekrar et</p>
            <p className="text-sm font-semibold text-foreground mt-1">Romence cümleyi dinle, sonra yüksek sesle söyle.</p>
            {exercise.hint && <p className="text-xs text-muted-foreground mt-2">{exercise.hint}</p>}
          </div>
          <div className="w-12 h-12 rounded-full bg-sky-light text-sky-brand flex items-center justify-center shrink-0">
            <Volume2 className="w-6 h-6" />
          </div>
        </div>
      </button>

      <button
        type="button"
        onClick={startRecording}
        disabled={answered || !speechRecognitionSupported || isRecording}
        className="w-full rounded-2xl border-2 border-border bg-card p-4 text-left hover:border-success transition-colors disabled:opacity-60"
      >
        <div className="flex items-center gap-3">
          <span className={`w-10 h-10 rounded-full flex items-center justify-center ${isRecording ? "bg-flamingo-light text-flamingo" : "bg-success-light text-success"}`}>
            <Mic className="w-5 h-5" />
          </span>
          <span className="font-bold text-foreground">
            {isRecording ? "Dinleniyor..." : speechRecognitionSupported ? "Mikrofonu aç ve tekrar et" : "Mikrofon desteklenmiyor"}
          </span>
        </div>
      </button>

      {recognizedText && (
        <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-sm font-semibold text-foreground">
          Algılanan cevap: {recognizedText}
        </p>
      )}
    </div>
  );
}
