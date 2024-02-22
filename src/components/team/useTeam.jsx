import * as React from "react";
import { useRegistrationQueue } from "../registration-queue/useRegistrationQueue.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { AlertRegisterTeamUnpairedWristbands } from "#components/dialogs/alerts/AlertRegisterTeamUnpairedWrisbands.jsx";
import { MIN_ROSTER_SIZE } from "../../constants.js";
import { areMembersUniqueCb } from "js_utils/misc";
import { Team } from "#afm/team/Team.js";

function useTeam(initialTeam) {
  const {
    queue: roster,
    setQueue,
    enqueue,
    dequeue,
    pairWristband,
    unpairWristband,
  } = useRegistrationQueue(initialTeam?.roster);
  const [team, setTeam] = React.useState(Team.normalize(initialTeam));

  function reset() {
    setQueue([]);
    setTeam(Team.normalize());
  }

  function setName(name) {
    setTeam({ name });
  }

  function addPlayer(player) {
    for (let i = 0; i < roster.length; i++) {
      if (roster[i].username === player.username) {
        return renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="add team player"
            msg="Player is already part of the team!"
          />,
        );
      }
    }
    enqueue(player);
  }
  function removePlayer(player) {
    dequeue(player);
  }
  function register() {
    if (!team.name) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register team"
          msg="Team missing name!"
        />,
      );
    }
    if (roster.length < MIN_ROSTER_SIZE) {
      return renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="register team"
          msg={`Team needs at least ${MIN_ROSTER_SIZE} players!`}
        />,
      );
    }

    let unpaired = [];
    for (let i = 0; i < roster.length; i++) {
      if (!roster[i].wristband.inState("paired")) {
        unpaired.push(roster[i]);
      }
    }
    if (unpaired.length) {
      return renderDialog(
        <AlertRegisterTeamUnpairedWristbands unpairedPlayers={unpaired} />,
      );
    }

    if (
      !areMembersUniqueCb(
        roster,
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

    afm.registerTeam({
      ...team,
      roster,
    });
  }

  return {
    team,
    roster,
    reset,
    pairWristband,
    unpairWristband,
    setName,
    addPlayer,
    removePlayer,
    register,
  };
}

export { useTeam };
