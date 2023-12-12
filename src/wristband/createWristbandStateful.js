import { Wristband } from "./Wristband.js";
import { stateventful } from "../stateful.js";

function createWristbandStateful(states) {
  class WristbandStateful extends Wristband {
    constructor(wristband) {
      super(wristband);
      this.addState(...states);
    }
  }
  Object.assign(WristbandStateful.prototype, stateventful);
  return WristbandStateful;
}

export { createWristbandStateful };
