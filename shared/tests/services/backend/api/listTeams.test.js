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
import { registerTeam } from "../../../../scripts/registerTeam.js";

beforeAll(async () => {
  await flushBackendDB();
  await registerTeam(2);
});

describe("List teams", () => {
  it("Should list teams", async () => {
    await expect(bservice.listTeams()).resolves.toMatchObject({ result: "OK" });
  });
  it("Should respond with", async () => {
    const response = await bservice.listTeams();
    expect(response).toMatchObject({
      result: "OK",
      teams: expect.any(Array),
    });
    expect(response.teams.length).toBeGreaterThan(1);
  });
});
