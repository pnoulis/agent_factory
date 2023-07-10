import { describe, it, expect } from "vitest";

/*
  TESTING COMPONENTS
 */

import { CreateBackendService } from "../../../../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();

/*
  DEPENDENCIES
 */
import { flushBackendDB } from "../../../../scripts/flushBackendDB.js";
import { randomWristband } from "../../../../scripts/randomWristband.js";

describe("Wristband scan subscription", () => {
  it("Should subscribe to a wristband scan", async () => {
    await expect(
      bservice.subscribeWristbandScan(() => {}),
    ).resolves.toBeTruthy();
  });
  it("Should resolve with", async () => {
    await expect(bservice.subscribeWristbandScan(() => {})).resolves.toBeTypeOf(
      "function",
    );
  });
});
