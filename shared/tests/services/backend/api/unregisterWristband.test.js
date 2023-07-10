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
import { registerWristband } from "../../../../scripts/registerWristband.js";
import { registerPlayer } from "../../../../scripts/registerPlayer.js";
import { randomPlayer } from "../../../../scripts/randomPlayer.js";

let players = randomPlayer(5);
let registeredPlayers = [];
let registeredWristbandPlayers = [];
beforeAll(async () => {
  await flushBackendDB();
  await registerWristband(5).then((res) => {
    registeredWristbandPlayers = res;
  });
  await registerPlayer(5).then((res) => {
    registeredPlayers = res;
  });
});

describe("Wristband unregistration", () => {
  it("Should unregister a wristband", async () => {
    await expect(
      bservice.unregisterWristband({
        username: registeredWristbandPlayers.pop().username,
      })
    ).resolves.toMatchObject({ result: "OK" });
  });

  it("Should respond with", async () => {
    const response = await bservice.unregisterWristband({
      username: registeredWristbandPlayers.pop().username,
    });
    expect(response).toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });
  it("Should not reject if trying to unpair a wristband from an unregistered user", async () => {
    await expect(
      bservice.unregisterWristband({
        username: players.pop().username,
      })
    ).resolves.toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });
  it("Should not reject if trying to unpair a wristband from a registered user without a paired wristband", async () => {
    await expect(
      bservice.unregisterWristband({
        username: registeredPlayers.pop().username,
      })
    ).resolves.toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });
});
