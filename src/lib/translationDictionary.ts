import { lessonsData, type Exercise, type LessonData } from "../data/lessons";
import { matchesWithOneLetterTolerancePerWord } from "./answerTolerance";

export type TranslationDirection = "tr-ro" | "ro-tr";

const NOT_FOUND_MESSAGE =
  "Bu ifade sözlükte henüz yok. Yeni kelimeler eklendikçe çeviri kalitesi artacak.";

const QUESTION_IN_QUOTES_REGEX = /"([^"]+)"/;

const normalizeLookupKey = (value: string, locale: string) =>
  value
    .trim()
    .toLocaleLowerCase(locale)
    .replace(/[?.!,]/g, "")
    .replace(/\s+/g, " ");

const addPair = (trToRo: Map<string, string>, roToTr: Map<string, string>, tr: string, ro: string) => {
  const normalizedTr = normalizeLookupKey(tr, "tr-TR");
  const normalizedRo = normalizeLookupKey(ro, "ro-RO");

  if (!normalizedTr || !normalizedRo) return;

  if (!trToRo.has(normalizedTr)) {
    trToRo.set(normalizedTr, ro.trim());
  }

  if (!roToTr.has(normalizedRo)) {
    roToTr.set(normalizedRo, tr.trim());
  }
};

function hydrateFromExercise(
  exercise: Exercise,
  trToRo: Map<string, string>,
  roToTr: Map<string, string>,
) {
  if (exercise.type === "translation") {
    if (exercise.direction === "tr-ro") {
      addPair(trToRo, roToTr, exercise.sentence, exercise.correctAnswer);
      exercise.acceptedAnswers.forEach((accepted) => addPair(trToRo, roToTr, exercise.sentence, accepted));
    } else {
      addPair(trToRo, roToTr, exercise.correctAnswer, exercise.sentence);
      exercise.acceptedAnswers.forEach((accepted) => addPair(trToRo, roToTr, accepted, exercise.sentence));
    }
    return;
  }

  if (exercise.type === "matching") {
    exercise.pairs.forEach((pair) => addPair(trToRo, roToTr, pair.left, pair.right));
    return;
  }

  if (exercise.type === "listening") {
    const correctOption = exercise.options[exercise.correctIndex];
    if (correctOption) addPair(trToRo, roToTr, correctOption, exercise.word);
    return;
  }

  if (exercise.type === "multiple_choice" && /ne demek\?/i.test(exercise.question)) {
    const sourcePhrase = exercise.question.match(QUESTION_IN_QUOTES_REGEX)?.[1];
    const translatedPhrase = exercise.options[exercise.correctIndex];
    if (sourcePhrase && translatedPhrase) {
      addPair(trToRo, roToTr, translatedPhrase, sourcePhrase);
    }
  }
}

function buildDictionaries(data: Record<string, LessonData>) {
  const trToRo = new Map<string, string>();
  const roToTr = new Map<string, string>();

  Object.values(data).forEach((lesson) => {
    lesson.exercises.forEach((exercise) => hydrateFromExercise(exercise, trToRo, roToTr));
  });

  return { trToRo, roToTr };
}

const dictionaries = buildDictionaries(lessonsData);

export function translateWithTolerance(input: string, direction: TranslationDirection) {
  const locale = direction === "tr-ro" ? "tr-TR" : "ro-RO";
  const normalizedInput = normalizeLookupKey(input, locale);

  if (!normalizedInput) return "";

  const dictionary = direction === "tr-ro" ? dictionaries.trToRo : dictionaries.roToTr;
  const exactMatch = dictionary.get(normalizedInput);
  if (exactMatch) return exactMatch;

  for (const [entry, translation] of dictionary.entries()) {
    if (matchesWithOneLetterTolerancePerWord(normalizedInput, entry)) {
      return translation;
    }
  }

  return NOT_FOUND_MESSAGE;
}

export const translationDictionaryStats = {
  trToRoSize: dictionaries.trToRo.size,
  roToTrSize: dictionaries.roToTr.size,
};
