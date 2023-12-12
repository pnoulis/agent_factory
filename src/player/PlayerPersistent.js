import { createPlayerStateful } from "./createPlayerStateful.js";
import { Unregistered } from "./states/StateUnregistered.js";
import { Registered } from "./states/StateRegistered.js";
import { InTeam } from "./states/StateInTeam.js";
import { Playing } from "./states/StatePlaying.js";
import { WristbandScannable } from "../wristband/wristbandScannable.js";

class PlayerPersistent extends createPlayerStateful([
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
