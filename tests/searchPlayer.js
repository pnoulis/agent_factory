import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomPlayer } from "../src/afmachine/player/random.js";

const task = "searchPlayer";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1707068032950,
  searchTerm: "l",
};
const modelResponse = {
  timestamp: 1707067665549,
  result: "OK",
  players: [
    {
      username: "jgtcqvlxs6",
      name: "Tuor",
      surname: "vigorous",
      email: "jgtcqvlxs6@gmail.com",
      wristbandMerged: false,
      wristband: null,
    },
    {
      username: "TG96",
      name: null,
      surname: null,
      email: "TG96@maze.com",
      wristbandMerged: false,
      wristband: null,
    },
    {
      username: "li",
      name: "Melian",
      surname: "epic",
      email: "ki3fc4jx7jp@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 329, wristbandColor: null, active: true },
    },
    {
      username: "lo",
      name: "Idril",
      surname: "brave",
      email: "nsevvxw4ca6@gmail.com",
      wristbandMerged: false,
      wristband: { wristbandNumber: 111, wristbandColor: 2, active: true },
    },
  ],
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
      // register wristband, without scan
      randomPlayer({ username: "test1" }, { depth: 1 }),
      // scan and register wristband
      randomPlayer({ username: "test2" }, { depth: 1 }),
      // without name or surname
      randomPlayer({ username: "test3" }),
      // with all properties
      randomPlayer({ username: "test4" }),
    ];

    // without scan
    await b.registerPlayer({ ...players[0], password: players[0].username });
    await b.registerWristband({
      timestamp: Date.now(),
      username: players[0].username,
      wristbandNumber: players[0].wristband.id,
    });
    const scan = b.scanWristband();
    globalThis.reader.read({
      id: players[1].wristband.id,
      color: players[1].wristband.colorCode,
    });
    const {
      wristband: { wristbandNumber, wristbandColor },
    } = await scan;
    expect(wristbandNumber).toEqual(players[1].wristband.id);
    expect(wristbandColor).toEqual(players[1].wristband.colorCode);
    await b.registerPlayer({ ...players[1], password: players[1].username });
    // scanned
    await b.registerWristband({
      timestamp: Date.now(),
      username: players[1].username,
      wristbandNumber: players[1].wristband.id,
    });
    // no scan,
    await b.registerPlayer({
      ...players[2],
      name: "",
      surname: "",
      password: players[2].username,
    });
    // no scan
    await b.registerPlayer({ ...players[3], password: players[3].username });
    const response = await b[task]({
      timestamp: Date.now(),
      searchTerm: "test",
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
    const validate = topics[task].schema.res;
    const players = [
      // register wristband, without scan
      randomPlayer({ username: "test21" }, { depth: 1 }),
      // scan and register wristband
      randomPlayer({ username: "test22" }, { depth: 1 }),
      // without name or surname
      randomPlayer({ username: "test23" }),
      // with all properties
      randomPlayer({ username: "test24" }),
    ];

    // without scan
    await b.registerPlayer({ ...players[0], password: players[0].username });
    await b.registerWristband({
      timestamp: Date.now(),
      username: players[0].username,
      wristbandNumber: players[0].wristband.id,
    });
    const scan = b.scanWristband();
    globalThis.reader.read({
      id: players[1].wristband.id,
      color: players[1].wristband.colorCode,
    });
    const {
      wristband: { wristbandNumber, wristbandColor },
    } = await scan;
    expect(wristbandNumber).toEqual(players[1].wristband.id);
    expect(wristbandColor).toEqual(players[1].wristband.colorCode);
    await b.registerPlayer({ ...players[1], password: players[1].username });
    // scanned
    await b.registerWristband({
      timestamp: Date.now(),
      username: players[1].username,
      wristbandNumber: players[1].wristband.id,
    });
    // no scan,
    await b.registerPlayer({
      ...players[2],
      name: "",
      surname: "",
      password: players[2].username,
    });
    // no scan
    await b.registerPlayer({ ...players[3], password: players[3].username });
    await expect(afm[task]("test2")).resolves.toMatchObject({
      ok: true,
    });
  });
});
