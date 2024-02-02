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
    this.state = this.states[player.state || "unregistered"];
    this.wristband = wristband ?? {};
  }
  normalize(sources, { depth = 1, wristband, ...playerOpts } = {}) {
    const { wristband: wristbandSrc, ...player } = playerOpts.normalized
      ? sources
      : Player.normalize([this, sources], {
          depth,
          wristband,
          ...playerOpts,
        });

    // Wristband
    this.wristband.normalize(
      wristbandSrc,
      depth > 0 ? { ...wristband, normalized: true } : wristband,
    );

    // Player
    Object.assign(this, player);

    // Calling with apply because PlayerCommander shadows setState
    // with stateventful implementation before Player is initialized
    // with a this.events prop.
    return stateful.setState.call(this, this.state);
  }
  fill(sources, options = {}) {
    return this.normalize(Player.random([this, sources], options));
  }
  tobject(depth = 0) {
    const player = Player.normalize(this, { depth: 0 });
    if (depth > 0) {
      player.wristband = this.wristband.tobject();
    } else {
      player.wristband = {};
    }
    return player;
  }
}

Player.prototype.errCodes = ERR_CODES;

export { Player };
