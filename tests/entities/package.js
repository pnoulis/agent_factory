import { describe, it, expect } from "vitest";
import { Package } from "#afm/package/Package.js";
import { PACKAGE_TYPES } from "../../src/constants.js";
import { t_stomls } from "../../src/misc/misc.js";

const Entity = Package;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Package", () => {
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
  it("Should be a valid afm package", () => {
    // registered
    let entity = new Entity({ state: "registered" });
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();

    // playing
    entity = new Entity({ state: "playing" });
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();

    // completed
    entity = new Entity({ state: "completed" });
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();
  });
  it("Should be a valid backend form package", () => {
    let entity = new Entity({ type: "mission", state: "registered" });
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: "mission",
      }),
    ).toBeNull();

    entity = new Entity({ type: "time", state: "registered" });
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: "time",
      }),
    ).toBeNull();
  });
  it("Should translate a missions package from afm to backend form", () => {
    const entity = new Entity({
      type: PACKAGE_TYPES.missions,
      state: "registered",
    }).fill();

    const backendEntity = entity.tobject({ backendForm: true });
    expect(backendEntity).toEqual({
      id: entity.id,
      name: entity.name,
      cost: null,
      started: entity.t_start,
      ended: entity.t_end,
      active: entity.remainder === 0 && entity.t_end == false,
      missions: entity.amount,
      missionsPlayed: entity.amount - entity.remainder,
    });
  });
  it("Should translate a time package from afm to backend form", () => {
    const entity = new Entity({
      type: PACKAGE_TYPES.time,
      state: "registered",
    });
    const backendEntity = entity.tobject({ backendForm: true });

    expect(backendEntity).toEqual({
      id: entity.id,
      name: entity.name,
      cost: null,
      started: entity.t_start,
      ended: entity.t_end,
      active: entity.remainder === 0 && entity.t_end == false,
      duration: t_stomls(entity.amount, true),
      paused: false,
    });
  });
});
