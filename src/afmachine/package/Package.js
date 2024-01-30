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

  constructor(pkg) {
    super();
    pkg ??= {};
    this.id = pkg.id ?? null;
    this.name = pkg.name || "";
    this.type = pkg.type || "";
    this.amount = pkg.amount ?? 0;
    this.cost = pkg.cost ?? 0;
    this.t_start = pkg.t_start ?? null;
    this.t_end = pkg.t_end ?? null;
    this.remainder = pkg.remainder ?? null;
    this.state = pkg.state || "";
  }

  normalize(sources, options = {}) {
    if (options.normalized) {
      Object.assign(this, sources);
    } else {
      Object.assign(this, Package.normalize([this, sources], options));
    }
    return stateful.setState.call(this, this.state);
  }
  fill(sources) {
    return this.normalize(Package.random([this, sources]));
  }
  tobject() {
    return Package.normalize(this);
  }
}

export { Package };
