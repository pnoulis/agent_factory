import "../src/debug.js";
// import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { ENV } from "../src/config.js";
import { BackendRegistration } from "../src/backend/registration/BackendRegistration.js";
import { registrationTopics } from "../backend-topics.js";
import { afm } from "../src/afmachine/afm.js";
import { normalize as normalizeTeam } from "../src/afmachine/team/normalize.js";
import { normalize as normalizeRoster } from "../src/afmachine/roster/normalize.js";
import { normalize as normalizePackage } from "../src/afmachine/package/normalize.js";

const b = new BackendRegistration();
const task = "listTeams";
const modelResponse = {
  timestamp: 1706685352965,
  result: "OK",
  teams: [],
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

// debug(normalizeTeam(pendingPackage, { depth: 2 }));

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

// debug(normalizeTeam(loadedPackage, { depth: 2 }));

const packages = [
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
];

// debug(packages.map((pkg) => normalizePackage(pkg)));

const players = [
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
];

// debug(normalizeRoster(players, { depth: 1 }));

const teamWithPermutations = {
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
};

// debug(normalizeTeam(teamWithPermutations, { depth: 2 }));

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

debug(normalizeTeam(finishedPackage, { depth: 2 }));

// const response = await b.listTeams();
// debug(response);
// const pkgs = response.teams.map((team) => team.packages).flat();
// debug(pkgs);
// const finishedTeams = response.teams.filter((team) =>
//   /finished/i.test(team.teamState),
// );
// const loadedTeams = response.teams.filter((team) =>
//   /loaded/i.test(team.teamState),
// );
// const runningTeams = response.teams.filter((team) =>
//   /running/i.test(team.teamState),
// );
// // debug(finishedTeams);
// debug(runningTeams);
// debug(response.teams.find((team) => /finished/i.test(team.teamState)));

// describe(task, () => {
//   it("Should have a Backend API call that resolves", async () => {
//     await expect(b[task]()).resolves.toBeTruthy();
//   });
//   it("Should normalize the response", async () => {});
//   it("Should validate Backend API request schema", () => {
//     const validate = registrationTopics[task].schema.req;
//     validate({ timestamp: Date.now() });
//     expect(validate.errors).toBeNull();
//     validate({});
//     expect(validate.errors).not.toBeNull();
//   });
//   it("Should validate Backend API response schema", async () => {
//     const validate = registrationTopics[task].schema.res;
//     try {
//       const response = await b[task]();
//       validate(response);
//       expect(validate.errors).toBeNull();
//       validate({});
//       expect(validate.errors).not.toBeNull();
//     } catch (err) {
//       throw err;
//     }
//   });
//   it("Should have an Afmachine Task", async () => {
//     const response = await afm[task]();
//     expectTypeOf(response.players).toBeArray();
//   });
// });
