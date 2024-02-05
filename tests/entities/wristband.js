import { describe, it, expect, } from "vitest";
import { Wristband } from "../../src/afmachine/wristband/Wristband.js";

describe("wristband", () => {
  it("Should validate AFM wristband", () => {
    const validate = Wristband.validate;
    let w = new Wristband();
    validate(w);
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(w.fill());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(w.tobject());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Wristband.random());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Wristband.normalize());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
});
