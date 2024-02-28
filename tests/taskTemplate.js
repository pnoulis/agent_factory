import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "listPlayers";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {};
const modelResponse = {};

describe(task, () => {
  it.todo("Should have a Backend API call that resolves", async () => {
    await expect(b[task](modelRequest)).resolves.toMatchObject({
      result: "OK",
    });
  });
  it.todo("Should validate the Model Request", () => {
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
  it.todo("Should validate the Model Response", () => {
    const validate = topics[task].schema.res;
    validate(modelResponse);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it.todo("Should validate Backend API response schema", async () => {
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
  it.todo("Should normalize the response", () => {});
  it.todo("Should have an Afmachine Task", async () => {
    await expect(afm[task]()).resolves.toMatchObject({ ok: true });
  });
});
