import { normalize } from "./normalize.js";
import { random } from "./random.js";
import { Player } from "../../player/thin/Player.js";

class Roster {
  static random = random;
  static normalize = normalize;
  constructor(players, createPlayer) {
    this.normalize(players);
  }

  get size() {
    return this.roster.size;
  }
  normalize(sources, options) {
    this.roster = new Map();
    // Roster.normalize(sources, options).forEach((player) => {
    //   this.roster.set(player.username, player);
    // });
  }
  fill() {}
  tobject() {}
  add() {}
  remove() {}
  has() {}
  find(clauseCb) {}
}

export { Roster };
