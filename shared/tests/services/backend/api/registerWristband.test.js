import { describe, it, expect, beforeAll } from "vitest";

/*
  TESTING COMPONENTS
 */

import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */
import { flushBackendDB } from "../../../../scripts/flushBackendDB.js";
import { registerPlayer } from "../../../../scripts/registerPlayer.js";
import { randomWristband } from "../../../../scripts/randomWristband.js";
import { randomPlayer } from "../../../../scripts/randomPlayer.js";

let players;
const wristbands = randomWristband(5);
beforeAll(async () => {
  await flushBackendDB();
  await registerPlayer(5).then((res) => {
    players = res;
  });
});

describe("Wristband registration", () => {
  it("Should register a wristband", async () => {
    await expect(
      bservice.registerWristband({
        username: players[0].username,
        wristbandNumber: wristbands[0].number,
      })
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.registerWristband({
      username: players[1].username,
      wristbandNumber: wristbands[1].number,
    });
    expect(response).toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });

  it("Should require the player to be registered", async () => {
    const unregisteredPlayer = randomPlayer();
    await expect(
      bservice.registerWristband({
        username: unregisteredPlayer.username,
        wristbandNumber: wristbands[2].number,
      })
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });

  it("Should require the wristband is free", async () => {
    await expect(
      bservice.registerWristband({
        username: players[2].username,
        wristbandNumber: wristbands[0].number,
      })
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
});
