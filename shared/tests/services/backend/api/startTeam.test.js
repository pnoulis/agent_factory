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
import { addPackage } from "../../../../scripts/addPackage.js";
import { registerTeam } from "../../../../scripts/registerTeam.js";

let registeredTeam;
let packagedTeam;
beforeEach(async () => {
  await flushBackendDB();
  await registerTeam().then((res) => {
    registeredTeam = res;
  });
  await addPackage().then((res) => {
    packagedTeam = res;
  });
});

describe("Start team", () => {
  it("Should start a team", async () => {
    await expect(
      bservice.startTeam({ teamName: packagedTeam.name })
    ).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should respond with", async () => {
    const response = await bservice.startTeam({ teamName: packagedTeam.name });
    expect(response).toMatchObject({
      result: "OK",
      team: expect.objectContaining({
        packages: expect.arrayContaining([
          expect.objectContaining({
            id: packagedTeam.packages.shift().id,
            active: true,
          }),
        ]),
      }),
    });
  });
});
