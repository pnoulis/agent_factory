import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */
import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */

describe("List registered players", () => {
  it("Should list registered players", async () => {
    await expect(
      bservice.listRegisteredPlayers({
        timestamp: Date.now(),
      })
    ).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should resolve with", async () => {
    const response = await bservice.listRegisteredPlayers({
      timestamp: Date.now(),
    });
    expect(response).toMatchObject({
      result: "OK",
      players: expect.any(Array),
    });
  });
});
