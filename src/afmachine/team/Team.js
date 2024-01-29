import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { Merged } from "./StateMerged.js";
import { Playing } from "./StatePlaying.js";

class Team extends createStateful([Unregistered, Registered, Merged, Playing]) {
  static random = random;
  static normalize = normalize;

  constructor(team, { Player, Wristband } = {}) {
    super();
    this.Player = Player;
    this.Wrisband = Wristband;
  }

  normalize(sources, options) {}
  fill(sources, options) {}
  tobject(sources, options) {}
}

export { Team };
