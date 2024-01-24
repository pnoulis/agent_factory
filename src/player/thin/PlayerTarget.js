import { Player } from "./Player.js";

class PlayerTarget extends Player {
  constructor(player, wristband) {
    super(player, wristband);
  }

  register() {
    return this.state.register();
  }
  registered() {
    return this.state.registered();
  }
}

export { PlayerTarget };
