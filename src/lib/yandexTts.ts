const YANDEX_TTS_BASE_URL = "https://translate.yandex.net/api/v1/tr.json/tts";
const YANDEX_TTS_URL = import.meta.env.VITE_YANDEX_TTS_URL || YANDEX_TTS_BASE_URL;
const YANDEX_TRANSLATE_API_KEY = import.meta.env.VITE_YANDEX_TRANSLATE_API_KEY;

function getVoiceLanguage(locale: string) {
  return locale.startsWith("ro") ? "ro-RO" : "tr-TR";
}

export async function speakWithYandex(text: string, locale: string) {
  const trimmedText = text.trim();
  if (!trimmedText || typeof window === "undefined") return;

  const params = new URLSearchParams({
    text: trimmedText,
    lang: getVoiceLanguage(locale),
    format: "mp3",
    options: "gender=female",
  });

  if (YANDEX_TRANSLATE_API_KEY) {
    params.set("key", YANDEX_TRANSLATE_API_KEY);
  }

  const audio = new Audio(`${YANDEX_TTS_URL}?${params.toString()}`);
  audio.preload = "auto";
  await audio.play();
}
