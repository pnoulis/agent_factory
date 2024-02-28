import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { normalize as normalizeWristband } from "../src/afmachine/wristband/normalize.js";
import { random as randomWristband } from "../src/afmachine/wristband/random.js";
import { WRISTBAND_COLORS } from "../src/constants.js";
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";

const reader = new BackendRPIReader();
const task = "scanWristband";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = null;
const modelResponse = {
  timestamp: 1706880614077,
  result: "OK",
  wristbandNumber: 3,
  wristbandColor: 3,
};

describe(task, () => {
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
  it("Should validate and normalize the Backend response", async () => {
    const validate = topics[task].schema.res;
    const wristband = randomWristband({ id: 333 });
    try {
      let response = b[task]();
      await reader.read({ id: wristband.id, color: wristband.colorCode });
      response = await response;
      // Remove mqtt proxy added property
      response = response.wristband;
      validate(response);
      if (validate.errors) {
        console.log(validate.errors);
      }
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
      expect(normalizeWristband(response)).toEqual({
        id: wristband.id,
        colorCode: wristband.colorCode,
        color: wristband.color,
        state: "unpaired",
      });
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    const wristband = randomWristband({ id: 33 });
    const response = afm[task]();
    await reader.read({ id: wristband.id, color: wristband.colorCode });
    await expect(response).resolves.toEqual({
      ok: true,
      wristband: {
        ...wristband,
        state: "unpaired",
      },
      unsubed: false,
    });
  });
});
