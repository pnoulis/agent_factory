import { describe, it, expect } from "vitest";
import { Wristband } from "#afm/wristband/Wristband.js";
import { WRISTBAND_COLORS } from "../../src/constants.js";

const Entity = Wristband;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Wristband", () => {
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
  it("Should produce a random wristband", () => {
    const entity = random();
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("color");
    expect(entity).toHaveProperty("colorCode");
  });
  it("Should translate a wristband from afm to backend form", () => {
    const entity = random();
    const backendEntity = tobject(entity, { backendForm: true });
    expect(backendEntity).toEqual({
      wristbandNumber: entity.id,
      wristbandColor: entity.colorCode,
    });
  });
  it("Should translate a wristband from backend to afm form", () => {
    const backendEntity = tobject(random(), { backendForm: true });
    const entity = normalize(backendEntity);
    expect(entity).toEqual({
      id: backendEntity.wristbandNumber,
      colorCode: backendEntity.wristbandColor,
      color: WRISTBAND_COLORS[backendEntity.wristbandColor],
      state: "unpaired",
    });
  });
  it("Should validate a wristband", () => {
    const entity = new Entity();
    let tmp;

    // Empty device
    validate(entity);
    expect(validate.errors).not.toBeNull();

    validate(entity.tobject());
    expect(validate.errors).not.toBeNull();

    validate(entity.normalize());
    expect(validate.errors).not.toBeNull();

    // Filled device
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
