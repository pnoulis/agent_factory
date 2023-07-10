import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */
import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */

describe("boot", () => {
  it("Should boot", async () => {
    await expect(bservice.boot()).resolves.toMatchObject({ result: "OK" });
  });
  it("Should resolve with", async () => {
    const response = await bservice.boot();
    expect(response).toMatchObject({
      result: "OK",
      deviceId: bservice.id,
      deviceType: bservice.deviceType,
      roomName: bservice.roomName,
    });
  });
});
