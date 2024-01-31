import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";
import { randomCashier } from "../src/misc/misc.js";

const b = new BackendRegistration();
const task = "deregisterCashier";
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

let registeredPlayers = [randomCashier()];
beforeAll(async () => {
  await registeredPlayers.forEach(async (p) => {
    await b.registerCashier(p);
  });
  registeredPlayers = await b.listCashiers();
});

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should validate the Model Request", () => {
    const validate = registrationTopics[task].schema.req;
    validate(modelRequest);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = registrationTopics[task].schema.res;
    validate(modelResponse);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it.only("Should validate Backend API response schema", async () => {
    const validate = registrationTopics[task].schema.res;
    try {
      const response = await b[task](registeredPlayers.pop());
      console.log(response);
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
