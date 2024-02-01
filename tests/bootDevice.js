import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "bootDevice";
const routeAlias = "updateDevice";
const modelResponse = {
  timestamp: 1706724066778,
  result: "OK",
  message: "action executed",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[routeAlias]()).resolves.toBeTruthy();
  });
  it("Should validate Backend API request schema", () => {
    const validate = topics["updateDevice"].schema.req;

    validate({
      timestamp: Date.now(),
      devicesAction: "WAKEUP_ALL",
      deviceId: "",
    });
    expect(validate.errors).toBeNull();

    validate({
      timestamp: Date.now(),
      devicesAction: "WAKE_UP",
      deviceId: "yolo",
    });
    expect(validate.errors).toBeNull();

    validate({ timestamp: Date.now(), devicesAction: "unknown", deviceId: "" });
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = topics[routeAlias].schema.res;
    validate(modelResponse);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[routeAlias].schema.res;
    try {
      const response = await b[routeAlias]();
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
