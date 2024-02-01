import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "listScoreboardDevices";
const modelResponse = {
  timestamp: 1706711522546,
  result: "OK",
  scoreboardDevices: [
    {
      deviceId: "scor1",
      deviceType: "SCOREBOARD_SCREEN",
      roomType: "SCOREBOARD1",
      status: "ROTATING",
    },
    {
      deviceId: "scor2",
      deviceType: "SCOREBOARD_SCREEN",
      roomType: "SCOREBOARD2",
      status: "MONTHLY",
    },
  ],
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should validate Backend API request schema", () => {
    const validate = topics[task].schema.req;
    validate({ timestamp: Date.now() });
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = topics[task].schema.res;
    validate(modelResponse);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[task].schema.res;
    try {
      const response = await b[task]();
      validate(response);
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    await expect(afm[task]()).resolves.toBeTruthy();
  });
});
