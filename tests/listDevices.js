import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "listDevices";
const modelResponse = {
  timestamp: 1706709130813,
  result: "OK",
  devices: [
    {
      deviceType: "SCOREBOARD_SCREEN",
      roomType: "SCOREBOARD1",
      deviceId: "scor1",
      macAddress: null,
      ipAddress: null,
      bootedTimestamp: 1702243701606,
    },
    {
      deviceType: "SCOREBOARD_SCREEN",
      roomType: "SCOREBOARD2",
      deviceId: "scor2",
      macAddress: null,
      ipAddress: null,
      bootedTimestamp: 1702243701625,
    },
    {
      deviceType: "REGISTRATION_SCREEN",
      roomType: "ADMINISTRATION1",
      deviceId: "001",
      macAddress: null,
      ipAddress: null,
      bootedTimestamp: 1706707719741,
    },
    {
      deviceType: "RPI_READER",
      roomType: "ADMINISTRATION1",
      deviceId: "ADMINISTRATION1Reader",
      macAddress: null,
      ipAddress: null,
      bootedTimestamp: 1705889333198,
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
