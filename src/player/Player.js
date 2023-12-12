import { Eventful } from '../Eventful.js';

class Player extends Eventful {
  constructor(player) {
    super(['change']);
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
  login() {}
}

export { Player };
