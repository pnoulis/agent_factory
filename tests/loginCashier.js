import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomCashier } from "../src/afmachine/cashier/random.js";

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

const registeredCashiers = [
  randomCashier(null, { password: true }),
  randomCashier(null, { password: true }),
  randomCashier(null, { password: true }),
];
beforeAll(async () => {
  for (let i = 0; i < registeredCashiers.length; i++) {
    const { cashier, password } = await afm.registerCashier(
      registeredCashiers[i],
      registeredCashiers[i].password,
    );
    cashier.password = password;
    registeredCashiers[i] = cashier;
  }
});

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    const cashier = registeredCashiers.pop();
    await expect(
      b[task]({
        ...cashier,
        role: [`ROLE_${cashier.role}`.toUpperCase()],
      }),
    ).resolves.toMatchObject({
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
      const cashier = registeredCashiers.pop();
      const response = await b[task]({
        ...cashier,
        role: [`ROLE_${cashier.role}`.toUpperCase()],
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
    const cashier = registeredCashiers.pop();
    await expect(afm[task](cashier, cashier.password)).resolves.toMatchObject({
      ok: true,
      cashier: {
        id: cashier.id,
        username: cashier.username,
        email: cashier.email,
        role: cashier.role,
      },
      jwt: expect.any(String),
    });
  });
});
