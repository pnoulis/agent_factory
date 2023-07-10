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
import { randomPlayer } from "../../../../scripts/randomPlayer.js";

let players = randomPlayer(5);
let registeredPlayers;
beforeAll(async () => {
  await flushBackendDB();
  await registerPlayer(5).then((res) => {
    registeredPlayers = res;
  });
});

describe("Player login", () => {
  it("Should login a registered player", async () => {
    await expect(
      bservice.loginPlayer({
        username: registeredPlayers[0].username,
        password: registeredPlayers[0].password,
      }),
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.loginPlayer({
      username: registeredPlayers[1].username,
      password: registeredPlayers[1].password,
    });
    expect(response).toMatchObject({
      result: "OK",
      player: expect.objectContaining({
        username: registeredPlayers[1].username,
        email: registeredPlayers[1].email,
        name: registeredPlayers[1].name,
        surname: registeredPlayers[1].surname,
      }),
    });
  });
});
