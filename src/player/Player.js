import { Eventful } from "../Eventful.js";
import { random } from "./random.js";
import { normalize } from "./normalize.js";

class Player extends Eventful {
  static random = random;
  static normalize = normalize;

  constructor(player) {
    super(["change"]);
    player ??= {};
    this.username = player.username || "";
    this.name = player.name || "";
    this.surname = player.username || "";
    this.email = player.email || "";
    this.password = player.password || "";
  }

  normalize(sources, options) {}
  fill(sources = [], options) {
    return Object.assign(this, Player.random([this, ...sources], options));
  }
  toObject() {
    return {
      name: this.name,
      username: this.username,
      surname: this.surname,
      email: this.email,
      password: this.password,
    };
  }
}

export { Player };
