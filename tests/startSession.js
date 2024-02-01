import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { deleteActiveSessionRow } from "../src/mysqldb/deleteActiveSessionRow.js";
import { DEFAULT_CASHIER } from "../src/constants.js";

const b = globalThis.backend;
const topics = globalThis.topics;
const defaultCashier = globalThis.defaultCashier;
const afm = globalThis.afm;
const task = "startSession";
const modelRequest = {
  jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
};
const modelResponse = {
  timestamp: 1706780850379,
  result: "OK",
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await deleteActiveSessionRow();
    await expect(b[task](defaultCashier)).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should validate the Model request", () => {
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
      await deleteActiveSessionRow();
      const response = await b[task](defaultCashier);
      validate(response);
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    await deleteActiveSessionRow();
    await expect(afm[task](defaultCashier)).resolves.toBeTruthy();
  });
});
