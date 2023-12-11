import { stateful } from "js_utils/stateful";
import { eventful } from "js_utils/eventful";

class Player {
  constructor(player) {
    this.wristband = player.wristband;
    this.player = player ?? {};
  }
  static normalize(player) {
    const _player = {
      age: 22,
    };
    return _player;
  }
}

class PlayerFrontend {
  constructor(player) {
    super(player);
  }
  static normalize(player) {
    const _player = {
      ...super.normalize(player),
    };
  }
}

class PlayerStateful extends PlayerFrontend {
  constructor(player) {
    super(player);
    this.player = PlayerStateful.normalize(this.player);
  }
  static normalize(player) {
    const _player = {
      ...super.normalize(player),
      name: "pavlos",
    };
    return _player;
  }
}

// Stateful
(() => {
  let extended = false;
  return () => {
    if (extended) return;
    extended = true;
    stateful(PlayerStateful, [
      Unregistered,
      "unregistered",
      Registered,
      "registered",
      InTeam,
      "inTeam",
      Playing,
      "playing",
    ]);
  };
})()();


class PlayerEventful extends PlayerStateful {
  constructor(player) {
    
  }
}

export { PlayerBackend, PlayerStateful };
