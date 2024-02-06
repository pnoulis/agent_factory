import { describe, it, expect } from "vitest";
import { Cashier } from "#afm/cashier/Cashier.js";

const Entity = Cashier;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Cashier", () => {
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
  it("Should produce a random cashier", () => {
    const entity = random();
    expect(entity).toHaveProperty("id");
    expect(entity).toHaveProperty("username");
    expect(entity).toHaveProperty("email");
    expect(entity).toHaveProperty("role");
  });
  it("Should translate a cashier from afm to backend form", () => {
    const entity = random();
    const backendEntity = tobject(entity, { backendForm: true });
    expect(backendEntity).toEqual({
      id: entity.id,
      username: entity.username,
      email: entity.email,
      roles: [`ROLE_${entity.role}`.toUpperCase()],
    });
  });
  it("Should translate a cashier from backend to afm form", () => {
    const backendEntity = tobject(random(), { backendForm: true });
    const entity = normalize(backendEntity);
    expect(entity).toEqual({
      id: backendEntity.id,
      username: backendEntity.username,
      email: backendEntity.email,
      role: backendEntity.roles.at(0).split("_").at(1).toLowerCase(),
    });
  });
  it("Should validate a cashier", () => {
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
