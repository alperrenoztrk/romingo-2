import { translateWithTolerance, type TranslationDirection } from "./translationDictionary";
import {
  BLOCKED_TRANSLATION_MESSAGE,
  containsBlockedContent,
} from "./profanityFilter";

const YANDEX_TRANSLATE_BASE_URL = "https://translate.yandex.net/api/v1/tr.json/translate";
const YANDEX_TRANSLATE_URL = import.meta.env.VITE_YANDEX_TRANSLATE_URL || YANDEX_TRANSLATE_BASE_URL;
const YANDEX_TRANSLATE_API_KEY = import.meta.env.VITE_YANDEX_TRANSLATE_API_KEY;

function getLanguagePair(direction: TranslationDirection) {
  return direction === "tr-ro"
    ? { sourceLanguage: "tr", targetLanguage: "ro" }
    : { sourceLanguage: "ro", targetLanguage: "tr" };
}

function parseYandexTranslateResponse(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  if ("text" in payload) {
    const { text } = payload as { text?: unknown };

    if (typeof text === "string") {
      const normalized = text.trim();
      return normalized || null;
    }

    if (Array.isArray(text)) {
      const translatedText = text
        .filter((value): value is string => typeof value === "string")
        .join(" ")
        .trim();

      return translatedText || null;
    }
  }

  if ("translation" in payload && typeof (payload as { translation?: unknown }).translation === "string") {
    const normalized = (payload as { translation: string }).translation.trim();
    return normalized || null;
  }

  if ("translations" in payload) {
    const translations = (payload as { translations?: unknown }).translations;
    if (Array.isArray(translations)) {
      const translatedText = translations
        .map((item) => {
          if (!item || typeof item !== "object") return null;
          const candidate = (item as { text?: unknown }).text;
          return typeof candidate === "string" ? candidate : null;
        })
        .filter((value): value is string => Boolean(value))
        .join(" ")
        .trim();

      return translatedText || null;
    }
  }

  return null;
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
  if (YANDEX_TRANSLATE_API_KEY) {
    params.set("key", YANDEX_TRANSLATE_API_KEY);
  }

  try {
    const response = await fetch(YANDEX_TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
      },
      body: params,
    });
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
