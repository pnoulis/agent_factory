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
  it("Should produce a random device", () => {
    const entity = random();
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("type");
    expect(entity).toHaveProperty("room");
  });
  it("Should translate a device from afm to backend form", () => {
    const entity = random();
    const backendEntity = tobject(entity, { backendForm: true });
    expect(backendEntity).toEqual({
      deviceId: entity.id,
      deviceType: entity.type,
      roomType: entity.room,
    });
  });
  it("Should translate a device from backend to afm form", () => {
    const backendEntity = tobject(random(), { backendForm: true });
    const entity = normalize(backendEntity);
    expect(entity).toEqual({
      id: backendEntity.deviceId,
      type: backendEntity.deviceType,
      room: backendEntity.roomType,
    });
  });
  it("Should validate a device", () => {
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
