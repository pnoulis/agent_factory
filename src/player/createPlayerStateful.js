import { Player } from "./Player.js";
import { stateful } from "../stateful.js";

function createPlayerStateful(states) {
  class PlayerStateful extends Player {
    constructor(player) {
      super(player);
      this.state = null;
      for (let i = 0; i < states.length; i++) {
        this.states[states[i].name] = new states[i](this);
      }
    }
  }
  Object.assign(PlayerStateful.prototype, stateful);
  PlayerStateful.prototype.states = {};
  return PlayerStateful;
}

export { createPlayerStateful };
