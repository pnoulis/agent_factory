import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { schema } from "./schema.js";
import { createValidator } from "../createValidator.js";

import { createStateful } from "../../Stateful.js";
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
  static tobject = tobject;
  static validate = createValidator(schema);

  constructor(pkg) {
    super();
    pkg ??= {};
    this.id = pkg.id || null;
    this.name = pkg.name || null;
    this.type = pkg.type || null;
    this.amount = pkg.amount || null;
    this.cost = pkg.cost || null;
    this.t_start = pkg.t_start || null;
    this.t_end = pkg.t_end || null;
    this.remainder = pkg.remainder || null;
    this.state = this.states[pkg.state?.name || pkg.state || "unregistered"];
  }

  normalize(sources, options = {}) {
    const { state, ...pkg } = Package.normalize([this, sources], options);
    Object.assign(this, pkg);
    this.setState(state);
    return this;
  }
  fill(sources, options) {
    const { state, ...pkg } = Package.random([this, sources], options);
    Object.assign(this, pkg);
    this.setState(state);
    return this;
  }
  tobject(options) {
    return Package.tobject(this, options);
  }
}

export { Package };
