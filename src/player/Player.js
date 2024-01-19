import { Eventful } from "../Eventful.js";
import { random } from "./random.js";

class Player extends Eventful {
  static random = random;

  constructor(player) {
    super(["change"]);
    player ??= {};
    this.username = player.username || "";
    this.name = player.name || "";
    this.surname = player.username || "";
    this.email = player.email || "";
    this.password = player.password || "";
  }
  static normalize(player) {
    const _player = {
      username: player.username || "",
      name: player.name || "",
      surname: player.surname || "",
      email: player.email || "",
      password: player.password || "",
    };
    return _player;
  }
  register() {}
  random(sources, options) {
    return Player.random(sources, options);
  }
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
