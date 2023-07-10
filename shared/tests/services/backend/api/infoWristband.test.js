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
import { registerWristband } from "../../../../scripts/registerWristband.js";
import { randomWristband } from "../../../../scripts/randomWristband.js";

const wristbands = randomWristband(5);
let registeredWristbands;

beforeAll(async () => {
  await flushBackendDB();
  await registerWristband(5).then((res) => {
    registeredWristbands = res;
  });
});

describe("Wristband info", () => {
  it("Should retrieve information about a wristband", async () => {
    await expect(
      bservice.infoWristband({
        wristbandNumber: wristbands[0].number,
      }),
    ).resolves.toMatchObject({ result: "OK" });
  });
  it("Should resolve with", async () => {
    // given an unpaired wristband
    await expect(
      bservice.infoWristband({
        wristbandNumber: wristbands[0].number,
      }),
    ).resolves.toMatchObject({
      result: "OK",
      wristband: {
        wristbandNumber: wristbands[0].number,
        wristbandColor: null,
        active: false,
      },
    });

    // given a paired wrisband
    await expect(
      bservice.infoWristband({
        wristbandNumber: registeredWristbands[0].wristband.wristbandNumber,
      }),
    ).resolves.toMatchObject({
      result: "OK",
      wristband: {
        wristbandNumber: registeredWristbands[0].wristband.wristbandNumber,
        wristbandColor: null,
        active: true,
      },
    });
  });
});
