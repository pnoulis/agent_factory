import { Player } from "./Player.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { createStateErr } from "../../errors.js";
import { extendProto } from "../../misc/misc.js";

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
      await this.afm.registerPlayer(this, password);
      this.setState("registered");
    } catch (err) {
      this.emit("error", err);
    }
  }

  // async pairWristband() {
  //   try {
  //     this.afm.pairWristband.onReverse("postask", async (ctx, next) => {
  //       await this.wristband.scan();
  //       return next();
  //     });
  //     await this.afm.pairWristband(this, this.wristband);
  //     // await this.wristband.scan();
  //   } catch (err) {
  //     this.emit("error", err);
  //   }
  // }
  // async unpairWristband() {
  //   try {
  //     this.wristband.setState("unpairing");
  //     await this.afm.unpairWristband(this, this.wristband);
  //   } catch (err) {
  //     this.emit("error", err);
  //   }
  // }
}

extendProto(PlayerCommander, stateventful);

export { PlayerCommander };
