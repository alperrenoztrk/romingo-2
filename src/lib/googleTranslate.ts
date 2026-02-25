import { translateWithTolerance, type TranslationDirection } from "./translationDictionary";
import {
  BLOCKED_TRANSLATION_MESSAGE,
  containsBlockedContent,
} from "./profanityFilter";

const GOOGLE_TRANSLATE_BASE_URL = "https://translate.googleapis.com/translate_a/single";

function getLanguagePair(direction: TranslationDirection) {
  return direction === "tr-ro"
    ? { sourceLanguage: "tr", targetLanguage: "ro" }
    : { sourceLanguage: "ro", targetLanguage: "tr" };
}

function parseGoogleTranslateResponse(payload: unknown) {
  if (!Array.isArray(payload) || !Array.isArray(payload[0])) return null;

  const segments = payload[0] as unknown[];
  const translatedText = segments
    .map((segment) => (Array.isArray(segment) ? segment[0] : ""))
    .filter((value): value is string => typeof value === "string")
    .join("")
    .trim();

  return translatedText || null;
}

export async function translateWithGoogle(input: string, direction: TranslationDirection) {
  const trimmedInput = input.trim();
  if (!trimmedInput) return "";
  if (containsBlockedContent(trimmedInput)) return BLOCKED_TRANSLATION_MESSAGE;

  const { sourceLanguage, targetLanguage } = getLanguagePair(direction);
  const params = new URLSearchParams({
    client: "gtx",
    sl: sourceLanguage,
    tl: targetLanguage,
    dt: "t",
    q: trimmedInput,
  });

  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error(`Google Translate error: ${response.status}`);

    const payload = (await response.json()) as unknown;
    const translatedText = parseGoogleTranslateResponse(payload);
    if (translatedText) {
      return containsBlockedContent(translatedText) ? BLOCKED_TRANSLATION_MESSAGE : translatedText;
    }
  } catch {
    // Local sözlük yedek olarak çalışmaya devam eder.
  }

  const fallbackTranslation = translateWithTolerance(trimmedInput, direction);
  return containsBlockedContent(fallbackTranslation)
    ? BLOCKED_TRANSLATION_MESSAGE
    : fallbackTranslation;
}
