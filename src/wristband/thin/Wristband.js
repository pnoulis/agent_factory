import { random } from "../random.js";
import { normalize } from "../normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unpaired } from "./states/StateUnpaired.js";
import { Pairing } from "./states/StatePairing.js";
import { Paired } from "./states/StatePaired.js";
import { Unpairing } from "./states/StateUnpairing.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;
  constructor(wristband) {
    super();
    this.normalize(wristband);
  }
  normalize(sources, options) {
    Object.assign(this, Wristband.normalize(sources, options));
    stateful.setState.call(this, this.state);
  }
  fill(sources, options) {
    return Object.assign(this, Wristband.random([this, sources], options));
  }
  tobject() {
    return Wristband.normalize(this);
  }
}

export { Wristband };
