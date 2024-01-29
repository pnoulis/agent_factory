import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { Playing } from "./StatePlaying.js";
import { Paused } from "./StatePaused.js";
import { Completed } from "./StateCompleted.js";

class Package extends createStateful([
  Unregistered,
  Registered,
  Playing,
  Paused,
  Completed,
]) {
  static random = random;
  static normalize = normalize;

  constructor(afm, pkg) {
    super();
    this.normalize(pkg);
  }

  normalize(sources, options) {
    Object.assign(this, Package.normalize([this, sources], options));
    return stateful.setState.call(this, this.state);
  }
  fill(sources, options) {
    return this.normalize(Package.random([this, sources], options), options);
  }
  tobject() {
    return Package.normalize(this);
  }
}

export { Package };
