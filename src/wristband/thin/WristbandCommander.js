import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(afm, wristband, type) {
    super(wristband);
    this.afm = afm;
    this.addEvent("stateChange");
  }

  pair() {}
  unpair() {}
  async scan() {
    let _unsub;
    try {
      this.setState("pairing");
      const { wristband: scanned } = await this.afm.scanWristband(
        (unsub) => {
          _unsub = unsub;
        },
        { queue: false },
      );
      _unsub = null;
      this.normalize(scanned, { state: "paired" });
    } catch (err) {
      this.emit("error", err);
    } finally {
      if (typeof _unsub === "function") {
        _unsub();
      }
    }
  }
}

extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
