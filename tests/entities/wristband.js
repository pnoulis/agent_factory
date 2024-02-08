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
  it("Should be a valid afm wristband", () => {
    // paired
    let entity = new Entity({ state: "paired" });
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();

    // unpairing
    entity = new Entity().fill(null, { state: "unpairing" });
    expect(validate(entity.fill())).toBeNull();
    expect(validate(entity.normalize())).toBeNull();
    expect(validate(entity.tobject())).toBeNull();
  });
  it("Should be an invalid afm wristband", () => {
    // unpaired
    let entity = new Entity();
    expect(validate(entity)).not.toBeNull();
    expect(validate(entity.fill())).not.toBeNull();
    expect(validate(entity.tobject())).not.toBeNull();
    expect(validate(entity.normalize())).not.toBeNull();

    // pairing
    entity = new Entity().fill(null, { state: "pairing" });
    expect(validate(entity)).not.toBeNull();
    expect(validate(entity.fill())).not.toBeNull();
    expect(validate(entity.tobject())).not.toBeNull();
    expect(validate(entity.normalize())).not.toBeNull();
  });
  it("Should be a valid backend form wristband", () => {
    // paired
    let entity = new Entity({ state: "paired" });
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

    // unpairing
    entity = new Entity().fill(null, { state: "unpairing" });
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).toBeNull();
  });
  it("Should be an invalid backend form wristband", () => {
    // unpaired
    let entity = new Entity();
    expect(
      validate(entity.tobject({ backendForm: true }), { backendForm: true }),
    ).not.toBeNull();
    expect(
      validate(entity.fill().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();

    // pairing
    entity = new Entity().fill(null, { state: "pairing" });
    expect(
      validate(entity.tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();
    expect(
      validate(entity.normalize().tobject({ backendForm: true }), {
        backendForm: true,
      }),
    ).not.toBeNull();
  });
  it("Should translate wristbands across forms", () => {
    const entity = new Entity({ state: "unpaired" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual(
      entity.tobject(),
    );

    entity.fill(null, { state: "pairing" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual({
      ...entity.tobject(),
      state: "unpaired",
    });

    entity.fill(null, { state: "unpairing" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual({
      ...entity.tobject(),
      state: "paired",
    });

    entity.fill(null, { state: "paired" });
    expect(normalize(tobject(entity, { backendForm: true }))).toEqual(
      entity.tobject(),
    );
  });
  it("Should merge wristbands in all forms", () => {
    expect(
      normalize([new Entity({ id: 2 }), new Entity({ id: 3 })]),
    ).toMatchObject({
      id: 3,
    });

    expect(
      normalize([
        new Entity({ id: 3 }).tobject({ backendForm: true }),
        new Entity({ id: 4 }).tobject({ backendForm: true }),
      ]),
    ).toEqual(new Entity({ id: 4 }).tobject());

    expect(
      normalize([
        new Entity({ id: 3, colorCode: 0 }).tobject(),
        new Entity({ id: 4, color: "green" }).tobject({
          backendForm: true,
        }),
      ]),
    ).toEqual(
      new Entity({
        id: 4,
        colorCode: WRISTBAND_COLORS["green"],
        state: "paired",
      }).tobject(),
    );

    expect(
      normalize([
        new Entity({ id: 3, colorCode: 0 }).tobject({ backendForm: true }),
        new Entity({ id: 4, color: "green" }).tobject(),
      ]),
    ).toEqual(
      new Entity({
        id: 4,
        colorCode: WRISTBAND_COLORS["green"],
        state: "paired",
      }).tobject(),
    );
  });
});
