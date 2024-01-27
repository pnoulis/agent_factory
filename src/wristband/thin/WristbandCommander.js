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
    try {
      const { unsubed, wristband } = await this.afm.scanWristband((unsubed) => {
        console.log("UNSUBED CALLBACK");
      });
    } catch (err) {
      this.emit("error", err);
    }
  }
}

extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
