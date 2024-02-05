import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unpaired } from "./StateUnpaired.js";
import { Pairing } from "./StatePairing.js";
import { Paired } from "./StatePaired.js";
import { Unpairing } from "./StateUnpairing.js";
import { ERR_CODES } from "../../errors.js";
import { schema } from "./schema.js";
import { createValidator } from "../createValidator.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;
  static validate = createValidator(schema);

  constructor(wristband) {
    super();
    wristband ??= {};
    this.id = wristband.id ?? null;
    this.color = wristband.color || "";
    this.colorCode = wristband.colorCode ?? null;
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
    const { state, ...wristband } = Wristband.random([this, sources], options);
    Object.assign(this, wristband);
    this.setState(state);
    return this;
  }
  tobject() {
    return {
      id: this.id,
      color: this.color,
      colorCode: this.colorCode,
      state: this.state.name,
    };
  }
}

Wristband.prototype.errCodes = ERR_CODES;

export { Wristband };
