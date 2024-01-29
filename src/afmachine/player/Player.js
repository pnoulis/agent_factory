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

  constructor(player, wristband, { normalize = true, ...options } = {}) {
    super();
    this.wristband = wristband ?? {};
    if (normalize) {
      return this.normalize(player, options);
    }
    player ||= {};
    this.username = player.username || "";
    this.name = player.name || "";
    this.surname = player.surname || "";
    this.email = player.email || "";
    this.state = player.state || "";
  }
  normalize(sources, options = {}) {
    const normalized = Player.normalize([this, sources], options);

    // wristband
    if (options.depth) {
      Object.assign(this.wristband, normalized.wristband);
      stateful.setState.call(this.wristband, this.wristband.state);
    }
    delete normalized.wristband;

    // player
    Object.assign(this, normalized);

    // Calling with apply because PlayerCommander shadows setState
    // with stateventful implementation before Player is initialized
    // with a this.events prop.
    return stateful.setState.call(this, this.state);
  }
  fill(sources, options = {}) {
    const filled = Player.random([this, sources], options);
    // wristband
    if (options.depth) {
      Object.assign(this.wristband, filled.wristband);
    }
    delete filled.wristband;
    // player
    return Object.assign(this, filled);
  }
  tobject(options) {
    return Player.normalize(this, options);
  }
}

Player.prototype.errCodes = ERR_CODES;

export { Player };
