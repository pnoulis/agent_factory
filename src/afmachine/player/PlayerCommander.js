import { Player } from "./Player.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class PlayerCommander extends createEventful(Player) {
  constructor(player, wristband) {
    super(player, wristband);
    this.addEvent("stateChange");
  }

  async register(password) {
    const { player } = await parsecmd(
      afm.registerPlayer(this, password, { synthetic: true }),
    );
    this.state.registered(player);
    return this;
  }

  async pairWristband() {
    return await parsecmd(afm.pairWristband(this, this.wristband));
  }

  async unpairWristband() {
    return await parsecmd(afm.unpairWristband(this, this.wristband));
  }
}
extendProto(PlayerCommander, stateventful);

export { PlayerCommander };
