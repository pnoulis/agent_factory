import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { createStateful, stateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { InTeam } from "./StateInTeam.js";
import { Playing } from "./StatePlaying.js";
import { ERR_CODES } from "../../errors.js";

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
    player ??= {};
    this.username = player.username || "";
    this.name = player.name || "";
    this.surname = player.surname || "";
    this.email = player.email || "";
    this.state =
      this.states[player.state?.name || player.state || "unregistered"];
    this.wristband = wristband ?? {};
  }
  normalize(sources, options) {
    const { wristband, state, ...player } = Player.normalize(
      [this, sources],
      options,
    );
    Object.assign(this.wristband, wristband);
    this.wristband.setState(wristband.state);
    Object.assign(this, player);
    this.setState(state);
    return this;
  }
  fill(sources, options = {}) {
    const random = Player.random([this, sources], options);
    this.normalize(random, options);
    if (options.password) {
      this.password = random.password;
    }
    return this;
  }
  tobject(depth = 0) {
    const player = {
      username: this.username,
      name: this.name,
      surname: this.surname,
      email: this.email,
      state: this.state.name,
    };
    if (depth > 0) {
      player.wristband = this.wristband.tobject();
    }
    return player;
  }
}

Player.prototype.errCodes = ERR_CODES;

export { Player };
