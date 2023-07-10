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

let registeredPlayers;
beforeAll(async () => {
  await flushBackendDB();
  await registerPlayer(5).then((res) => {
    registeredPlayers = res;
  });
});

describe("Player search", () => {
  it("Should search for players", async () => {
    await expect(
      bservice.searchPlayer({
        searchTerm: registeredPlayers[0].username,
      }),
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.searchPlayer({
      searchTerm: registeredPlayers[0].username,
    });

    // no password
    delete registeredPlayers[0].password;
    expect(response).toMatchObject({
      result: "OK",
      players: expect.arrayContaining([
        expect.objectContaining(registeredPlayers[0]),
      ]),
    });
  });
});
