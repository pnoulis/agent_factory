import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { createStateErr } from "../../errors.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(afm, wristband) {
    super(wristband);
    this.addEvent("stateChange");
    this.afm = afm;
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
        return (msg, wristband) => {
          throw createStateErr({
            msg,
            severity: "fatal",
            errCode,
            state,
            wristband,
          });
        };
      default:
        throw new TypeError(`Unrecognized error code: '${errCode}'`);
    }
  }
  pair() {}
  unpair() {}
  async scan() {
    let _unsub;
    try {
      const res = await this.afm.scanWristband(
        (unsub) => {
          _unsub = unsub;
        },
        { queue: false },
      );
      _unsub = null;
      return res;
    } finally {
      if (typeof _unsub === "function") {
        _unsub();
      }
    }
  }
}
extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
