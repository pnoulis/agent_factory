import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */
import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */

describe("List players with a wristband", () => {
  it("Should list players with a wristband", async () => {
    await expect(
      bservice.listWristbandPlayers({
        timestamp: Date.now(),
      }),
    ).resolves.toMatchObject({
      result: "OK",
    });
  });
  it("Should respond with", async () => {
    const response = await bservice.listWristbandPlayers({
      timestamp: Date.now(),
    });
    expect(response).toMatchObject({
      result: "OK",
      players: expect.any(Array),
    });
  });
});
