import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "startTeam";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707060079874,
  teamName: "compassionate_Melian_ktl66x5o73f",
};
const modelResponse = {
  timestamp: 1707060079952,
  result: "OK",
  team: {
    name: "compassionate_Melian_ktl66x5o73f",
    totalPoints: 0,
    teamState: null,
    created: null,
    lastRegisterAttempt: null,
    currentRoster: {
      version: 1,
      players: [
        {
          username: "cdc0t3lfjfg",
          wristbandNumber: 154,
          wristbandColor: null,
        },
        {
          username: "97tixfvlwsp",
          wristbandNumber: 255,
          wristbandColor: null,
        },
      ],
    },
    roomType: null,
    packages: [
      {
        id: 21,
        name: "Per Mission 10",
        cost: null,
        started: 1707060079921,
        ended: null,
        missions: 10,
        missionsPlayed: 0,
        active: true,
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
  it("Should validate Backend API response schema", async () => {
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

    await b.addTeamPackage({
      timestamp: Date.now(),
      teamName: team.name,
      name: team.packages[0].name,
    });

    const response = await b[task]({
      timestamp: Date.now(),
      teamName: team.name,
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
    await afm.addTeamPackage(team, team.packages[0]);
    const response = await afm[task](team);
    expect(response).toMatchObject({ ok: true });
  });
});
