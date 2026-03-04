import { describe, expect, it } from "vitest";
import { isLessonUnlocked, type LessonProgressMap } from "./lessonProgress";

describe("isLessonUnlocked", () => {
  const orderedLessonIds = ["1", "2", "3"];

  it("always unlocks the first lesson", () => {
    const progress: LessonProgressMap = {};

    expect(isLessonUnlocked("1", orderedLessonIds, progress)).toBe(true);
  });

  it("keeps next lesson locked until previous one is completed", () => {
    const progress: LessonProgressMap = {};

    expect(isLessonUnlocked("2", orderedLessonIds, progress)).toBe(false);
  });

  it("unlocks lesson when immediately previous lesson is completed", () => {
    const progress: LessonProgressMap = {
      "1": {
        stars: 3,
        completedAt: new Date().toISOString(),
      },
    };

    expect(isLessonUnlocked("2", orderedLessonIds, progress)).toBe(true);
  });

  it("does not unlock unknown lessons", () => {
    const progress: LessonProgressMap = {
      "1": {
        stars: 3,
        completedAt: new Date().toISOString(),
      },
    };

    expect(isLessonUnlocked("999", orderedLessonIds, progress)).toBe(false);
  });
});
