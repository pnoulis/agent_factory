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
import { randomPackage } from "../../../../scripts/randomPackage.js";
import { AF_PACKAGES } from "../../../../constants.js";

let packages = randomPackage(5);
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

describe("Remove package", () => {
  it("Should remove a package", async () => {
    await expect(
      bservice.removePackage({
        teamName: packagedTeam.name,
        packageId: packagedTeam.packages.pop().id,
      })
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.removePackage({
      teamName: packagedTeam.name,
      packageId: packagedTeam.packages.pop().id,
    });

    expect(response).toMatchObject({
      result: "OK",
      team: expect.objectContaining({
        packages: expect.any(Array),
      }),
    });
    expect(response.team.packages).toHaveLength(0);
  });
});
