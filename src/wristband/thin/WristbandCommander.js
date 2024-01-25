import { Wristband } from "./Wristband.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class WristbandCommander extends createEventful(Wristband) {
  constructor(afm, wristband) {
    super(wristband);
    this.afm = afm;
    this.addEvent("stateChange");
  }

  pair() {}
  unpair() {}
}

extendProto(WristbandCommander, stateventful);

export { WristbandCommander };
