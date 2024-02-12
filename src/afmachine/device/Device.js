import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

import { boot } from "./boot.js";

class Device {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(device) {
    device ??= {};
    this.id = device.id || null;
    this.type = device.type || null;
    this.room = device.room || null;
  }
  normalize(sources, options) {
    const device = Device.normalize([this, sources], options);
    Object.assign(this, device);
    return this;
  }
  fill(sources, options) {
    const device = Device.random([this, sources], options);
    Object.assign(this, device);
    return this;
  }
  tobject(options) {
    return Device.tobject(this, options);
  }
}

Device.prototype.boot = boot;

export { Device };
