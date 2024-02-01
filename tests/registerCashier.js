import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { randomCashier } from "../src/misc/misc.js";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "registerCashier";
const modelRequest = {
  username: "testCashierYOLO",
  email: "testCashierYolo@gmail.com",
  password: "testCashierPassword",
  role: ["ROLE_CASHIER"],
};
const modelResponse = {
  timestamp: 1706729341301,
  result: "OK",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task](randomCashier())).resolves.toBeTruthy();
  });
  it("Should validate the Model Request", () => {
    const validate = topics[task].schema.req;
    validate(modelRequest);
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
      const response = await b[task](randomCashier());
      validate(response);
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    await expect(afm[task](randomCashier())).resolves.toBeTruthy();
  });
});
