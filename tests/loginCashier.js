import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { randomCashier } from "../src/misc/misc.js";

const task = "loginCashier";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
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

const registeredCashiers = [randomCashier(), randomCashier(), randomCashier()];
beforeAll(async () => {
  for (let i = 0; i < registeredCashiers.length; i++) {
    const { cashier } = await afm.registerCashier(registeredCashiers[i]);
    registeredCashiers[i] = cashier;
  }
});

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task](registeredCashiers.pop())).resolves.toMatchObject({
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
      const response = await b[task](registeredCashiers.pop());
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
  it("Should have an Afmachine Task", async () => {
    await expect(afm[task](registeredCashiers.pop())).resolves.toMatchObject({
      ok: true,
    });
  });
});
