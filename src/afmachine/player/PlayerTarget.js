import { Player } from "./Player.js";
import { createStateErr, ERR_CODES } from "../../errors.js";

class PlayerTarget extends Player {
  constructor(player, wristband) {
    super(player, wristband);
  }

  throwStateErr(verb, pastTense, player) {
    const state = this.getState().name;
    if (pastTense) {
      throw createStateErr({
        msg: `${verb} a player in ${state} state`,
        severity: "fatal",
        errCode: ERR_CODES.ESTATEPAST,
        state,
        player,
      });
    }
    throw createStateErr({
      msg: `Trying to ${verb} a ${state} player`,
      state,
      player: this,
    });
  }

  register() {
    return this.state.register();
  }
  registered(player) {
    return this.state.registered(player);
  }
  pairWristband() {
    return this.state.pairWristband();
  }
  pairedWristband(wristband) {
    return this;
  }
  unpairWristband() {
    return this.state.unpairWristband();
  }
  unpairedWristband(wristband) {
    return this;
  }
}

export { PlayerTarget };
