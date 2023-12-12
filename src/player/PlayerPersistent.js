import { Player } from "./Player.js";
import { createStateful } from "../stateful.js";
import { Unregistered } from "./states/StateUnregistered.js";
import { Registered } from "./states/StateRegistered.js";
import { InTeam } from "./states/StateInTeam.js";
import { Playing } from "./states/StatePlaying.js";
import { WristbandScannable } from "../wristband/wristbandScannable.js";

class PlayerPersistent extends createStateful(Player, [
  Unregistered,
  Registered,
  InTeam,
  Playing,
]) {
  constructor(player) {
    super(player);
    this.wristband = new WristbandScannable(this);
  }
}

export { PlayerPersistent };
