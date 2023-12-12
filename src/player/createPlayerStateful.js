import { Player } from "./Player.js";
import { stateventful } from "../stateful.js";

function createPlayerStateful(states) {
  class PlayerStateful extends Player {
    constructor(player) {
      super(player);
      for (let i = 0; i < states.length; i++) {
        this.states[states[i].name] = new states[i](this);
      }
      this.setState("unregistered");
    }
  }
  Object.assign(PlayerStateful.prototype, stateventful);
  return PlayerStateful;
}

export { createPlayerStateful };
