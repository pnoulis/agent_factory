import { MAX_ROSTER_SIZE, MIN_ROSTER_SIZE } from "../constants.js";
import { areMembersUniqueCb } from "js_utils/misc";

const team = {
  addPlayer(team, player) {
    if (team.roster.length === MAX_ROSTER_SIZE) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Maximum team size reached`),
      );
    } else if (team.roster.find((p) => p.username === player.username)) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM("Player already in team"));
    } else {
      return player;
    }
  },
  removePlayer(team, player) {
    if (team.inState?.("registered") || team.state === "registered") {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Cannot remove a player from a registered team`),
      );
    }
    return player;
  },
  register(team) {
    if (team.inState?.("registered") || team.state === "registered") {
      throw globalThis.craterr(({ ETEAM }) => ETEAM(`Already registered`));
    } else if (!team.name) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM(`Missing name`));
    } else if (team.roster.length < MIN_ROSTER_SIZE) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM(`Not enough players`));
    } else if (
      team.roster.filter(
        (player) =>
          !(
            player.wristband.inState?.("paired") ??
            player.wristband.state === "paired"
          ),
      ).length
    ) {
      throw globalThis.craterr(({ ETEAM }) => ETEAM(`Unpaired wristbands`));
    } else if (
      !areMembersUniqueCb(
        team.roster,
        (a, b) => a.wristband.colorCode === b.wristband.colorCode,
      )
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Duplicate wristband colors`),
      );
    } else {
      return team;
    }
  },
};

export { team };
