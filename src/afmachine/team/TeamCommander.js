import { Team } from "./Team.js";
import { createEventful } from "../../Eventful.js";
import { stateventful } from "../../Stateful.js";
import { extendProto } from "../../misc/misc.js";

class TeamCommander extends createEventful(Team) {
  constructor(team, createPlayer, createWristband, createPackage) {
    super(team, createPlayer, createWristband, createPackage);
    this.addEvent("stateChange");
  }

  async register() {
    const { team } = await parsecmd(
      afm.registerTeam(this, { synthetic: true }),
    );
    this.state.registered(team);
    return this;
  }
}
extendProto(TeamCommander, stateventful);

export { TeamCommander };
