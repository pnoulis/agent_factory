import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(wristband) {
    super(wristband);
    this.addEvent("stateChange");
    this.pairing = null;
  }

  async scan() {
    const { wristband } = await parsecmd(
      afm.scanWristband(
        (unsub) => {
          this.pairing.unsub = unsub;
        },
        { queue: false },
      ),
    );
    this.pairing.scanned = true;
    this.pairing.unsub = null;
    return wristband;
  }
  async register(player, wristband) {
    const response = await parsecmd(
      afm.registerWristband(player, wristband, {
        queue: false,
      }),
    );
    this.pairing.registered = true;
    return response.player.wristband;
  }

  async deregister(player, wristband) {
    const response = await parsecmd(
      afm.deregisterWristband(player, wristband, { queue: false }),
    );
    return response.player.wristband;
  }

  cancelPairing() {
    this.pairing?.unsub?.();
  }

  async pair(player) {
    this.pairing = {};
    try {
      const wristband = await this.scan();
      const registered = await this.register(player, wristband);
      this.state.paired(registered);
    } catch (err) {
      this.setState("unpaired");
      throw err;
    } finally {
      this.pairing = null;
    }
  }
  async unpair(player) {
    try {
      this.cancelPairing();
      this.state.unpair();
      if (this.id > 0) {
        const deregistered = await this.deregister(player, this);
        this.state.unpaired(deregistered);
      } else {
        return Promise.resolve().then(() => this.state.unpaired());
      }
    } finally {
      return this;
    }
  }
}
extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
