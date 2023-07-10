import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */

import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */
import { flushBackendDB } from "../../../../scripts/flushBackendDB.js";
import { randomPlayer } from "../../../../scripts/randomPlayer.js";

const players = randomPlayer(5);
beforeAll(async () => {
  await flushBackendDB();
});

describe("Player registration", () => {
  it("Should register a player", async () => {
    await expect(bservice.registerPlayer(players[0])).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should respond with", async () => {
    const response = await bservice.registerPlayer(players[1]);
    expect(response).toMatchObject({
      result: "OK",
      player: expect.objectContaining({
        username: players[1].username,
        name: players[1].name,
        surname: players[1].surname,
        email: players[1].email,
      }),
    });
  });
  it("Should require unique player usernames", async () => {
    players[2].username = players[1].username;
    await expect(bservice.registerPlayer(players[2])).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
  it("Should require unique player emails", async () => {
    players[3].email = players[1].email;
    await expect(bservice.registerPlayer(players[3])).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
});
