import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "listCashiers";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706707779283,
};
const modelResponse = {
  timestamp: 1706707779283,
  result: "OK",
  cashiers: [
    { id: 1, username: "pavlos", email: "pavlosTester123@gmail.com" },
    { id: 3, username: "tt", email: "tt@gmail.com" },
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
    await expect(afm[task]()).resolves.toMatchObject({
      ok: true,
      cashiers: expect.any(Array),
    });
  });
});
