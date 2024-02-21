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

  async register(password) {
    try {
      const { player } = await this.afm.registerPlayer(this, password);
      this.state.registered(player);
    } catch (err) {
      this.emit("error", err);
    } finally {
      return this;
    }
  }

  async pairWristband() {
    try {
      await this.afm.pairWristband(this, this.wristband);
    } catch (err) {
      this.emit("error", err);
      // if (/EWRISTBAND/.test(err.label)) {
      //   this.wristband.emit("error", err);
      // } else {
      //   this.emit("error", err);
      // }
    } finally {
      return this;
    }
  }

  async unpairWristband() {
    try {
      this.wristband.setState("unpairing");
      const { wristband } = await this.afm.unpairWristband(
        this,
        this.wristband,
      );
      this.wristband.state.unpaired(wristband);
    } catch (err) {
      if (/EWRISTBAND/.test(err.label)) {
        this.wristband.emit("error", err);
      } else {
        this.emit("error", err);
      }
    } finally {
      return this;
    }
  }
}
extendProto(PlayerCommander, stateventful);

export { PlayerCommander };
