import { WristbandScannable } from "./WristbandScannable.js";

class WristbandPairable extends WristbandScannable {
  constructor(wristband) {
    super(wristband);
    this.setState("unpaired");
  }

  pair() {
    debug(`pair: ${WristbandPairable.name}`);
  }

  unpair() {
    debug(`unpair: ${WristbandPairable.name}`);
  }
}

export { WristbandPairable };
