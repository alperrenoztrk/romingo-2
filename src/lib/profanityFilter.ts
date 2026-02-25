const BLOCKED_WORD_PATTERNS = [
  /\bsik\w*\b/i,
  /\bsiktir\w*\b/i,
  /\bamk\b/i,
  /\baq\b/i,
  /\borospu\w*\b/i,
  /\bpic\w*\b/i,
  /\bgot\w*\b/i,
  /\byarr?ak\w*\b/i,
  /\bamina\w*\b/i,
  /\bamcik\w*\b/i,
  /\bpezevenk\w*\b/i,
  /\bporno\w*\b/i,
  /\bsex\w*\b/i,
  /\bescort\w*\b/i,
  /\bsapik\w*\b/i,
  /\bsapkin\w*\b/i,
  /\bmasturb\w*\b/i,
  /\bpenis\w*\b/i,
  /\bvajina\w*\b/i,
  /\bpula\w*\b/i,
  /\bmuie\w*\b/i,
  /\bfut\w*\b/i,
  /\bcurva\w*\b/i,
];

export const BLOCKED_TRANSLATION_MESSAGE = "Uygunsuz içerik nedeniyle çeviri gösterilmiyor.";

function normalizeText(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("tr");
}

export function containsBlockedContent(text: string) {
  const normalizedText = normalizeText(text);
  return BLOCKED_WORD_PATTERNS.some((pattern) => pattern.test(normalizedText));
}
