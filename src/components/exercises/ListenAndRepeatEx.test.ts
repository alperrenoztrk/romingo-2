import { describe, expect, it } from "vitest";
import { isAcceptedSpeechAnswer } from "./ListenAndRepeatEx";

describe("isAcceptedSpeechAnswer", () => {
  it("accepts exact matches", () => {
    expect(isAcceptedSpeechAnswer("buna dimineata", ["buna dimineata"])).toBe(true);
  });

  it("accepts one-letter speech recognition mistakes", () => {
    expect(isAcceptedSpeechAnswer("buna dimineatsa", ["buna dimineata"])).toBe(true);
  });

  it("accepts longer transcripts that contain the expected phrase", () => {
    expect(isAcceptedSpeechAnswer("da buna dimineata", ["buna dimineata"])).toBe(true);
  });

  it("rejects unrelated phrases", () => {
    expect(isAcceptedSpeechAnswer("noapte buna", ["buna dimineata"])).toBe(false);
  });
});
