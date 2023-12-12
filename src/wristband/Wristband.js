import { Eventful } from "../Eventful.js";
import { WRISTBAND_COLORS } from "../constants.js";

class Wristband extends Eventful {
  constructor(wristband) {
    super(["change"]);
    wristband ??= {};
    this.id = wristband.id ?? wristband.wristbandNumber ?? null;
    this.colorCode = wristband.colorCode ?? wristband.wristbandColor ?? null;
    this.color = WRISTBAND_COLORS[this.colorCode];
  }
}

export { Wristband };
