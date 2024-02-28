import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomTeam } from "../src/afmachine/team/random.js";

const task = "addTeamPackage";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707053008561,
  teamName: "hopeful_Feanor_ng2coekx3lc",
  name: "Per Time 30",
};
const modelResponse = {
  timestamp: 1707053008626,
  result: "OK",
  team: {
    name: "hopeful_Feanor_ng2coekx3lc",
    totalPoints: 0,
    teamState: null,
    created: null,
    lastRegisterAttempt: null,
    currentRoster: {
      version: 1,
      players: [
        {
          username: "c77r5w5mod2",
          wristbandNumber: 455,
          wristbandColor: null,
        },
        {
          username: "hndfw7wu1a",
          wristbandNumber: 347,
          wristbandColor: null,
        },
      ],
    },
    roomType: null,
    packages: [
      {
        id: 10,
        name: "Per Time 30",
        cost: null,
        started: null,
        ended: null,
        duration: 1800.0,
        paused: false,
        active: false,
      },
    ],
  },
};

describe(task, () => {
  it("Should validate the Model Request", () => {
    const validate = topics[task].schema.req;
    if (validate === null) return;
    validate(modelRequest);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate the Model Response", () => {
    const validate = topics[task].schema.res;
    validate(modelResponse);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should validate and normalize the Backend response", async () => {
    const validate = topics[task].schema.res;
    const team = afm.create
      .teamFactory()()
      .fill(null, { depth: 2, packages: 1, players: 2 });
    if (team.roster[0].wristband.id === team.roster[1].wristband.id) {
      team.roster[0].wristband.id++;
    }
    await Promise.all(
      team.roster.map((p) => b.registerPlayer({ ...p, password: p.username })),
    );
    await Promise.all(
      team.roster.map((p) =>
        b.registerWristband({
          timestamp: Date.now(),
          username: p.username,
          wristbandNumber: p.wristband.id,
        }),
      ),
    );
    await b.registerTeam({
      timestamp: Date.now(),
      teamName: team.name,
      usernames: team.roster.map((p) => p.username),
    });

    const response = await b[task]({
      timestamp: Date.now(),
      teamName: team.name,
      name: team.packages[0].name,
    });

    validate(response);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it("Should have an Afmachine Task", async () => {
    const team = afm.create
      .teamFactory()()
      .fill(null, { depth: 2, packages: 1, players: 2 });
    await Promise.all(
      team.roster.map((p) =>
        afm.registerPlayer(p, p.username).then(() => p.setState("registered")),
      ),
    );
    await Promise.all(
      team.roster.map((p) =>
        afm
          .registerWristband(p, p.wristband)
          .then(() => p.wristband.setState("paired")),
      ),
    );

    await afm.registerTeam(team).then(() => team.setState("registered"));
    const response = await afm[task](team, team.packages[0]);
    expect(response).toMatchObject({ ok: true });
  });
});
