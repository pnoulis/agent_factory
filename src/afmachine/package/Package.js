import { random } from "./random.js";
import { normalize } from "./normalize.js";
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

  constructor(afm, pkg) {
    super();
  }

  normalize(sources, options) {}
  random(sources, options) {}
  fill(sources, options) {}
}

export { Package };
