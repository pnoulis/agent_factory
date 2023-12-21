import { Eventful } from "../Eventful.js";
import { WRISTBAND_COLORS } from "../constants.js";
import { random } from "./random.js";

class Wristband extends Eventful {
  static random = random;

  constructor(wristband) {
    super(["change"]);
    wristband ??= {};
    this.id = wristband.id ?? wristband.wristbandNumber ?? null;
    this.colorCode = wristband.colorCode ?? wristband.wristbandColor ?? null;
    this.color = WRISTBAND_COLORS[this.colorCode] || null;
  }
  pair() {
    debug(`pair: ${Wristband.name}`);
  }
  unpair() {
    debug(`unpair: ${Wristband.name}`);
  }

  toggle() {
    this.afmachine.wristbandScan();
  }

  random(sources, options) {
    return Wristband.random(sources, options);
  }
  fill(sources = [], options) {
    return Object.assign(this, Wristband.random([this, ...sources], options));
  }
  toObject() {
    return {
      id: this.id,
      colorCode: this.colorCode,
      color: this.color,
    };
  }
}

export { Wristband };
