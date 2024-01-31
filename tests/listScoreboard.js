import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";

const b = new BackendRegistration();
const task = "listScoreboard";
const modelResponse = {
  timestamp: 1706716622912,
  result: "OK",
  roomElementAssociations: {
    JOKER: "AIR",
    BUBBLEBOBBLE: "WATER",
    SUCKERPUNCH: "FIRE",
    GRANDPIANO: "AIR",
    JUSTDOIT: "FIRE",
    REFLECTIONS: "AIR",
    SPECTRUMDICE: "AIR",
    HIGHLIGHTBARS: "AIR",
    LASERDANCE: "WATER",
    FUNINTHEBARN: "FIRE",
    SPACEJAM: "WATER",
    ALLEYOOPS: "WATER",
    GOAL: "WATER",
    LETTERFLOOR: "AIR",
  },
  live: [],
  teamAllTime: [],
  teamMonthly: [],
  teamWeekly: [],
  teamDaily: [],

  perRoom: {
    JUSTDOIT: [
      {
        teamName: "team6",
        totalPoints: 298,
        numberOfPlayers: 2,
        created: 1702243702887,
      },
      {
        teamName: "team7",
        totalPoints: 292,
        numberOfPlayers: 2,
        created: 1702243703070,
      },
    ],
    SUCKERPUNCH: [
      {
        teamName: "team13",
        totalPoints: 297,
        numberOfPlayers: 2,
        created: 1702243704124,
      },
      {
        teamName: "team15",
        totalPoints: 291,
        numberOfPlayers: 2,
        created: 1702243704405,
      },
    ],
    LASERDANCE: [
      {
        teamName: "team5",
        totalPoints: 293,
        numberOfPlayers: 2,
        created: 1702243702676,
      },
      {
        teamName: "team19",
        totalPoints: 281,
        numberOfPlayers: 2,
        created: 1702243705036,
      },
    ],
    SPECTRUMDICE: [
      {
        teamName: "team18",
        totalPoints: 288,
        numberOfPlayers: 2,
        created: 1702243704904,
      },
      {
        teamName: "team17",
        totalPoints: 274,
        numberOfPlayers: 2,
        created: 1702243704734,
      },
    ],
    FUNINTHEBARN: [
      {
        teamName: "team2",
        totalPoints: 284,
        numberOfPlayers: 2,
        created: 1702243702245,
      },
      {
        teamName: "team11",
        totalPoints: 196,
        numberOfPlayers: 2,
        created: 1702243703820,
      },
    ],
    SPACEJAM: [
      {
        teamName: "team7",
        totalPoints: 290,
        numberOfPlayers: 2,
        created: 1702243703043,
      },
      {
        teamName: "team14",
        totalPoints: 254,
        numberOfPlayers: 2,
        created: 1702243704303,
      },
    ],
    LETTERFLOOR: [
      {
        teamName: "team10",
        totalPoints: 265,
        numberOfPlayers: 2,
        created: 1702243703549,
      },
      {
        teamName: "team16",
        totalPoints: 245,
        numberOfPlayers: 2,
        created: 1702243704627,
      },
    ],
    ALLEYOOPS: [
      {
        teamName: "team16",
        totalPoints: 297,
        numberOfPlayers: 2,
        created: 1702243704522,
      },
      {
        teamName: "team2",
        totalPoints: 280,
        numberOfPlayers: 2,
        created: 1702243702117,
      },
    ],
    GRANDPIANO: [
      {
        teamName: "team4",
        totalPoints: 291,
        numberOfPlayers: 2,
        created: 1702243702512,
      },
      {
        teamName: "team14",
        totalPoints: 287,
        numberOfPlayers: 2,
        created: 1702243704215,
      },
    ],
    BUBBLEBOBBLE: [
      {
        teamName: "team2",
        totalPoints: 285,
        numberOfPlayers: 2,
        created: 1702243702213,
      },
      {
        teamName: "team9",
        totalPoints: 262,
        numberOfPlayers: 2,
        created: 1702243703406,
      },
    ],
    JOKER: [
      {
        teamName: "team6",
        totalPoints: 283,
        numberOfPlayers: 2,
        created: 1702243702860,
      },
      {
        teamName: "team2",
        totalPoints: 257,
        numberOfPlayers: 2,
        created: 1702243702147,
      },
    ],
    HIGHLIGHTBARS: [
      {
        teamName: "team10",
        totalPoints: 298,
        numberOfPlayers: 2,
        created: 1702243703579,
      },
      {
        teamName: "team0",
        totalPoints: 289,
        numberOfPlayers: 2,
        created: 1702243701796,
      },
    ],
  },
  perElement: {
    FIRE: [
      {
        teamName: "team6",
        totalPoints: 298,
        numberOfPlayers: 2,
        created: 1702243702887,
      },
      {
        teamName: "team13",
        totalPoints: 297,
        numberOfPlayers: 2,
        created: 1702243704124,
      },
    ],
    AIR: [
      {
        teamName: "team10",
        totalPoints: 298,
        numberOfPlayers: 2,
        created: 1702243703579,
      },
      {
        teamName: "team4",
        totalPoints: 291,
        numberOfPlayers: 2,
        created: 1702243702512,
      },
    ],
    WATER: [
      {
        teamName: "team16",
        totalPoints: 297,
        numberOfPlayers: 2,
        created: 1702243704522,
      },
      {
        teamName: "team5",
        totalPoints: 293,
        numberOfPlayers: 2,
        created: 1702243702676,
      },
    ],
  },
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should validate Backend API request schema", () => {
    const validate = registrationTopics[task].schema.req;
    validate({ timestamp: Date.now() });
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = registrationTopics[task].schema.res;
    validate(modelResponse);
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
    await expect(afm[task]()).resolves.toBeTruthy();
  });
});
