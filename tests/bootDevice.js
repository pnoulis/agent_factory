import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";

const b = new BackendRegistration();
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
    const validate = registrationTopics["updateDevice"].schema.req;

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
    const validate = registrationTopics["updateDevice"].schema.res;
    validate(modelResponse);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = registrationTopics["updateDevice"].schema.res;
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
