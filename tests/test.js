import { describe, it, expect, beforeAll } from "vitest";

expect(1).toBe(1);

describe("tests", () => {
  it("test", () => {
    const arr = [new Error("otehun"), 2, 3];
    expect(arr[0]).toBeInstanceOf(Error);
  });
});
