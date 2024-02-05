import { describe, it, expect, } from "vitest";
import { Wristband } from "../../src/afmachine/wristband/Wristband.js";
import { Player } from "../../src/afmachine/player/Player.js";

describe("player", () => {
  it("Should validate AFM player", () => {
    const validate = Player.validate;
    let p = new Player(null, new Wristband());
    validate(p);
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.fill());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.fill(null, { depth: 1 }));
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.tobject());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.tobject(1));
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Player.random());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Player.random(null, { depth: 1 }));
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Player.normalize());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Player.normalize(null, { depth: 1 }));
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
});
