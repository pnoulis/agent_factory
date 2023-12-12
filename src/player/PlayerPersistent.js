import { createPlayerStateful } from "./createPlayerStateful.js";
import { Unregistered } from "./states/StateUnregistered.js";
import { Registered } from "./states/StateRegistered.js";
import { InTeam } from "./states/StateInTeam.js";
import { Playing } from "./states/StatePlaying.js";

class PlayerPersistent extends createPlayerStateful([
  Unregistered,
  Registered,
  InTeam,
  Playing,
]) {
  constructor(player) {
    super(player);
  }
}

export { PlayerPersistent };
