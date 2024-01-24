import { Player } from "./Player.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class PlayerCommander extends createEventful(Player) {
  constructor(afm, player, wristband) {
    super(player, wristband);
    this.addEvent("stateChange");
    this.afm = afm;
  }

  async register() {
    try {
      const registered = await this.afm.registerPlayer(this);
      this.normalize(registered);
    } catch (err) {
      this.emit("error", err);
    }
  }

  async toggleWristband() {
    try {
      const toggled = await this.wristband.toggle(this);
    } catch (err) {
      this.emit("error", err);
    }
  }
}

extendProto(PlayerCommander, stateventful);

export { PlayerCommander };
