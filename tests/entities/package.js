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
  it("Should produce a random package", () => {
    const entity = random();
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("name");
    expect(entity).toHaveProperty("type");
    expect(entity).toHaveProperty("amount");
    expect(entity).toHaveProperty("cost");
    expect(entity).toHaveProperty("t_start");
    expect(entity).toHaveProperty("t_end");
    expect(entity).toHaveProperty("remainder");
    expect(entity).toHaveProperty("state");
  });
  it.only("Should translate a missions package from afm to backend form", () => {
    const entity = random({ type: PACKAGE_TYPES.missions });
    const backendEntity = tobject(entity, { backendForm: true });

    expect(backendEntity).toEqual({
      id: entity.id,
      name: entity.name,
      cost: null,
      started: entity.t_start,
      ended: entity.t_end,
      active: entity.remainder === 0 && entity.t_end == false,
      missions: entity.amount,
      missionsPlayed: entity.remainder,
    });
  });
  it.only("Should translate a time package from afm to backend form", () => {
    const entity = random({ type: PACKAGE_TYPES.time });
    const backendEntity = tobject(entity, { backendForm: true });

    expect(backendEntity).toEqual({
      id: entity.id,
      name: entity.name,
      cost: null,
      started: entity.t_start,
      ended: entity.t_end,
      active: entity.remainder === 0 && entity.t_end == false,
      duration: t_stomls(entity.amount, true),
      paused: entity.state === "paused",
    });
  });
  it.only("Should translate a missions package from backend to afm form", () => {
    const backendEntity = tobject(random({ type: PACKAGE_TYPES.missions }), {
      backendForm: true,
    });
    debug(backendEntity);
    const entity = normalize(backendEntity);
    debug(entity);

    expect(entity).toEqual({
      id: backendEntity.id,
      name: backendEntity.name,
      type: Object.hasOwn(backendEntity, "missions") && PACKAGE_TYPES.missions,
      amount: backendEntity.missions,
      cost: null,
      t_start: backendEntity.started,
      t_end: backendEntity.ended,
      remainder: backendEntity.missionsPlayed,
      state: entity.state,
    });
  });
  it("Should translate a package from backend to afm form", () => {
    let backendEntity = tobject(random({ type: PACKAGE_TYPES.missions }), {
      backendForm: true,
    });
    let entity = normalize(backendEntity);

    let remainder;
    let amount;
    let type;
    if (Object.hasOwn(backendEntity, "missions")) {
      type = PACKAGE_TYPES.missions;
      amount = backendEntity.missionsPlayed;
      remainder = backendEntity.amount - backendEntity.missionsPlayed;
    } else {
      type = PACKAGE_TYPES.time;
      amount = backendEntity.duration;
    }
    const sharedProps = {
      id: entity.id,
      name: entity.name,
      cost: entity.cost,
      type: Object.hasOwn(backendEntity, "missions")
        ? PACKAGE_TYPES.missions
        : PACKAGE_TYPES.time,
      started: entity.t_start,
      ended: entity.t_end,
    };

    if (Object.hasOwn(backendEntity, "missions")) {
      expect(entity).toEqual({
        ...sharedProps,
        amount: backendEntity.missions,
        remainder: entity.missionsPlayed,
      });
    } else {
      // time
      expect(backendEntity).toEqual({
        ...sharedProps,
        amount: backendEntity.duration,
      });
    }
    expect(entity).toEqual({
      id: backendEntity.packageId,
      type: backendEntity.packageType,
      room: backendEntity.roomType,
    });
  });
  it("Should validate a package", () => {
    const entity = new Entity();
    let tmp;

    // Empty package
    validate(entity);
    expect(validate.errors).not.toBeNull();

    validate(entity.tobject());
    expect(validate.errors).not.toBeNull();

    validate(entity.normalize());
    expect(validate.errors).not.toBeNull();

    // Filled package
    validate((tmp = entity.fill()));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.normalize()));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.tobject()));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();
  });
});
