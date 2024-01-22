import { Eventful } from "../Eventful.js";
import { createStateful } from "../stateful.js";
import { random } from "./random.js";
import { Unpaired } from "./states/StateUnpaired.js";
import { Pairing } from "./states/StatePairing.js";
import { Paired } from "./states/StatePaired.js";
import { Unpairing } from "./states/StateUnpairing.js";
import { normalize } from "./normalize.js";
import { delay } from "js_utils/misc";

class Wristband extends createStateful(Eventful, [
  Unpaired,
  Pairing,
  Unpairing,
  Paired,
]) {
  static random = random;
  static normalize = normalize;

  constructor(afm, wristband = {}) {
    super(["stateChange"]);
    this.setState("unpaired");
    this.constructor.prototype.afm = afm;
    this.normalize(wristband);
    this.unsubscribe = null;
    this.togglers = [];
    this.togglers.i = 0;
  }

  normalize(sources = [], options) {
    const wristband = Wristband.normalize(sources, options);
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

Wristband.prototype.scan = async function () {
  const { unsubed, wristband } = await this.afm.scanWristband(
    (unsub) => this.state.unsubscribe(unsub),
    { queue: false },
  );
  if (!unsubed) {
    this.state.pair(wristband);
  }
};

Wristband.prototype.notify = function (err) {
  if (this.togglers.i > 0) return;
  for (let i = 0; i < this.togglers.length; i++) {
    this.togglers[i] && this.togglers[i](err, this);
  }
  if (err) {
    this.emit("error", err, this);
  }
  this.togglers = [];
  this.togglers.i = 0;
};

Wristband.prototype.pair = async function () {
  let error;
  try {
    await this.scan();
  } catch (err) {
    error = err;
  } finally {
    this.togglers.i = this.togglers.i - 1;
    this.notify(error);
  }
};

Wristband.prototype.unpair = async function () {
  let error;
  try {
    await this.unscan();
  } catch (err) {
    error = err;
  } finally {
    this.togglers.i = this.togglers.i - 1;
    this.notify(error);
  }
};

Wristband.prototype.toggle = function (cb) {
  this.togglers.push(cb);
  this.togglers.i = this.togglers.i + 1;
  setImmediate(() => this.state.toggle());
};

export { Wristband };
