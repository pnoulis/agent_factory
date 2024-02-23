import { PlayerCommander } from "../player/PlayerCommander.js";
import { Unregistered } from "./StateUnregistered.js";

class GrouPartyPlayer extends PlayerCommander {
  constructor(player, wristband) {
    super(player, wristband);
    this.states.unregistered = new Unregistered(this);
    this.setState("unregistered");
  }
}

export { GrouPartyPlayer };
