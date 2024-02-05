import { describe, it, expect } from "vitest";
import { Package } from "../../src/afmachine/package/Package.js";

describe("package", () => {
  it("Should validate AFM package", () => {
    const validate = Package.validate;
    let p = new Package();
    validate(p);
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.fill());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(p.tobject());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Package.random());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate(Package.normalize());
    validate.errors && console.log(validate.errors);
    expect(validate.errors).toBeNull();
    validate({});
    expect(validate.errors).not.toBeNull();
  });
});
