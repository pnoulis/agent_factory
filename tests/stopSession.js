import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { deleteActiveSessionRow } from "../src/mysqldb/deleteActiveSessionRow.js";

const task = "stopSession";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const defaultCashier = globalThis.defaultCashier;
const modelRequest = {
  jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXZsb3MiLCJpYXQiOjE3MDY3ODA3ODUsImV4cCI6MTcwNjgxNjc4NX0.fv9UME6AoVpUEofc7NyRqf1t1KM7MUs5XHNbuANclfwibh5bOvEepPNYObf38cZ5MzUu9QGrACtFBvBar0gDJQ",
  comment: "Nothing unexpected ever happens!",
};
const modelResponse = {
  timestamp: 1706780850379,
  result: "OK",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await deleteActiveSessionRow();
    await b.startSession(defaultCashier);
    await expect(b[task](defaultCashier)).resolves.toMatchObject({
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
      await b.startSession(defaultCashier);
      const response = await b[task](defaultCashier);
      validate(response);
      if (validate.errors) {
        console.log(response.errors);
      }
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should normalize the response", () => {});
  it("Should have an Afmachine Task", async () => {
    await b.startSession(defaultCashier);
    await expect(afm[task](defaultCashier)).resolves.toMatchObject({
      ok: true,
    });
  });
});
