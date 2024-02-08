import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

class Cashier {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(cashier) {
    cashier ??= {};
    this.id = cashier.id || null;
    this.username = cashier.username || null;
    this.email = cashier.email || null;
    this.role = cashier.role || null;
  }
  normalize(sources, options) {
    const cashier = Cashier.normalize([this, sources], options);
    Object.assign(this, cashier);
    return this;
  }
  fill(sources, options) {
    const cashier = Cashier.random([this, sources], options);
    Object.assign(this, cashier);
    return this;
  }
  tobject(options) {
    return Cashier.tobject(this, options);
  }
}

export { Cashier };
