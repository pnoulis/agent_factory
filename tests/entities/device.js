import { describe, it, expect } from "vitest";
import { Device } from "#afm/device/Device.js";

const Entity = Device;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Device", () => {
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
  it("Should be a valid afm device", () => {
    const entity = new Entity();
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();
  });
  it("Should be an invalid afm device", () => {
    const entity = new Entity();
    expect(validate(entity)).not.toBeNull();
    expect(validate(entity.tobject())).not.toBeNull();
    expect(validate(entity.normalize())).not.toBeNull();
  });
  it("Should be a valid backend form device", () => {
    const entity = new Entity();
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
  it("Should be an invalid backend form device", () => {
    let entity = new Entity();
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).not.toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();
  });
  it("Should translate device across forms", () => {
    // afm to backend
    let backendDevice = new Entity().fill().tobject({ backendForm: true });
    expect(validate(backendDevice, { backendForm: true })).toBeNull();
    let afmDevice = normalize(backendDevice);
    expect(validate(afmDevice)).toBeNull();
  });
});
