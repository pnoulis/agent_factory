import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(afm, wristband) {
    super(wristband);
    this.addEvent("stateChange");
    this.afm = afm;
  }

  async scan() {
    let _unsub;
    try {
      const { wristband } = await this.afm.scanWristband(
        (unsub) => {
          _unsub = unsub;
        },
        { queue: false },
      );
      _unsub = null;
      return wristband;
    } finally {
      if (typeof _unsub === "function") {
        _unsub();
      }
    }
  }
  async register(player, wristband) {
    const response = await this.afm.registerWristband(player, wristband, {
      queue: false,
    });
    return response.player.wristband;
  }

  async pair(player) {
    this.state.pair();
    const wristband = await this.scan();
    const registered = await this.register(player, wristband);
    this.state.paired(registered);
    return this;
  }
}
extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
