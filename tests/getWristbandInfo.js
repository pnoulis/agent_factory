import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { normalize as normalizeWristband } from "../src/afmachine/wristband/normalize.js";
import { random as randomWristband } from "../src/afmachine/wristband/random.js";
import { WRISTBAND_COLORS } from "../src/constants.js";

const task = "getWristbandInfo";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706879364557,
  wristbandNumber: 3,
};
const modelResponse = {
  timestamp: 1706879364557,
  result: "OK",
  wristband: { wristbandNumber: 3, wristbandColor: 2, active: false },
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
    try {
      const response = await b[task](modelRequest);
      validate(response);
      if (validate.errors) {
        console.log(validate.errors);
      }
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
      expect(response).toHaveProperty("wristband");
      expect(normalizeWristband(response.wristband)).toEqual({
        id: response.wristband.wristbandNumber,
        colorCode: response.wristband.wristbandColor,
        color: WRISTBAND_COLORS[response.wristband.wristbandColor] || "",
        state: "unpaired",
      });
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    const wristband = randomWristband({ id: 220 });
    await expect(afm[task](wristband)).resolves.toMatchObject({
      ok: true,
      wristband: {
        ...wristband,
        state: "unpaired",
      },
    });
  });
});
