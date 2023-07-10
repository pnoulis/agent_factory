import { describe, it, expect, beforeAll } from "vitest";

/*
  TESTING COMPONENTS
 */
import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */

describe("List teams", () => {
  it("Should list teams", async () => {
    await expect(bservice.listTeams()).resolves.toMatchObject({ result: "OK" });
  });
  it("Should resolve with", async () => {
    const response = await bservice.listPackages();
    expect(response).toMatchObject({
      result: "OK",
      packages: expect.any(Array),
    });

    expect(response.packages.length).toBeGreaterThan(0);
  });
});
