import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";
import { random as randomPlayer } from "../src/afmachine/player/random.js";
import { random as randomWristband } from "../src/afmachine/wristband/random.js";

const task = "deregisterWristband";
const reader = new BackendRPIReader();
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706960913052,
  username: "a39hldmki3",
  wristbandNumber: 432,
};
const modelResponse = {
  timestamp: 1706960913123,
  result: "OK",
  message: "successfully unregisterWristbandToPlayer",
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
    await b.registerWristband({
      timestamp: Date.now(),
      username: player.username,
      wristbandNumber,
    });
    const response = await b[task]({
      timestamp: Date.now(),
      username: player.username,
      wristbandNumber,
    });
    validate(response);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it.only("Should have an Afmachine Task", async () => {
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
    await b.registerWristband({
      timestamp: Date.now(),
      username: player.username,
      wristbandNumber,
    });
    const response = await afm[task](player, player.wristband);
    expect(response).toEqual({
      ok: true,
      player: {
        ...player.tobject(),
        wristband: {
          ...player.wristband.tobject(),
          state: "unpaired",
        },
      },
    });
  });
});
