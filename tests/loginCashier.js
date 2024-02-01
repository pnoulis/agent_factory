import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "loginCashier";
const modelRequest = {
  username: "33rksrlppga",
  password: "7c38dir1206",
};
const modelResponse = {
  timestamp: 1706777994830,
  result: "OK",
  jwtResponse: {
    jwt: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIzM3Jrc3JscHBnYSIsImlhdCI6MTcwNjc3Nzk5NCwiZXhwIjoxNzA2ODEzOTk0fQ.-qZzuKJX0Aitieseid4h2Lxf5RJkpoXWBLzvEk9_8iFObwh8LicI9ZgG6_wfI1GEHOrAyoauv5tV5nX2SxfBGA",
    id: 74,
    username: "33rksrlppga",
    email: "33rksrlppga@gmail.com",
    roles: ["ROLE_CASHIER"],
  },
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task](modelRequest)).resolves.toBeTruthy();
  });
  it.todo("Should normalize the response", () => {});
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
      const response = await b[task](modelRequest);
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
