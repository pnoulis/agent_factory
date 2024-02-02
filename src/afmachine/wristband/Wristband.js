import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unpaired } from "./StateUnpaired.js";
import { Pairing } from "./StatePairing.js";
import { Paired } from "./StatePaired.js";
import { Unpairing } from "./StateUnpairing.js";
import { ERR_CODES } from "../../errors.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;

  constructor(wristband) {
    super();
    wristband ??= {};
    this.id = wristband.id ?? null;
    this.color = wristband.color || "";
    this.colorCode = wristband.colorCode ?? null;
    this.state = this.states[wristband.state || "unpaired"];
  }
  normalize(sources, options = {}) {
    if (options.normalized) {
      Object.assign(this, sources);
    } else {
      Object.assign(this, Wristband.normalize([this, sources], options));
    }
    return stateful.setState.call(this, this.state);
  }
  fill(sources, options) {
    return this.normalize(Wristband.random([this, sources], options));
  }
  tobject() {
    return Wristband.normalize(this);
  }
}

Wristband.prototype.errCodes = ERR_CODES;

export { Wristband };
