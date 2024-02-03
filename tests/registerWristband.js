import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomPlayer } from "../src/afmachine/player/random.js";
import { random as randomWristband } from "../src/afmachine/wristband/random.js";
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";

const task = "registerWristband";
const reader = new BackendRPIReader();
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706957679789,
  username: "diwgp3nrrtf",
  wristbandNumber: 234,
};
const modelResponse = {
  timestamp: 1706957679848,
  result: "OK",
  message: "successfully registerWristbandToPlayer",
};

describe(task, () => {
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
  it("Should validate and normalize the Backend response", async () => {
    const validate = topics[task].schema.res;
    const player = randomPlayer(null, { password: true });
    const wristband = randomWristband({ id: 444 });
    await b.registerPlayer(player);
    const scan = b.scanWristband();
    await reader.read({ id: wristband.id, color: wristband.colorCode });
    const {
      wristband: { wristbandNumber, wristbandColor },
    } = await scan;
    expect(wristbandNumber).toEqual(wristband.id);
    expect(wristbandColor).toEqual(wristband.colorCode);
    const response = await b[task]({
      timestamp: Date.now(),
      wristbandNumber,
      username: player.username,
    });
    validate(response);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should have an Afmachine Task", async () => {
    const player = afm.createPlayer().fill(null, { depth: 1, password: true });
    await b.registerPlayer(player);
    const scan = b.scanWristband();
    await reader.read({
      id: player.wristband.id,
      color: player.wristband.colorCode,
    });
    const {
      wristband: { wristbandNumber, wristbandColor },
    } = await scan;
    expect(wristbandNumber).toEqual(player.wristband.id);
    expect(wristbandColor).toEqual(player.wristband.colorCode);
    const response = await afm[task](player, player.wristband);
    expect(response).toEqual({
      ok: true,
      player: {
        ...player.tobject(),
        wristband: {
          ...player.wristband.tobject(),
          state: "paired",
        },
      },
    });
  });
});
