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
    let _unsub;
    try {
      const { wristband } = await parsecmd(
        afm.scanWristband(
          (unsub) => {
            this.pairing.unsub = unsub;
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

  async cancelPairing() {
    if (!this.pairing) return Promise.resolve(false);
    if (this.pairing?.unsub) {
      await this.pairing.unsub();
    }
    this.pairing.reject(
      craterr(({ EWRISTBAND }) =>
        EWRISTBAND({ msg: "Unsubscribed", severity: "info" }),
      ),
    );
    this.pairing = null;
    return Promise.resolve().then(() => this.state.unpaired(this));
  }

  async pair(player) {
    this.pairing = {};
    return new Promise(async (resolve, reject) => {
      this.pairing.resolve = resolve;
      this.pairing.reject = reject;
      try {
        const wristband = await this.scan();
        const registered = await this.register(player, wristband);
        this.state.paired(registered);
        resolve(this);
      } catch (err) {
        this.state.unpaired(this);
        reject(err);
      } finally {
        this.pairing = null;
      }
    });
  }
  async unpair(player) {
    try {
      const cancelled = await this.cancelPairing();
      if (cancelled) return cancelled;
      const deregistered = await this.deregister(player, this);
      this.state.unpaired(deregistered);
    } catch (err) {
    } finally {
      return this;
    }
    return this;
  }
}
extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
