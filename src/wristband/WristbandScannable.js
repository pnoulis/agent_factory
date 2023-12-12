import { Wristband } from "./Wristband.js";
import { createStateful } from "../stateful.js";
import { Empty } from "./states/StateEmpty.js";
import { Scanning } from "./states/StateScanning.js";
import { Scanned } from "./states/StateScanned.js";

class WristbandScannable extends createStateful(Wristband, [
  Empty,
  Scanning,
  Scanned,
]) {
  constructor(wristband) {
    super(wristband);
  }
}

export { WristbandScannable };
