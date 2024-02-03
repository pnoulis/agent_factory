import { describe, it, expect, beforeAll, expectTypeOf } from "vitest";
import { random as randomPlayer } from "../src/afmachine/player/random.js";
import { normalize as normalizePlayer } from "../src/afmachine/player/normalize.js";

const task = "registerPlayer";
const b = globalThis.backend;
const afm = globalThis.afm;
const topics = globalThis.topics;
const modelRequest = {
  timestamp: 1706724066778,
  username: "test",
  surname: "test",
  name: "test",
  email: "test@gmail.com",
  password: "testpass",
};
const modelResponse = {
  timestamp: 1706874481773,
  result: "OK",
  player: {
    name: "test",
    surname: "test",
    username: "test",
    email: "test@gmail.com",
    wristbandColor: null,
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
    try {
      const response = await b[task]({
        ...randomPlayer(null, { password: true }),
      });
      validate(response);
      if (validate.errors) {
        console.log(validate.errors);
      }
      expect(validate.errors).toBeNull();
      validate({});
      expect(validate.errors).not.toBeNull();

      expect(response).toHaveProperty("player");
      expect(normalizePlayer(response.player, { state: "registered" })).toEqual(
        {
          name: response.player.name,
          surname: response.player.surname,
          username: response.player.username,
          email: response.player.email,
          state: "registered",
          wristband: {},
        },
      );
    } catch (err) {
      throw err;
    }
  });
  it("Should have an Afmachine Task", async () => {
    const player = afm.createPlayer().fill(null, { password: true });
    const response = await afm[task](player, player.password);
    expect(response).toEqual({
      ok: true,
      player: player.tobject(),
    });
  });
});
