import { MAX_ROSTER_SIZE, MIN_ROSTER_SIZE } from "../../constants.js";
import { areMembersUniqueCb } from "js_utils/misc";

const teamReact = {
  addPlayer(team, player, cb) {
    if (team.roster.length === MAX_ROSTER_SIZE) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="add team player"
          msg="Maximum team size reached!"
        />,
      );
    }
    for (let i = 0; i < team.roster.length; i++) {
      if (team.roster[i].username === player.username) {
        return renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="add team player"
            msg="Player is already part of the team!"
          />,
        );
      }
    }
    cb(team, player);
  },
  register(team) {
    debug(team);
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
    }

    if (
      !areMembersUniqueCb(
        team.roster,
        (a, b) => a.wristband.colorCode === b.wristband.colorCode,
      )
    ) {
      throw globalThis.craterr(({ ETEAM }) =>
        ETEAM(`Duplicate wristband colors`),
      );
    }
  },
};

export { teamReact };
