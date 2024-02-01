import "../src/debug.js";
import { delay } from "js_utils/misc";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { normalize as normalizePlayer } from "../src/afmachine/player/normalize.js";

const b = globalThis.backend;
const topics = globalThis.topics;
const modelResponse = {
  timestamp: 1706642934817,
  result: "OK",
  players: [
    {
      username: "Merry_2mpmnxcgv1s",
      name: "Merry",
      surname: "compassionate",
      email: "Merry@gmail.com",
      wristbandMerged: false,
      wristband: null,
    },
    {
      username: "Wormtongue_klagnkjxqla",
      name: "Wormtongue",
      surname: "jovial",
      email: "Wormtongue@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 230, wristbandColor: 3, active: true },
    },
    {
      username: "6t3o5ds227u",
      name: null,
      surname: null,
      email: null,
      wristbandMerged: false,
      wristband: null,
    },
    {
      username: "Elrond_6ofeexn83ma",
      name: "Elrond",
      surname: "vigilant",
      email: "Elrond@gmail.com",
      wristbandMerged: true,
      wristband: { wristbandNumber: 231, wristbandColor: 4, active: true },
    },
    {
      username: "ppthree",
      name: "yolothree",
      surname: "ggthree",
      email: "ggthree@gmail.com",
      wristbandMerged: false,
      wristband: null,
    },
  ],
};
const task = "listPlayers";

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should normalize the response", () => {
    const normalized = modelResponse.players.map((pl) =>
      normalizePlayer(pl, { defaultState: "registered", depth: 1 }),
    );

    expect(normalized).toEqual(
      expect.arrayContaining([
        {
          username: "Merry_2mpmnxcgv1s",
          name: "Merry",
          surname: "compassionate",
          email: "Merry@gmail.com",
          state: "registered",
          wristband: {
            id: null,
            color: "",
            colorCode: null,
            state: "unpaired",
          },
        },
        {
          username: "Wormtongue_klagnkjxqla",
          name: "Wormtongue",
          surname: "jovial",
          email: "Wormtongue@gmail.com",
          state: "registered",
          wristband: { id: 230, color: "green", colorCode: 3, state: "paired" },
        },
        {
          username: "6t3o5ds227u",
          name: "",
          surname: "",
          email: "",
          state: "registered",
          wristband: {
            id: null,
            color: "",
            colorCode: null,
            state: "unpaired",
          },
        },
        {
          username: "Elrond_6ofeexn83ma",
          name: "Elrond",
          surname: "vigilant",
          email: "Elrond@gmail.com",
          state: "inTeam",
          wristband: {
            id: 231,
            color: "yellow",
            colorCode: 4,
            state: "paired",
          },
        },
        {
          username: "ppthree",
          name: "yolothree",
          surname: "ggthree",
          email: "ggthree@gmail.com",
          state: "registered",
          wristband: {
            id: null,
            color: "",
            colorCode: null,
            state: "unpaired",
          },
        },
      ]),
    );
  });
  it("Should validate Backend API request schema", () => {
    const validate = topics[task].schema.req;
    validate({ timestamp: Date.now() });
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[task].schema.res;
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
    await expect(afm[task]()).resolves.toBeTruthy();
  });
});
