import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "bootDevice";
const routeAlias = "updateDevice";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  // Boot all devices
  timestamp: 1706724066778,
  devicesAction: "WAKEUP_ALL",
  deviceId: "",
};
const modelResponse = {
  timestamp: 1706724066778,
  result: "OK",
  message: "action executed",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[routeAlias](modelRequest)).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should validate the Model Request", () => {
    const validate = topics[routeAlias].schema.req;
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
    const validate = topics[routeAlias].schema.res;
    validate(modelResponse);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[routeAlias].schema.res;
    try {
      const response = await b[routeAlias](modelRequest);
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
