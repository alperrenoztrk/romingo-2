import { translateWithTolerance, type TranslationDirection } from "./translationDictionary";
import {
  BLOCKED_TRANSLATION_MESSAGE,
  containsBlockedContent,
} from "./profanityFilter";

const YANDEX_TRANSLATE_BASE_URL = "https://translate.yandex.net/api/v1/tr.json/translate";

function getLanguagePair(direction: TranslationDirection) {
  return direction === "tr-ro"
    ? { sourceLanguage: "tr", targetLanguage: "ro" }
    : { sourceLanguage: "ro", targetLanguage: "tr" };
}

function parseYandexTranslateResponse(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("text" in payload)) return null;

  const { text } = payload as { text?: unknown };
  if (!Array.isArray(text)) return null;

  const translatedText = text
    .filter((value): value is string => typeof value === "string")
    .join(" ")
    .trim();

  return translatedText || null;
}

export async function translateWithYandex(input: string, direction: TranslationDirection) {
  const trimmedInput = input.trim();
  if (!trimmedInput) return "";
  if (containsBlockedContent(trimmedInput)) return BLOCKED_TRANSLATION_MESSAGE;

  const { sourceLanguage, targetLanguage } = getLanguagePair(direction);
  const params = new URLSearchParams({
    srv: "tr-text",
    lang: `${sourceLanguage}-${targetLanguage}`,
    text: trimmedInput,
  });

  try {
    const response = await fetch(`${YANDEX_TRANSLATE_BASE_URL}?${params.toString()}`);
    if (!response.ok) throw new Error(`Yandex Translate error: ${response.status}`);

    const payload = (await response.json()) as unknown;
    const translatedText = parseYandexTranslateResponse(payload);
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
