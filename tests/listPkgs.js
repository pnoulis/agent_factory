import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";
import { normalize as normalizePackage } from "../src/afmachine/package/normalize.js";

const b = new BackendRegistration();
const task = "listPackages";
const modelResponse = {
  timestamp: 1706640606387,
  result: "OK",
  packages: [
    { name: "Per Mission 5", amount: 5, type: "mission", cost: 50 },
    {
      name: "Per Mission 10",
      amount: 10,
      type: "mission",
      cost: 100,
    },
    {
      name: "Per Mission 15",
      amount: 15,
      type: "mission",
      cost: 150,
    },
    {
      name: "Per Mission 20",
      amount: 20,
      type: "mission",
      cost: 200,
    },
    { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
    { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
    { name: "Per Time 90", amount: 90, type: "time", cost: 150 },
    { name: "Per Time 120", amount: 120, type: "time", cost: 200 },
  ],
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should normalize the response", async () => {
    const normalized = modelResponse.packages.map((pkg) =>
      normalizePackage(pkg, { state: "registered" }),
    );
    expect(normalized).toEqual(
      expect.arrayContaining([
        {
          id: null,
          name: "Per Mission 5",
          type: "mission",
          amount: 5,
          cost: 50,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Mission 10",
          type: "mission",
          amount: 10,
          cost: 100,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Mission 15",
          type: "mission",
          amount: 15,
          cost: 150,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Mission 20",
          type: "mission",
          amount: 20,
          cost: 200,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Time 30",
          type: "time",
          amount: 30,
          cost: 50,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Time 60",
          type: "time",
          amount: 60,
          cost: 100,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Time 90",
          type: "time",
          amount: 90,
          cost: 150,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
        {
          id: null,
          name: "Per Time 120",
          type: "time",
          amount: 120,
          cost: 200,
          t_start: null,
          t_end: null,
          remainder: null,
          state: "registered",
        },
      ]),
    );
  });
  it("Should validate Backend API request schema", () => {
    const validate = registrationTopics[task].schema.req;
    expect(validate).toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = registrationTopics[task].schema.res;
    try {
      const response = await b[task]();
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
