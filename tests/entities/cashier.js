import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { normalize as normalizeCashier } from "../src/afmachine/cashier/normalize.js";
import { random as randomCashier } from "../src/afmachine/cashier/random.js";

const backendForm = [
  { id: 1, username: "pavlos", email: "pavlosTester123@gmail.com" },
  {
    id: 74,
    username: "3ppga",
    email: "a@gmail.com",
    roles: ["ROLE_CASHIER"],
  },
];

const afmForm = [
  { id: 1, username: "yolo", email: "yolo@gmail.com", role: "cashier" },
];

describe("cashier", () => {
  it("Should normalize an empty source", () => {
    expect(normalizeCashier(null)).toEqual({
      id: null,
      username: "",
      email: "",
      role: "cashier",
    });

    expect(normalizeCashier([null, undefined, [null, undefined]])).toEqual({
      id: null,
      username: "",
      email: "",
      role: "cashier",
    });
  });
  it("Should normalize one source in Backend form", () => {
    let backendCashier = {
      id: 1,
      username: "pavlos",
      email: "pavlosTester123@gmail.com",
    };
    expect(normalizeCashier(backendCashier)).toEqual({
      ...backendCashier,
      role: "cashier",
    });
    backendCashier = {
      id: 74,
      username: "3ppga",
      email: "a@gmail.com",
      roles: ["ROLE_CASHIER"],
    };
    expect(normalizeCashier(backendCashier)).toEqual({
      id: backendCashier.id,
      username: backendCashier.username,
      email: backendCashier.email,
      role: "cashier",
    });
  });
  it("Should normalize one source in AFM form", () => {
    let afmCashier = {
      id: 1,
      username: "yolo",
      email: "yolo@gmail.com",
      role: "cashier",
    };

    expect(normalizeCashier(afmCashier)).toEqual({
      id: 1,
      username: "yolo",
      email: "yolo@gmail.com",
      role: "cashier",
    });

    afmCashier = {
      id: 1,
      username: "yolo",
      email: "yolo@gmail.com",
    };
    expect(normalizeCashier(afmCashier)).toEqual({
      id: 1,
      username: "yolo",
      email: "yolo@gmail.com",
      role: "cashier",
    });
  });
  it("Should normalize multiple sources in any form", () => {
    let cashiers = [
      { id: 1, username: "pavlos", email: "pavlosTester123@gmail.com" },
      {
        id: 74,
        username: "3ppga",
        email: "a@gmail.com",
        roles: ["ROLE_CASHIER"],
      },
    ];

    expect(normalizeCashier(cashiers)).toEqual({
      id: 74,
      username: "3ppga",
      email: "a@gmail.com",
      role: "cashier",
    });

    cashiers = [
      {
        id: 74,
        username: "3ppga",
        email: "a@gmail.com",
        roles: ["ROLE_CASHIER"],
      },
      { id: 1, username: "pavlos", email: "pavlosTester123@gmail.com" },
    ];

    expect(normalizeCashier(cashiers)).toEqual({
      id: 1,
      username: "pavlos",
      email: "pavlosTester123@gmail.com",
      role: "cashier",
    });
  });
  it("Should allow null values to supersede", () => {
    let cashiers = [
      {
        id: 1,
        username: "pavlos",
        email: "pavlosTester123@gmail.com",
      },
      {
        id: 74,
        username: "3ppga",
        email: "a@gmail.com",
        roles: ["ROLE_CASHIER"],
      },
      {
        id: null,
        username: "",
        email: "",
        roles: "",
      },
    ];

    expect(normalizeCashier(cashiers, { nullSupersede: true })).toEqual({
      id: null,
      username: "",
      email: "",
      role: "",
    });
  });
  it("Should not allow null values to supersede", () => {
    let cashiers = [
      {
        id: 1,
        username: "pavlos",
        email: "pavlosTester123@gmail.com",
        roles: ["ROLE_CASHIER"],
      },
      {
        id: 74,
        username: "3ppga",
        email: "a@gmail.com",
      },
      {
        id: null,
        username: "",
        email: "",
        roles: "",
      },
    ];

    expect(normalizeCashier(cashiers)).toEqual({
      id: 74,
      username: "3ppga",
      email: "a@gmail.com",
      role: "cashier",
    });
  });
  it("Should produce a random cashier", () => {
    let r = randomCashier();
    expect(r).toHaveProperty("username");
    expect(r).toHaveProperty("email");
    expect(r).toHaveProperty("id");
    expect(r).toHaveProperty("role");
    r = randomCashier(null, { password: true });
    expect(r).toHaveProperty("password");
  });
  it("Should produce a random cashier based on one source in Backend form", () => {
    let backendCashier = {
      id: 1,
      username: "pavlos",
    };
    expect(randomCashier(backendCashier)).toEqual({
      id: 1,
      username: "pavlos",
      email: "pavlos@gmail.com",
      role: "cashier",
    });
  });
  it("Should produce a random cashier based on one source in AFM form", () => {
    let afmCashier = {
      role: "cashier",
    };

    expect(randomCashier(afmCashier)).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
      role: "cashier",
    });
  });
  it("Should produce a random cashier based on multiple sources in any form", () => {
    let cashiers = [
      {
        id: 1,
        username: "pavlos",
      },
      {
        roles: ["ROLE_CASHIER"],
      },
    ];

    expect(randomCashier(cashiers)).toMatchObject({
      id: 1,
      username: "pavlos",
      role: "cashier",
      email: "pavlos@gmail.com",
    });
  });
});
