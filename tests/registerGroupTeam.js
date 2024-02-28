import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomPlayer } from "../src/afmachine/player/random.js";
import { random as randomTeam } from "../src/afmachine/team/random.js";

const task = "registerGroupTeam";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707064500654,
  teamName: "laughing_Arwen_45xkqmncf7h",
  groupPlayers: [
    {
      username: "ii6075ebbfb",
      wristbandNumber: 335,
    },
    {
      username: "v97fpbx98hc",
      wristbandNumber: 240,
    },
  ],
};
const modelResponse = {
  timestamp: 1707064500758,
  result: "OK",
  message: "successfully created group team: laughing_Arwen_45xkqmncf7h",
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
    const players = [
      randomPlayer(null, { depth: 1 }),
      randomPlayer(null, { depth: 1 }),
    ];
    const team = randomTeam({ roster: players });
    if (team.roster[0].wristband.id === team.roster[1].wristband.id) {
      team.roster[0].wristband.id++;
    }
    const response = await b[task]({
      timestamp: Date.now(),
      teamName: team.name,
      groupPlayers: team.roster.map((player) => ({
        username: player.username,
        wristbandNumber: player.wristband.id,
      })),
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
      .fill(null, { players: 2, depth: 2 });
    if (team.roster[0].wristband.id === team.roster[1].wristband.id) {
      team.roster[0].wristband.id++;
    }
    await expect(afm[task](team)).resolves.toMatchObject({ ok: true });
  });
});
