import { describe, it, expect, beforeEach } from "vitest";

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
import { MAX_TEAM_SIZE } from "../../../../constants.js";
import { generateRandomName } from "js_utils/misc";

let players;
let registeredPlayers = [];
let registeredWristbandPlayers = [];

beforeEach(async () => {
  await flushBackendDB();
  players = randomPlayer(MAX_TEAM_SIZE * 2);
  await registerPlayer(MAX_TEAM_SIZE * 2).then((res) => {
    registeredPlayers = res;
  });
  await registerWristband(MAX_TEAM_SIZE * 2).then((res) => {
    registeredWristbandPlayers = res;
  });
});

describe("Team registration", () => {
  it("Should merge a team", async () => {
    await expect(
      bservice.mergeTeam({
        teamName: generateRandomName(),
        usernames: registeredWristbandPlayers
          .slice(0, MAX_TEAM_SIZE)
          .map((player) => player.username),
      })
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.mergeTeam({
      teamName: generateRandomName(),
      usernames: registeredWristbandPlayers
        .slice(0, MAX_TEAM_SIZE)
        .map((player) => player.username),
    });
    expect(response).toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });
  it("Should require all roster members to be registered", async () => {
    await expect(
      bservice.mergeTeam({
        teamName: generateRandomName(),
        usernames: [
          ...registeredWristbandPlayers.slice(0, 2).map((p) => p.username),

          ...players.slice(0, 2).map((p) => p.username),
        ],
      })
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
  it("Should require all roster members to be paired to a wristband", async () => {
    await expect(
      bservice.mergeTeam({
        teamName: generateRandomName(),
        usernames: [
          ...registeredPlayers.slice(0, 2).map((p) => p.username),
          ...registeredWristbandPlayers.slice(0, 2).map((p) => p.username),
        ],
      })
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
  it("Should require unique roster members", async () => {
    await expect(
      bservice.mergeTeam({
        teamName: generateRandomName(),
        usernames: [
          // Using slice the 2 members are repeated
          ...registeredWristbandPlayers.slice(0, 2).map((p) => p.username),
          ...registeredWristbandPlayers.slice(0, 2).map((p) => p.username),
        ],
      })
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
  it("Should require unique team names across server instance", async () => {
    const teamName = generateRandomName();
    await expect(
      bservice
        .mergeTeam({
          teamName,
          usernames: registeredWristbandPlayers
            .slice(0, 2)
            .map((player) => player.username),
        })
        .then(() =>
          bservice.mergeTeam({
            teamName,
            usernames: registeredWristbandPlayers
              .slice(0, 2)
              .map((player) => player.username),
          })
        )
    ).resolves.toMatchObject({
      result: "NOK",
      message: expect.any(String),
    });
  });
  // FAIL
  it.todo("Should require the roster be of maximum size 6", async () => {});
  // FAIL
  it.todo("Should require the roster to be of minimum size 2", async () => {});
  // FAIL
  it.todo(
    "Should require unique wristband colors across the roster",
    async () => {}
  );
});
