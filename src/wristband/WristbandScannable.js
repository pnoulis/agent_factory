import { Wristband } from "./Wristband.js";
import { createStateful } from "../stateful.js";
import { Empty } from "./states/StateEmpty.js";
import { Scanning } from "./states/StateScanning.js";

class WristbandScannable extends createStateful(Wristband, [
  Empty,
  Scanning,
]) {
  constructor(wristband) {
    super(wristband);
    // this.initializeStates("empty");
  }
}

export { WristbandScannable };
