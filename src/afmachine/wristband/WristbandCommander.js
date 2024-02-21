import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(wristband) {
    super(wristband);
    this.addEvent("stateChange");
  }

  async scan() {
    let _unsub;
    try {
      const { wristband } = await parsecmd(
        afm.scanWristband(
          (unsub) => {
            _unsub = unsub;
          },
          { queue: false },
        ),
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
    const response = await parsecmd(
      afm.registerWristband(player, wristband, {
        queue: false,
      }),
    );
    return response.player.wristband;
  }

  async deregister(player, wristband) {
    const response = await parsecmd(
      afm.deregisterWristband(player, wristband, { queue: false }),
    );
    return response.player.wristband;
  }

  async pair(player) {
    const wristband = await this.scan();
    const registered = await this.register(player, wristband);
    this.state.paired(registered);
    return this;
  }
  async unpair(player) {
    const deregistered = await this.deregister(player, this);
    this.state.unpaired(deregistered);
    return this;
  }
}
extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
