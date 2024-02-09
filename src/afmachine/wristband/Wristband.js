import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

import { createStateful } from "../../Stateful.js";
import { Unpaired } from "./StateUnpaired.js";
import { Pairing } from "./StatePairing.js";
import { Paired } from "./StatePaired.js";
import { Unpairing } from "./StateUnpairing.js";
import { WRISTBAND_COLORS } from "../../constants.js";

class Wristband extends createStateful([Unpaired, Pairing, Unpairing, Paired]) {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(wristband) {
    super();
    wristband ??= {};
    this.id = wristband.id || null;
    this.color =
      wristband.color || WRISTBAND_COLORS[wristband.colorCode] || null;
    this.colorCode =
      wristband.colorCode || WRISTBAND_COLORS[wristband.color] || null;
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
      state: this.state.name,
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

export { Wristband };
