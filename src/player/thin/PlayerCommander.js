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
      await this.afm.registerPlayer(this);
      this.setState("registered");
    } catch (err) {
      this.emit("error", err);
    }
  }

  async pairWristband() {
    try {
      await this.afm.pairWristband(this, this.wristband);
    } catch (err) {
      this.emit("error", err);
    }
  }
  async unpairWristband() {
    try {
      await this.afm.unpairWristband(this, this.wristband);
    } catch (err) {
      this.emit("error", err);
    }
  }
}

extendProto(PlayerCommander, stateventful);

export { PlayerCommander };
