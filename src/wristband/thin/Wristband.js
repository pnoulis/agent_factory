import { random } from "../random.js";
import { normalize } from "../normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unpaired } from "./states/StateUnpaired.js";
import { Pairing } from "./states/StatePairing.js";
import { Paired } from "./states/StatePaired.js";
import { Unpairing } from "./states/StateUnpairing.js";
import { ERR_CODES } from "../../errors.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;
  constructor(wristband) {
    super();
    this.normalize(wristband);
  }
  normalize(sources, options) {
    Object.assign(this, Wristband.normalize([this, sources], options));
    stateful.setState.call(this, this.state);
    return this;
  }
  fill(sources, options) {
    return Object.assign(this, Wristband.random([this, sources], options));
  }
  tobject() {
    return Wristband.normalize(this);
  }
}

Wristband.prototype.errCodes = ERR_CODES;

export { Wristband };
