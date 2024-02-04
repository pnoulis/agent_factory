import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";

const task = "removeTeamPackage";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707056780735,
  teamName: "affectionate_Shelob_ct4pqxcce8w",
  packageId: 17,
};
const modelResponse = {
  timestamp: 1707056780791,
  result: "OK",
  team: {
    name: "affectionate_Shelob_ct4pqxcce8w",
    totalPoints: 0,
    teamState: null,
    created: null,
    lastRegisterAttempt: null,
    currentRoster: {
      version: 1,
      players: [
        {
          username: "g9781e0di69",
          wristbandNumber: 401,
          wristbandColor: null,
        },
        {
          username: "18tw5isjpd7e",
          wristbandNumber: 421,
          wristbandColor: null,
        },
      ],
    },
    roomType: null,
    packages: [],
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

    const {
      team: { packages },
    } = await b.addTeamPackage({
      timestamp: Date.now(),
      teamName: team.name,
      name: team.packages[0].name,
    });
    const pkg = packages.pop();

    const response = await b[task]({
      timestamp: Date.now(),
      teamName: team.name,
      packageId: pkg.id,
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
    const { package: pkg } = await afm.addTeamPackage(team, team.packages[0]);
    const response = await afm[task](team, pkg);
    expect(response).toMatchObject({ ok: true });
  });
});
