import { random } from "../random.js";
import { normalize } from "../normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unregistered } from "../states/StateUnregistered.js";
import { Registered } from "../states/StateRegistered.js";
import { InTeam } from "../states/StateInTeam.js";
import { Playing } from "../states/StatePlaying.js";

class Player extends createStateful([
  Unregistered,
  Registered,
  InTeam,
  Playing,
]) {
  static random = random;
  static normalize = normalize;

  constructor(player, wristband) {
    super();
    this.wristband = wristband;
    this.normalize(player);
  }
  normalize(sources, options) {
    const player = Player.normalize(sources, options);
    Object.assign(this, player);

    // Calling with apply because PlayerCommander shadows setState
    // with stateventful implementation before Player is initialized
    // with a this.events prop.
    stateful.setState.apply(this, [this.state || "unregistered"]);
  }
  fill(sources = [], options) {
    return Object.assign(this, Player.random([this, ...sources], options));
  }
  tobject() {
    return {
      name: this.name,
      username: this.username,
      surname: this.surname,
      email: this.email,
      password: this.password,
      state: this.getState()?.name,
    };
  }
}

export { Player };
