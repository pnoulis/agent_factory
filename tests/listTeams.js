import "../src/debug.js";
import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { normalize as normalizeTeam } from "../src/afmachine/team/normalize.js";
import { normalize as normalizeRoster } from "../src/afmachine/roster/normalize.js";
import { normalize as normalizePackage } from "../src/afmachine/package/normalize.js";

const b = globalThis.backend;
const topics = globalThis.topics;
const task = "listTeams";
const modelResponse = {
  timestamp: 1706685352965,
  result: "OK",
  teams: [
    {
      name: "friendly_Eomer_c3d",
      totalPoints: 0,
      teamState: "FINISHED",
      created: 1706472198904,
      lastRegisterAttempt: null,
      currentRoster: {
        version: 1,
        players: [
          {
            username: "test1",
            wristbandNumber: null,
            wristbandColor: null,
          },
          {
            username: "test2",
            wristbandNumber: 1,
            wristbandColor: 2,
          },
          {
            username: "test3",
            wristbandNumber: 1,
            wristbandColor: null,
          },
          {
            username: "test4",
            wristbandNumber: null,
            wristbandColor: 2,
          },
        ],
      },
      roomType: null,
      packages: [
        {
          // missions registered
          id: 1,
          name: "Per Mission 5",
          cost: null,
          started: null,
          ended: null,
          missions: 5,
          missionsPlayed: 0,
          active: false,
        },
        {
          // missions being played
          id: 2,
          name: "Per Mission 10",
          cost: null,
          started: 1706686189153,
          ended: null,
          missions: 10,
          missionsPlayed: 5,
          active: true,
        },
        {
          // missions completed
          id: 3,
          name: "Per Mission 20",
          cost: null,
          started: 1706686189153,
          ended: 1706686199999,
          missions: 20,
          missionsPlayed: 20,
          active: false,
        },
        {
          // time registered
          id: 8,
          name: "Per Time 30",
          cost: null,
          started: null,
          ended: null,
          duration: 1800,
          paused: false,
          active: false,
        },
        {
          // time being played
          id: 5,
          name: "Per Time 60",
          cost: null,
          started: 1706685129723,
          ended: null,
          duration: 5400,
          paused: false,
          active: true,
        },
        {
          // time finished
          id: 3,
          name: "Per Time 90",
          cost: null,
          started: 1706473426225,
          ended: 1706478843795,
          duration: 1800,
          paused: false,
          active: false,
        },
      ],
    },
    {
      name: "inspiring_Goldberry",
      totalPoints: 0,
      teamState: "PACKAGE_RUNNING",
      created: 1706684656827,
      lastRegisterAttempt: null,
      currentRoster: {
        version: 1,
        players: [
          {
            username: "Sauron_0h96h9q4xixv",
            wristbandNumber: 241,
            wristbandColor: 2,
          },
          { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
        ],
      },
      roomType: null,
      packages: [
        {
          id: 5,
          name: "Per Time 90",
          cost: null,
          started: 1706685129723,
          ended: null,
          duration: 5400,
          paused: false,
          active: true,
        },
      ],
    },
    {
      name: "inspiring_Goldberry",
      totalPoints: 0,
      teamState: "PENDING_PACKAGES",
      created: 1706684656827,
      lastRegisterAttempt: null,
      currentRoster: {
        version: 1,
        players: [
          { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
          {
            username: "Sauron_0h96h9q4xixv",
            wristbandNumber: 241,
            wristbandColor: 2,
          },
        ],
      },
      roomType: null,
      packages: [],
    },
    {
      name: "inspiring_Goldberry",
      totalPoints: 0,
      teamState: "LOADED_PACKAGES",
      created: 1706684656827,
      lastRegisterAttempt: null,
      currentRoster: {
        version: 1,
        players: [
          {
            username: "Sauron_0h96h9q4xixv",
            wristbandNumber: 241,
            wristbandColor: 2,
          },
          { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
        ],
      },
      roomType: null,
      packages: [
        {
          id: 4,
          name: "Per Mission 20",
          cost: null,
          started: null,
          ended: null,
          missions: 20,
          missionsPlayed: 0,
          active: false,
        },
      ],
    },
    {
      name: "friendly_Eomer_c3d",
      totalPoints: 0,
      teamState: "FINISHED",
      created: 1706472198904,
      lastRegisterAttempt: null,
      currentRoster: {
        version: 1,
        players: [
          {
            username: "0a5sh6llqf3v",
            wristbandNumber: null,
            wristbandColor: null,
          },
          {
            username: "3q0vtxg1o7s",
            wristbandNumber: null,
            wristbandColor: null,
          },
        ],
      },
      roomType: null,
      packages: [
        {
          id: 1,
          name: "Per Mission 10",
          cost: null,
          started: 1706472302416,
          ended: 1706475903814,
          missions: 10,
          missionsPlayed: 0,
          active: false,
        },
      ],
    },
  ],
};
const pendingPackage = {
  name: "inspiring_Goldberry",
  totalPoints: 0,
  teamState: "PENDING_PACKAGES",
  created: 1706684656827,
  lastRegisterAttempt: null,
  currentRoster: {
    version: 1,
    players: [
      { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
      {
        username: "Sauron_0h96h9q4xixv",
        wristbandNumber: 241,
        wristbandColor: 2,
      },
    ],
  },
  roomType: null,
  packages: [],
};
const loadedPackage = {
  name: "inspiring_Goldberry",
  totalPoints: 0,
  teamState: "LOADED_PACKAGES",
  created: 1706684656827,
  lastRegisterAttempt: null,
  currentRoster: {
    version: 1,
    players: [
      {
        username: "Sauron_0h96h9q4xixv",
        wristbandNumber: 241,
        wristbandColor: 2,
      },
      { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
    ],
  },
  roomType: null,
  packages: [
    {
      id: 4,
      name: "Per Mission 20",
      cost: null,
      started: null,
      ended: null,
      missions: 20,
      missionsPlayed: 0,
      active: false,
    },
  ],
};
const runningPackage = {
  name: "inspiring_Goldberry",
  totalPoints: 0,
  teamState: "PACKAGE_RUNNING",
  created: 1706684656827,
  lastRegisterAttempt: null,
  currentRoster: {
    version: 1,
    players: [
      {
        username: "Sauron_0h96h9q4xixv",
        wristbandNumber: 241,
        wristbandColor: 2,
      },
      { username: "ppone", wristbandNumber: 240, wristbandColor: 1 },
    ],
  },
  roomType: null,
  packages: [
    {
      id: 5,
      name: "Per Time 90",
      cost: null,
      started: 1706685129723,
      ended: null,
      duration: 5400,
      paused: false,
      active: true,
    },
  ],
};
const finishedPackage = {
  name: "friendly_Eomer_c3d",
  totalPoints: 0,
  teamState: "FINISHED",
  created: 1706472198904,
  lastRegisterAttempt: null,
  currentRoster: {
    version: 1,
    players: [
      {
        username: "0a5sh6llqf3v",
        wristbandNumber: null,
        wristbandColor: null,
      },
      {
        username: "3q0vtxg1o7s",
        wristbandNumber: null,
        wristbandColor: null,
      },
    ],
  },
  roomType: null,
  packages: [
    {
      id: 1,
      name: "Per Mission 10",
      cost: null,
      started: 1706472302416,
      ended: 1706475903814,
      missions: 10,
      missionsPlayed: 0,
      active: false,
    },
  ],
};

describe(task, () => {
  it("Should have a Backend API call that resolves", async () => {
    await expect(b[task]()).resolves.toBeTruthy();
  });
  it("Should normalize a PENDING_PACKAGES Team", () => {
    const normalized = normalizeTeam(pendingPackage, { depth: 2 });
    expect(normalized).toEqual({
      name: "inspiring_Goldberry",
      t_created: 1706684656827,
      points: 0,
      packages: [],
      roster: [
        {
          username: "ppone",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: {
            id: 240,
            color: "red",
            colorCode: 1,
            state: "paired",
          },
        },
        {
          username: "Sauron_0h96h9q4xixv",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: {
            id: 241,
            color: "purple",
            colorCode: 2,
            state: "paired",
          },
        },
      ],
      state: "registered",
    });
  });
  it("Should normalize a LOADED_PACKAGES Team", () => {
    const normalized = normalizeTeam(loadedPackage, { depth: 2 });
    expect(normalized).toEqual({
      name: "inspiring_Goldberry",
      t_created: 1706684656827,
      points: 0,
      packages: [
        {
          id: 4,
          name: "Per Mission 20",
          type: "mission",
          amount: 20,
          cost: 0,
          t_start: null,
          t_end: null,
          remainder: 20,
          state: "registered",
        },
      ],
      roster: [
        {
          username: "Sauron_0h96h9q4xixv",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: {
            id: 241,
            color: "purple",
            colorCode: 2,
            state: "paired",
          },
        },
        {
          username: "ppone",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
        },
      ],
      state: "registered",
    });
  });
  it("Should normalize a PACKAGE_RUNNING Team", () => {
    const normalized = normalizeTeam(runningPackage, { depth: 2 });
    expect(normalized).toEqual({
      name: "inspiring_Goldberry",
      t_created: 1706684656827,
      points: 0,
      packages: [
        {
          id: 5,
          name: "Per Time 90",
          type: "time",
          amount: 90,
          cost: 0,
          t_start: 1706685129723,
          t_end: null,
          remainder: 0,
          state: "playing",
        },
      ],
      roster: [
        {
          username: "Sauron_0h96h9q4xixv",
          name: "",
          surname: "",
          email: "",
          state: "playing",
          wristband: {
            id: 241,
            color: "purple",
            colorCode: 2,
            state: "paired",
          },
        },
        {
          username: "ppone",
          name: "",
          surname: "",
          email: "",
          state: "playing",
          wristband: { id: 240, color: "red", colorCode: 1, state: "paired" },
        },
      ],
      state: "playing",
    });
  });
  it("Should normalize a FINISHED Team", () => {
    const normalized = normalizeTeam(finishedPackage, { depth: 2 });
    expect(normalized).toEqual({
      name: "friendly_Eomer_c3d",
      t_created: 1706472198904,
      points: 0,
      packages: [
        {
          id: 1,
          name: "Per Mission 10",
          type: "mission",
          amount: 10,
          cost: 0,
          t_start: 1706472302416,
          t_end: 1706475903814,
          remainder: 10,
          state: "completed",
        },
      ],
      roster: [
        {
          username: "0a5sh6llqf3v",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: {
            id: null,
            color: "",
            colorCode: null,
            state: "unpaired",
          },
        },
        {
          username: "3q0vtxg1o7s",
          name: "",
          surname: "",
          email: "",
          state: "inTeam",
          wristband: {
            id: null,
            color: "",
            colorCode: null,
            state: "unpaired",
          },
        },
      ],
      state: "registered",
    });
  });
  it("Should normalize the model response", () => {
    const normalized = modelResponse.teams.map((team) =>
      normalizeTeam(team, { depth: 2 }),
    );
    expect(normalized).toEqual(
      expect.arrayContaining([
        {
          name: "friendly_Eomer_c3d",
          t_created: 1706472198904,
          points: 0,
          packages: [
            {
              id: 1,
              name: "Per Mission 5",
              type: "mission",
              amount: 5,
              cost: 0,
              t_start: null,
              t_end: null,
              remainder: 5,
              state: "registered",
            },
            {
              id: 2,
              name: "Per Mission 10",
              type: "mission",
              amount: 10,
              cost: 0,
              t_start: 1706686189153,
              t_end: null,
              remainder: 5,
              state: "playing",
            },
            {
              id: 3,
              name: "Per Mission 20",
              type: "mission",
              amount: 20,
              cost: 0,
              t_start: 1706686189153,
              t_end: 1706686199999,
              remainder: 0,
              state: "completed",
            },
            {
              id: 8,
              name: "Per Time 30",
              type: "time",
              amount: 30,
              cost: 0,
              t_start: null,
              t_end: null,
              remainder: 0,
              state: "registered",
            },
            {
              id: 5,
              name: "Per Time 60",
              type: "time",
              amount: 90,
              cost: 0,
              t_start: 1706685129723,
              t_end: null,
              remainder: 0,
              state: "playing",
            },
            {
              id: 3,
              name: "Per Time 90",
              type: "time",
              amount: 30,
              cost: 0,
              t_start: 1706473426225,
              t_end: 1706478843795,
              remainder: 0,
              state: "completed",
            },
          ],
          roster: [
            {
              username: "test1",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: null,
                color: "",
                colorCode: null,
                state: "unpaired",
              },
            },
            {
              username: "test2",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: 1,
                color: "purple",
                colorCode: 2,
                state: "paired",
              },
            },
            {
              username: "test3",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: { id: 1, color: "", colorCode: null, state: "paired" },
            },
            {
              username: "test4",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: null,
                color: "purple",
                colorCode: 2,
                state: "unpaired",
              },
            },
          ],
          state: "registered",
        },
        {
          name: "inspiring_Goldberry",
          t_created: 1706684656827,
          points: 0,
          packages: [
            {
              id: 5,
              name: "Per Time 90",
              type: "time",
              amount: 90,
              cost: 0,
              t_start: 1706685129723,
              t_end: null,
              remainder: 0,
              state: "playing",
            },
          ],
          roster: [
            {
              username: "Sauron_0h96h9q4xixv",
              name: "",
              surname: "",
              email: "",
              state: "playing",
              wristband: {
                id: 241,
                color: "purple",
                colorCode: 2,
                state: "paired",
              },
            },
            {
              username: "ppone",
              name: "",
              surname: "",
              email: "",
              state: "playing",
              wristband: {
                id: 240,
                color: "red",
                colorCode: 1,
                state: "paired",
              },
            },
          ],
          state: "playing",
        },
        {
          name: "inspiring_Goldberry",
          t_created: 1706684656827,
          points: 0,
          packages: [],
          roster: [
            {
              username: "ppone",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: 240,
                color: "red",
                colorCode: 1,
                state: "paired",
              },
            },
            {
              username: "Sauron_0h96h9q4xixv",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: 241,
                color: "purple",
                colorCode: 2,
                state: "paired",
              },
            },
          ],
          state: "registered",
        },
        {
          name: "inspiring_Goldberry",
          t_created: 1706684656827,
          points: 0,
          packages: [
            {
              id: 4,
              name: "Per Mission 20",
              type: "mission",
              amount: 20,
              cost: 0,
              t_start: null,
              t_end: null,
              remainder: 20,
              state: "registered",
            },
          ],
          roster: [
            {
              username: "Sauron_0h96h9q4xixv",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: 241,
                color: "purple",
                colorCode: 2,
                state: "paired",
              },
            },
            {
              username: "ppone",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: 240,
                color: "red",
                colorCode: 1,
                state: "paired",
              },
            },
          ],
          state: "registered",
        },
        {
          name: "friendly_Eomer_c3d",
          t_created: 1706472198904,
          points: 0,
          packages: [
            {
              id: 1,
              name: "Per Mission 10",
              type: "mission",
              amount: 10,
              cost: 0,
              t_start: 1706472302416,
              t_end: 1706475903814,
              remainder: 10,
              state: "completed",
            },
          ],
          roster: [
            {
              username: "0a5sh6llqf3v",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: null,
                color: "",
                colorCode: null,
                state: "unpaired",
              },
            },
            {
              username: "3q0vtxg1o7s",
              name: "",
              surname: "",
              email: "",
              state: "inTeam",
              wristband: {
                id: null,
                color: "",
                colorCode: null,
                state: "unpaired",
              },
            },
          ],
          state: "registered",
        },
      ]),
    );
  });
  it("Should validate Backend API request schema", () => {
    expect(topics[task].schema.req).toBeNull();
  });
  it("Should validate Backend API response schema", async () => {
    const validate = topics[task].schema.res;
    try {
      const response = await b[task]();
      validate(modelResponse);
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
