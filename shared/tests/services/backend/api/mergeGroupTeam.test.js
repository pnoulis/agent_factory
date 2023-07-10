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
import { randomWristband } from "../../../../scripts/randomWristband.js";
import { randomPlayer } from "../../../../scripts/randomPlayer.js";
import { MAX_TEAM_SIZE } from "../../../../constants.js";
import { generateRandomName } from "js_utils/misc";

let players;
let wristbands;
let registeredPlayers = [];
let wristbandPlayers = [];

beforeEach(async () => {
  await flushBackendDB();
  players = randomPlayer(MAX_TEAM_SIZE * 2);
  wristbands = randomWristband(MAX_TEAM_SIZE, true);
  await registerPlayer(MAX_TEAM_SIZE * 2).then((res) => {
    registeredPlayers = res;
  });
  await registerWristband(MAX_TEAM_SIZE * 2).then((res) => {
    wristbandPlayers = res;
  });
});

describe("Group party registration", () => {
  it("Should merge a group party team", async () => {
    await expect(
      bservice.mergeGroupTeam({
        teamName: generateRandomName(),
        groupPlayers: players.slice(0, MAX_TEAM_SIZE).map((player) => ({
          username: player.username,
          wristbandNumber: wristbands.pop().number,
        })),
      }),
    ).resolves.toMatchObject({ result: "OK" });
  });

  it("Should respond with", async () => {
    const response = await bservice.mergeGroupTeam({
      teamName: generateRandomName(),
      groupPlayers: players.slice(0, MAX_TEAM_SIZE).map((player) => ({
        username: player.username,
        wristbandNumber: wristbands.pop().number,
      })),
    });

    expect(response).toMatchObject({
      result: "OK",
      message: expect.any(String),
    });
  });
});
