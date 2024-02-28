import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "listScoreboardDevices";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706711522546,
};
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
    await expect(b[task](modelRequest)).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should validate the Model Request", () => {
    const validate = topics[task].schema.req;
    if (validate === null) return;
    validate(modelRequest);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = topics[task].schema.res;
    validate(modelResponse);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[task].schema.res;
    try {
      const response = await b[task](modelRequest);
      validate(response);
      if (validate.errors) {
        console.log(validate.errors);
      }
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    await expect(afm[task]()).resolves.toMatchObject({ ok: true });
  });
});
