import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";
import { random as randomPlayer } from "../src/afmachine/player/random.js";
import { random as randomWristband } from "../src/afmachine/wristband/random.js";
import { random as randomTeam } from "../src/afmachine/team/random.js";

const task = "registerTeam";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706979526513,
  teamName: "testTeam",
  usernames: ["9qqu592xhrg", "g0dh1umskej"],
};
const modelResponse = {
  timestamp: 1706979526580,
  result: "OK",
  message: "successfully created team: testTeam",
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
    const team = randomTeam();
    const players = [
      randomPlayer(null, { password: true }),
      randomPlayer(null, { password: true }),
    ];
    players[0].wristband = randomWristband();
    players[1].wristband = randomWristband();
    if (players[0].wristband.id === players[1].wristband.id) {
      players[0].wristband.id++;
    }
    await Promise.all(players.map((p) => b.registerPlayer(p)));
    await Promise.all(
      players.map((p) =>
        b.registerWristband({
          timestamp: Date.now(),
          username: p.username,
          wristbandNumber: p.wristband.id,
        }),
      ),
    );
    const response = await b[task]({
      timestamp: Date.now(),
      teamName: team.name,
      usernames: players.map((p) => p.username),
    });
    validate(response);
    if (validate.errors) {
      console.log(validate.errors);
    }
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
  it.todo("Should have an Afmachine Task", async () => {
    // const team = randomTeam(null, { depth: 3, size: 2, password: true });
    // const registerPlayer = (p) => afm.registerPlayer(p, p.password);
    // const pairWristband = ({ player }) =>
    //   afm.pairWristband(player, player.wristband);
    // team.players.map((player) =>
    //   Promise.resolve(player).then(registerPlayer).then(pairWristband),
    // );
  });
});
