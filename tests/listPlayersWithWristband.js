import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";
import { normalize as normalizePlayer } from "../src/afmachine/player/normalize.js";

const b = new BackendRegistration();
const task = "listPlayersWithWristband";
const modelResponse = {
  timestamp: 1706649848057,
  result: "OK",
  players: [
    {
      username: "Gilgalad_wsai1ooow3",
      name: "Gilgalad",
      surname: "sweet",
      email: "Gilgalad@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 232, wristbandColor: 4, active: true },
    },
    {
      username: "Gandalf_deil7sv8j4c",
      name: "Gandalf",
      surname: "busy",
      email: "Gandalf@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 233, wristbandColor: 4, active: true },
    },
    {
      username: "Galadriel_12k3dw52kkhi",
      name: "Galadriel",
      surname: "jovial",
      email: "Galadriel@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 235, wristbandColor: 5, active: true },
    },
  ],
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should normalize the response", async () => {
    const normalized = modelResponse.players.map((player) =>
      normalizePlayer(player, { depth: 1, state: "registered" }),
    );

    expect(normalized).toEqual(
      expect.arrayContaining([
        {
          username: "Gilgalad_wsai1ooow3",
          name: "Gilgalad",
          surname: "sweet",
          email: "Gilgalad@gmail.com",
          state: "registered",
          wristband: {
            id: 232,
            color: "yellow",
            colorCode: 4,
            state: "paired",
          },
        },
        {
          username: "Gandalf_deil7sv8j4c",
          name: "Gandalf",
          surname: "busy",
          email: "Gandalf@gmail.com",
          state: "registered",
          wristband: {
            id: 233,
            color: "yellow",
            colorCode: 4,
            state: "paired",
          },
        },
        {
          username: "Galadriel_12k3dw52kkhi",
          name: "Galadriel",
          surname: "jovial",
          email: "Galadriel@gmail.com",
          state: "registered",
          wristband: { id: 235, color: "blue", colorCode: 5, state: "paired" },
        },
      ]),
    );
  });
  it("Should validate Backend API request schema", () => {
    const validate = registrationTopics[task].schema.req;
    validate({ timestamp: Date.now() });
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = registrationTopics[task].schema.res;
    try {
      const response = await b[task]();
      validate(response);
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    const response = await afm[task]();
    expectTypeOf(response.players).toBeArray();
  });
});
