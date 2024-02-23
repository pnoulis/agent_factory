import { TeamCommander } from "../team/TeamCommander.js";

class GrouPartyTeam extends TeamCommander {
  constructor(team, createPlayer, createWristband, createPackage) {
    super(team, createPlayer, createWristband, createPackage);
  }

  async register() {
    const { team } = await parsecmd(
      afm.registerGroupTeam(this, { synthetic: true }),
    );
    this.state.registered(team);
    return this;
  }
}

export { GrouPartyTeam };
