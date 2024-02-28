import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomCashier } from "../src/afmachine/cashier/random.js";

const task = "registerCashier";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
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
      const response = await b[task]({
        ...randomCashier(null, { password: true }),
        role: ["ROLE_CASHIER"],
      });
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
    const cashier = randomCashier(null, { password: true });
    await expect(afm[task](cashier, cashier.password)).resolves.toMatchObject({
      ok: true,
      cashier: {
        id: expect.any(Number),
        username: cashier.username,
        role: cashier.role,
        email: cashier.email,
      },
    });
  });
});
