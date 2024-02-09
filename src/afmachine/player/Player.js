import { random } from "./random.js";
import { normalize } from "./normalize.js";
import { tobject } from "./tobject.js";
import { validate } from "./validate.js";

import { createStateful } from "../../Stateful.js";
import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { InTeam } from "./StateInTeam.js";
import { Playing } from "./StatePlaying.js";

class Player extends createStateful([
  Unregistered,
  Registered,
  InTeam,
  Playing,
]) {
  static random = random;
  static normalize = normalize;
  static tobject = tobject;
  static validate = validate;

  constructor(player, wristband) {
    super();
    player ??= {};
    this.username = player.username || null;
    this.name = player.name || null;
    this.surname = player.surname || null;
    this.email = player.email || null;
    this.state =
      this.states[player.state?.name || player.state || "unregistered"];
    this.wristband = wristband || null;
  }
  normalize(sources, options = {}) {
    const { wristband, state, ...player } = Player.normalize(
      [this, sources],
      options,
    );
    Object.assign(this, player);
    this.setState(state);

    if (options.depth ?? 1) {
      Object.assign(this.wristband, wristband);
      this.wristband.setState(wristband.state);
    }
    return this;
  }
  fill(sources, options = {}) {
    const { wristband, state, ...player } = Player.random([this, sources], {
      state: this.state.name,
      ...options,
    });

    Object.assign(this, player);
    this.setState(state);

    if (options.depth ?? 1) {
      try {
        Object.assign(this.wristband, wristband);
        this.wristband.setState(wristband.state);
      } catch (err) {
        err.message = "Missing wristband";
        throw err;
      }
    }
    return this;
  }
  tobject(options) {
    return Player.tobject(this, options);
  }
}

export { Player };
