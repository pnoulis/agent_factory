import { Unregistered } from "./StateUnregistered.js";
import { Registered } from "./StateRegistered.js";
import { InTeam } from "./StateInTeam.js";
import { Playing } from "./StatePlaying.js";

class Player {
  constructor(player) {
    player ??= {};
    this.username = player.username;
    this.name = player.name;
    this.surname = player.surname;
    this.email = player.email;
    this.password = player.password;
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
  static register() {}
  static login() {}
}

export { Player };
