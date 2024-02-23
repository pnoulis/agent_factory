import { MAX_ROSTER_SIZE, MIN_ROSTER_SIZE } from "../../constants.js";
import { AlertRegisterTeamUnpairedWristbands } from "#components/dialogs/alerts/AlertRegisterTeamUnpairedWrisbands.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
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
  register(team, cb) {
    if (!team.name) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register team"
          msg="Team missing name!"
        />,
      );
    }
    if (team.roster.length < MIN_ROSTER_SIZE) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register team"
          msg={`Team needs at least ${MIN_ROSTER_SIZE} players!`}
        />,
      );
    }

    let unpaired = [];
    for (let i = 0; i < team.roster.length; i++) {
      if (!team.roster[i].wristband.inState("paired")) {
        unpaired.push(team.roster[i]);
      }
    }
    if (unpaired.length) {
      return renderDialog(
        <AlertRegisterTeamUnpairedWristbands unpairedPlayers={unpaired} />,
      );
    }

    if (
      !areMembersUniqueCb(
        team.roster,
        (a, b) => a.wristband.colorCode === b.wristband.colorCode,
      )
    ) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register team"
          msg="Duplicate wristband colors"
        />,
      );
    }
    cb(team);
  },
};

export { teamReact };
