import { stateful } from "js_utils/stateful";
import { Player } from "./Player.js";
import { Eventful } from "./Eventful.js";

class PlayerPersistent extends Eventful {
  constructor() {
    super(["stateChange", "change"]);
    this.player = new Player();
  }
}

export { PlayerPersistent };
