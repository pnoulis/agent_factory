import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { Playing } from "./StatePlaying.js";
import { Paused } from "./StatePaused.js";
import { Completed } from "./StateCompleted.js";
import { schema } from "./schema.js";
import { createValidator } from "../createValidator.js";

class Package extends createStateful([
  Unregistered,
  Registered,
  Playing,
  Paused,
  Completed,
]) {
  static random = random;
  static normalize = normalize;
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
  fill(sources) {
    return this.normalize(Package.random([this, sources]));
  }
  tobject() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      amount: this.amount,
      cost: this.cost,
      t_start: this.t_start,
      t_end: this.t_end,
      remainder: this.remainder,
      state: this.state.name,
    };
  }
}

export { Package };
