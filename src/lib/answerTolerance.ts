function normalizeAnswer(text: string) {
  return text
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:()"']/g, "")
    .split(/\s+/)
    .filter(Boolean);
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

  if (inputWords.length !== expectedWords.length) return false;

  return inputWords.every((word, index) =>
    isEditDistanceAtMostOne(word, expectedWords[index])
  );
}

