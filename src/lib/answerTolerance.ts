function normalizeAnswer(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:()"']/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

const TURKISH_UNITS: Record<string, number> = {
  sıfır: 0,
  bir: 1,
  iki: 2,
  üç: 3,
  dört: 4,
  beş: 5,
  altı: 6,
  yedi: 7,
  sekiz: 8,
  dokuz: 9,
};

const TURKISH_TENS: Record<string, number> = {
  on: 10,
  yirmi: 20,
  otuz: 30,
  kırk: 40,
  elli: 50,
  altmış: 60,
  yetmiş: 70,
  seksen: 80,
  doksan: 90,
};

function parseTurkishNumber(words: string[]) {
  if (!words.length) return null;

  if (words.length === 1 && /^\d+$/.test(words[0])) {
    return Number(words[0]);
  }

  let total = 0;
  let current = 0;

  for (const word of words) {
    if (word in TURKISH_UNITS) {
      current += TURKISH_UNITS[word];
      continue;
    }

    if (word in TURKISH_TENS) {
      current += TURKISH_TENS[word];
      continue;
    }

    if (word === "yüz") {
      current = (current || 1) * 100;
      continue;
    }

    if (word === "bin") {
      total += (current || 1) * 1000;
      current = 0;
      continue;
    }

    return null;
  }

  return total + current;
}

function isEditDistanceAtMostOne(left: string, right: string) {
  const lengthDiff = Math.abs(left.length - right.length);
  if (lengthDiff > 1) return false;

  if (left === right) return true;

  let i = 0;
  let j = 0;
  let edits = 0;

  while (i < left.length && j < right.length) {
    if (left[i] === right[j]) {
      i += 1;
      j += 1;
      continue;
    }

    edits += 1;
    if (edits > 1) return false;

    if (left.length > right.length) {
      i += 1;
    } else if (right.length > left.length) {
      j += 1;
    } else {
      i += 1;
      j += 1;
    }
  }

  if (i < left.length || j < right.length) edits += 1;

  return edits <= 1;
}

export function matchesWithOneLetterTolerancePerWord(input: string, expected: string) {
  const inputWords = normalizeAnswer(input);
  const expectedWords = normalizeAnswer(expected);

  const inputNumber = parseTurkishNumber(inputWords);
  const expectedNumber = parseTurkishNumber(expectedWords);

  if (inputNumber !== null && expectedNumber !== null && inputNumber === expectedNumber) {
    return true;
  }

  if (inputWords.length !== expectedWords.length) return false;

  return inputWords.every((word, index) =>
    isEditDistanceAtMostOne(word, expectedWords[index])
  );
}
