import { Wristband } from "./Wristband.js";
import { createStateErr, ERR_CODES } from "../../errors.js";

class WristbandTarget extends Wristband {
  constructor(wristband) {
    super(wristband);
  }

  throwStateErr(verb, pastTense, wristband, player) {
    const state = this.getState().name;
    if (pastTense) {
      throw createStateErr({
        msg: `${verb} a wristband in ${state} state`,
        severity: "fatal",
        errCode: ERR_CODES.ESTATEPAST,
        state,
        wristband,
      });
    }
    throw createStateErr({
      msg: `Trying to ${verb} a ${state} wristband`,
      state,
      player: this,
    });
  }
  pair(player) {
    return this.state.pair();
  }
  paired(wristband, player) {
    return this.state.paired();
  }
  unpair(player) {
    return this.state.unpair();
  }
  unpaired(wristband, player) {
    return this.state.unpaired();
  }
}

export { WristbandTarget };
