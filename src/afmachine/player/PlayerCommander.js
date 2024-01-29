import { Player } from "./Player.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { createStateErr } from "../../errors.js";
import { extendProto } from "../../misc/Misc.js";

extendProto(PlayerCommander, stateventful);
class PlayerCommander extends createEventful(Player) {
  constructor(afm, player, wristband) {
    super(player, wristband);
    this.addEvent("stateChange");
    this.afm = afm;
  }

  throwStateErr(errCode) {
    const state = this.getState().name;
    switch (errCode) {
      case this.errCodes.EPLAYER_STATE:
      // fall through
      case this.errCodes.EPLAYER_STATE_CANCELS_OUT:
        return (msg) => {
          throw createStateErr({
            msg,
            severity: "warn",
            errCode,
            state,
          });
        };
      case this.errCodes.EPLAYER_STATE_IMPOSSIBLE:
        return (msg, player) => {
          throw createStateErr({
            msg,
            severity: "fatal",
            errCode,
            state,
            player,
          });
        };
      default:
        throw new TypeError(`Unrecognized error code: '${errCode}'`);
    }
  }

  async register(password) {
    try {
      const player = await this.afm.registerPlayer(this, password);
      this.state.registered(player);
    } catch (err) {
      this.emit("error", err);
    } finally {
      return this;
    }
  }

  async pairWristband() {
    try {
      this.wristband.setState("pairing");
      const { wristband } = await this.afm.pairWristband(this, this.wristband);
      this.wristband.state.paired(wristband);
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

export { PlayerCommander };
