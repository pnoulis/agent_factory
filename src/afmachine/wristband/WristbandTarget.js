import { Wristband } from "./Wristband.js";
import { createStateErr } from "../../errors.js";

class WristbandTarget extends Wristband {
  constructor(wristband) {
    super(wristband);
  }

  throwStateErr(errCode) {
    const state = this.getState().name;
    switch (errCode) {
      case this.errCodes.EWRISTBAND_STATE:
      // fall through
      case this.errCodes.EWRISTBAND_STATE_CANCELS_OUT:
        return (msg) => {
          throw createStateErr({
            msg,
            severity: "warn",
            errCode,
            state,
          });
        };
      case this.errCodes.EWRISTBAND_STATE_IMPOSSIBLE:
        return (msg, ...wristbands) => {
          throw createStateErr({
            msg,
            severity: "fatal",
            errCode,
            state,
            wristbands,
          });
        };
      default:
        throw new TypeError(`Unrecognized error code: '${errCode}'`);
    }
  }

  pair(player) {
    return this.state.pair();
  }
  paired(wristband) {
    return this.state.paired(wristband);
  }
  unpair(player) {
    return this.state.unpair();
  }
  unpaired(wristband, player) {
    return this.state.unpaired();
  }
}

export { WristbandTarget };
