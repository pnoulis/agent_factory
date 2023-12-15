import { Wristband } from "./Wristband.js";
import { createStateful, stateventful } from "../stateful.js";
import { Unpaired } from "./states/StateUnpaired.js";
import { Pairing } from "./states/StatePairing.js";
import { Paired } from "./states/StatePaired.js";

class WristbandScannable extends createStateful(Wristband, [
  Unpaired,
  Pairing,
  Paired,
]) {
  constructor(wristband) {
    super(wristband);
    this.setState("unpaired");
  }

  pair() {
    debug(`pair: ${WristbandScannable.name}`);
  }
  unpair() {
    debug(`unpair: ${WristbandScannable.name}`);
  }
}

Object.assign(WristbandScannable.prototype, stateventful);

export { WristbandScannable };
