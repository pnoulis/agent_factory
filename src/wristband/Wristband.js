import { Eventful } from "../Eventful.js";
import { createStateful } from "../stateful.js";
import { random } from "./random.js";
import { Unpaired } from "./states/StateUnpaired.js";
import { Pairing } from "./states/StatePairing.js";
import { Paired } from "./states/StatePaired.js";
import { normalize } from "./normalize.js";
import { delay } from "js_utils/misc";

class Wristband extends createStateful(Eventful, [Unpaired, Pairing, Paired]) {
  static random = random;
  static normalize = normalize;

  constructor(wristband = {}) {
    super(["stateChange"]);
    this.setState("unpaired");
    this.normalize(wristband);
    this.toggles = [];
  }

  normalize(sources = [], options) {
    const wristband = Wristband.normalize(sources[0]);
    Object.assign(this, wristband);
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

Wristband.prototype.unscan = async function () {
  await delay(0);
  this.state.unpair();
};

Wristband.prototype.scan = async function (afm) {
  const wristband = await afm.scanWristband();
  this.state.pair(wristband);
};

Wristband.prototype.toggle = function (cb) {
  return this.state.toggle();
};

export { Wristband };
