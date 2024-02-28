import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomCashier } from "../src/afmachine/cashier/random.js";

const task = "deregisterCashier";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706732989145,
  username: "tt",
  userId: 3,
};
const modelResponse = {
  timestamp: 1706732989145,
  result: "OK",
  cashiers: [
    { id: 1, username: "pavlos", email: "pavlosTester123@gmail.com" },
    { id: 5, username: "testCashier", email: "testCashier@gmail.com" },
    { id: 6, username: "testCash", email: "testCash@gmail.com" },
    { id: 7, username: "r9rcnpncmrf", email: "Tom@gmail.com" },
    { id: 8, username: "ci10l5jm4ip", email: "Finwe@gmail.com" },
    { id: 9, username: "9r0d6jqctfp", email: "Elrond@gmail.com" },
    { id: 10, username: "xi87q2qgu6", email: "Gimli@gmail.com" },
    { id: 11, username: "2b6rdbkpl6j", email: "Gilgalad@gmail.com" },
    { id: 13, username: "mpw14t0s9jg", email: "Isildur@gmail.com" },
    { id: 14, username: "qbavrn3kw7", email: "Aragorn@gmail.com" },
    { id: 15, username: "jq6ttl0bueg", email: "Maedhros@gmail.com" },
    { id: 16, username: "ko1b9haqpqh", email: "Thorin@gmail.com" },
    { id: 17, username: "x21gpwr0bnm", email: "Beren@gmail.com" },
    { id: 18, username: "face6c6oojv", email: "Celebrimbor@gmail.com" },
    { id: 19, username: "4i4asuxctvr", email: "Theoden@gmail.com" },
    { id: 20, username: "jj7mvpbsco4", email: "Earendil@gmail.com" },
  ],
};

const registeredCashiers = [
  randomCashier(null, { password: true }),
  randomCashier(null, { password: true }),
  randomCashier(null, { password: true }),
];
beforeAll(async () => {
  for (let i = 0; i < registeredCashiers.length; i++) {
    const { cashier } = await afm.registerCashier(
      registeredCashiers[i],
      registeredCashiers[i].password,
    );
    registeredCashiers[i] = cashier;
  }
});

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    const cashier = registeredCashiers.pop();
    await expect(
      b[task]({
        userId: cashier.id,
        username: cashier.username,
        timestamp: Date.now(),
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
        timestamp: Date.now(),
        username: cashier.username,
        userId: cashier.id,
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
    await expect(afm[task](cashier)).resolves.toMatchObject({
      ok: true,
      cashier,
    });
  });
});
