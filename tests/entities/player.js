import { describe, it, expect } from "vitest";
import { Player } from "#afm/player/Player.js";
import { Wristband } from "#afm/wristband/Wristband.js";

const Entity = Player;
const random = Entity.random;
const normalize = Entity.normalize;
const validate = Entity.validate;
const tobject = Entity.tobject;

describe("Player", () => {
  it.only("Should implement the standard interface", () => {
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
  it('should be a valid afm player', () => {
  })
  it.todo("Should produce a random player", () => {
    const entity = random(null, { depth: 0 });
    expect(entity).toHaveProperty("username");
    expect(entity).toHaveProperty("name");
    expect(entity).toHaveProperty("surname");
    expect(entity).toHaveProperty("email");
    expect(entity).toHaveProperty("wristband");
    expect(entity.wristband).toBeNull();
  });
  it.todo("Should translate a player from afm to backend form", () => {
    const entity = random();
    const backendEntity = tobject(entity, { backendForm: true });
    expect(backendEntity).toEqual({
      username: entity.username,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
    });
  });
  it.todo("Should translate a player from backend to afm form", () => {
    const backendEntity = tobject(random(), { backendForm: true });
    const entity = tobject(normalize(backendEntity), { depth: 0 });
    expect(entity).toEqual({
      username: backendEntity.username,
      name: backendEntity.name,
      surname: backendEntity.surname,
      email: backendEntity.email,
      state: "unregistered",
      wristband: null,
    });
  });
  it.todo("Should validate a player", () => {
    const entity = new Entity();
    let tmp;

    // Empty device
    validate(entity);
    expect(validate.errors).not.toBeNull();

    validate(entity.tobject({ depth: 0 }));
    expect(validate.errors).not.toBeNull();

    validate(entity.normalize(null, { depth: 0 }));
    expect(validate.errors).not.toBeNull();

    // Filled device at depth 0
    validate((tmp = entity.fill(null, { depth: 0 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.normalize(null, { depth: 0 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.tobject({ depth: 0 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();
  });
  it.todo("Should validate a player with a wristband", () => {
    const entity = new Entity(null, new Wristband());
    let tmp;

    // Empty device
    validate(entity);
    expect(validate.errors).not.toBeNull();

    validate(entity.tobject({ depth: 1 }));
    expect(validate.errors).not.toBeNull();

    validate(entity.normalize(null, { depth: 1 }));
    expect(validate.errors).not.toBeNull();

    // Filled device at depth 1
    validate((tmp = entity.fill(null, { depth: 1 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.normalize(null, { depth: 1 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();

    validate((tmp = entity.tobject({ depth: 1 })));
    validate.errors && debug(tmp, validate.errors);
    expect(validate.errors).toBeNull();
  });
});
