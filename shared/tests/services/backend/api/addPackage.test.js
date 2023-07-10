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
import { registerTeam } from "../../../../scripts/registerTeam.js";
import { randomPackage } from "../../../../scripts/randomPackage.js";
import { AF_PACKAGES } from "../../../../constants.js";

let registeredTeam;
beforeEach(async () => {
  await flushBackendDB();
  await registerTeam().then((res) => {
    registeredTeam = res;
  });
});

describe("Add package", () => {
  it("Should add a package", async () => {
    await expect(
      bservice.addPackage({
        teamName: registeredTeam.teamName,
        name: AF_PACKAGES[0].name,
      })
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should resolve with", async () => {
    const response = await bservice.addPackage({
      teamName: registeredTeam.teamName,
      name: AF_PACKAGES[0].name,
    });

    expect(response).toMatchObject({
      result: "OK",
      team: expect.objectContaining({
        name: registeredTeam.teamName,
        totalPoints: 0,
        teamState: null,
        currentRoster: {
          version: 1,
          players: expect.any(Array),
        },
        roomType: null,
        packages: expect.any(Array),
      }),
    });
  });
});
