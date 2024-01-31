import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";

const b = new BackendRegistration();
const task = "shutdownDevice";
const routeAlias = "updateDevice";
const modelRequest = {
  timestamp: 1706726298103,
  deviceId: "",
  devicesAction: "SHUTDOWN_ALL",
};
const modelResponse = {
  timestamp: 1706726298103,
  result: "OK",
  message: "action executed",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[routeAlias](modelRequest)).resolves.toBeTruthy();
  });
  it("Should validate Backend API request schema", () => {
    const validate = registrationTopics[routeAlias].schema.req;
    validate(modelRequest);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = registrationTopics[routeAlias].schema.res;
    validate(modelResponse);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = registrationTopics[routeAlias].schema.res;
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
