import "../src/debug.js";
import { describe, it, expect, vi, beforeAll, beforeEach } from "vitest";
import { registrationTopics } from "../backend-topics.js";
import { ENV } from "../src/config.js";
import { DEVICES, ROOMS } from "../src/constants.js";

debug(ENV);

describe("schemas", () => {
  it("Should validate boot", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;

    //////////////////////////////////////////////////
    // Request
    //////////////////////////////////////////////////
    // with exactly the right number of props and format
    expect(
      validateReq({
        timestamp: 12345,
        deviceId: ENV.DEVICE_ID,
        deviceType: DEVICES.registrationScreen,
        roomName: ROOMS.administration1,
      }),
    ).toBe(true);
    // with missing properties
    expect(
      validateReq({
        timestamp: 12345,
      }),
    ).toBe(false);
    // with extra props
    expect(
      validateReq({
        timestamp: 12345,
        deviceId: ENV.DEVICE_ID,
        deviceType: DEVICES.registrationScreen,
        roomName: ROOMS.administration1,
        extra: "123",
      }),
    ).toBe(false);

    //////////////////////////////////////////////////
    // Response
    //////////////////////////////////////////////////
    // with exactly the right number of props and format
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        deviceType: DEVICES.registrationScreen,
        roomName: ROOMS.administration1,
      }),
    ).toBe(true);
    // with missing props
    expect(
      validateRes({
        timestamp: 12345,
      }),
    ).toBe(false);
    // with extra props
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        deviceType: DEVICES.registrationScreen,
        roomName: ROOMS.administration1,
        extra: "123",
      }),
    ).toBe(false);
  });
  it.todo("Should validate register player", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate login player", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate scan wristband", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate pair wristband", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate unpair wristband", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate merge team", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate merge group team", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate is wristband valid", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate get wristband info", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate add package to team", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate remove package from team", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate activate team package", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate register cashier", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate login cashier", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate remove cashier", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate start session", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate stop session", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate update device", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate update device scoreboard view", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate search player", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list players", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list players wristband", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list packages", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it("Should validate list teams", () => {
    const validateRes = registrationTopics.listPkgs.schema.res;
    const pkgs = [
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
      { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
      { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
      { name: "Per Time 90", amount: 90, type: "time", cost: 150 },
      { name: "Per Time 120", amount: 120, type: "time", cost: 200 },
    ];
    //////////////////////////////////////////////////
    // Response
    //////////////////////////////////////////////////
    // With the exact amount of props and in the right format
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        packages: pkgs,
      }),
    ).toBe(true);
    // With missing props
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
      }),
    ).toBe(false);
    // With extra props
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        packages: pkgs,
        extra: 123,
      }),
    ).toBe(false);
    // With strings mixed in with objects
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        packages: ["tohuen", pkgs[0]],
      }),
    ).toBe(false);
    // With a packages item with fewer props
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        packages: [
          { amount: 30, type: "mission", cost: 20 },
          { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
          { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
        ],
      }),
    ).toBe(false);
    // With a packages item with extra props
    expect(
      validateRes({
        timestamp: 12345,
        result: "OK",
        packages: [
          {
            amount: 30,
            type: "mission",
            cost: 20,
            name: "yolo",
            extra: "eutheu",
          },
          { name: "Per Time 30", amount: 30, type: "time", cost: 50 },
          { name: "Per Time 60", amount: 60, type: "time", cost: 100 },
        ],
      }),
    ).toBe(false);
  });
  it.todo("Should validate list cashiers", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list devices", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list scoreboard devices", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list scoreboard device views", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
  it.todo("Should validate list scoreboard", () => {
    const validateReq = registrationTopics.boot.schema.req;
    const validateRes = registrationTopics.boot.schema.res;
    expect(true).toBe(true);
  });
});
