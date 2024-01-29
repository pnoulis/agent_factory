import { normalize } from "./normalize.js";
import { random } from "./random.js";
import { Player } from "../../player/thin/Player.js";

class Roster {
  static random = random;
  static normalize = normalize;

  constructor(players) {
    this.normalize(players);
  }

  get length() {
    return this.roster.length;
  }

  normalize(sources, options) {}
  random(sources, options) {}
  fill() {}
  tobject() {}

  add() {}
  remove() {}
  has() {}
  find(clauseCb) {}
}

export { Roster };
