import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { schema } from "./schema.js";
import { createValidator } from "../createValidator.js";
import { createStateful } from "../../Stateful.js";
import { Unpaired } from "./StateUnpaired.js";
import { Pairing } from "./StatePairing.js";
import { Paired } from "./StatePaired.js";
import { Unpairing } from "./StateUnpairing.js";
import { ERR_CODES } from "../../errors.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = createValidator(schema);
  constructor(wristband) {
    super();
    wristband ??= {};
    this.id = wristband.id || null;
    this.color = wristband.color || null;
    this.colorCode = wristband.colorCode || null;
    this.state =
      this.states[wristband.state?.name || wristband.state || "unpaired"];
  }
  normalize(sources, options) {
    const { state, ...wristband } = Wristband.normalize(
      [this, sources],
      options,
    );
    Object.assign(this, wristband);
    this.setState(state);
    return this;
  }
  fill(sources, options) {
    const { state, ...wristband } = Wristband.random([this, sources], {
      defaultState: this.state.name,
      ...options,
    });
    Object.assign(this, wristband);
    this.setState(state);
    return this;
  }
  tobject(options) {
    return Wristband.tobject(this, options);
  }
}

Wristband.prototype.errCodes = ERR_CODES;

export { Wristband };
