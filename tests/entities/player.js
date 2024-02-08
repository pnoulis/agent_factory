import { describe, it, expect } from "vitest";
import { Player } from "#afm/player/Player.js";
import { Wristband } from "#afm/wristband/Wristband.js";

const Entity = Player;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Player", () => {
  it("Should implement the standard interface", () => {
    expect(random).toBeTypeOf("function");
    expect(normalize).toBeTypeOf("function");
    expect(validate).toBeTypeOf("function");
    expect(tobject).toBeTypeOf("function");
    const entity = new Entity();
    expect(entity).toHaveProperty("fill");
    expect(entity.fill).toBeTypeOf("function");
    expect(entity).toHaveProperty("normalize");
    expect(entity.normalize).toBeTypeOf("function");
    expect(entity).toHaveProperty("tobject");
    expect(entity.tobject).toBeTypeOf("function");
  });
  it("should be a valid afm player", () => {
    // registered
    let entity = new Entity({ state: "registered" }, new Wristband());
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();

    // inTeam
    entity = new Entity({ state: "inTeam" }, new Wristband());
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();

    // playing
    entity = new Entity({ state: "playing" }, new Wristband());
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();
  });
  it("Should be an invalid afm player", () => {
    // Without a wristband
    let entity = new Entity({ state: "registered" });
    expect(() => entity.fill()).toThrowError(TypeError);
    expect(() => entity.fill()).toThrowError("Missing wristband");

    // default, Unregistered
    entity = new Entity(null, new Wristband());
    expect(validate(entity.fill())).not.toBeNull();
    expect(validate(entity.normalize())).not.toBeNull();
    expect(validate(entity.tobject())).not.toBeNull();

    // unregistered
    entity = new Entity({ state: "unregistered" }, new Wristband());
    expect(validate(entity.fill())).not.toBeNull();
    expect(validate(entity.normalize())).not.toBeNull();
    expect(validate(entity.tobject())).not.toBeNull();
  });
  it("Should be a valid backend form player", () => {
    // registered
    let entity = new Entity({ state: "registered" }, new Wristband());
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).toBeNull();
    // inTeam
    entity = new Entity({ state: "inTeam" }, new Wristband());
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).toBeNull();

    // playing
    entity = new Entity({ state: "playing" }, new Wristband());
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).toBeNull();
  });
  it("Should be an invalid backend form player", () => {
    // unregistered
    let entity = new Entity(null, new Wristband());
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).not.toBeNull();
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();
  });
  it("Should translate players across forms", () => {
    const entity = new Entity({ state: "unregistered" }, new Wristband());
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual(
      entity.tobject(),
    );

    entity.fill(null, { state: "registered" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual({
      ...entity.tobject(),
      state: "unregistered",
    });

    entity.fill(null, { state: "inTeam" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual({
      ...entity.tobject(),
      state: "unregistered",
    });

    entity.fill(null, { state: "playing" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual({
      ...entity.tobject(),
      state: "unregistered",
    });
  });
  it("Should merge players in all forms", () => {
    expect(
      normalize([
        new Entity({ username: "test" }),
        new Entity({ username: "test2" }),
      ]),
    ).toMatchObject({
      username: "test2",
    });

    expect(
      normalize([
        new Entity({ username: "test" }).tobject({ backendForm: true }),
        new Entity({ username: "test2" }).tobject({ backendForm: true }),
      ]),
    ).toEqual(new Entity({ username: "test2" }).tobject());
  });
});
