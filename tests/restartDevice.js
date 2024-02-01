import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "restartDevice";
const routeAlias = "updateDevice";
const modelRequest = {
  timestamp: 1706726298103,
  deviceId: "",
  devicesAction: "RESTART_ALL",
};
const modelResponse = {
  timestamp: 1706726929389,
  result: "OK",
  message: "action executed",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[routeAlias]()).resolves.toBeTruthy();
  });
  it("Should validate Backend the Model Request", () => {
    const validate = topics[routeAlias].schema.req;
    validate(modelRequest);
    expect(validate.errors).toBeNull();
    validate({});
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
