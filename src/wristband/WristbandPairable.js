import { WristbandScannable } from "./WristbandScannable.js";
import { createStateful } from "../stateful.js";

class WristbandPairable extends WristbandScannable {
  constructor(wristband) {
    super(wristband);
  }
}

export { WristbandPairable };
