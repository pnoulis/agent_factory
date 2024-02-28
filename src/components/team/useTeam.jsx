import * as React from "react";
import { useRegistrationQueue } from "../registration-queue/useRegistrationQueue.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { AlertRegisterTeamUnpairedWristbands } from "#components/dialogs/alerts/AlertRegisterTeamUnpairedWrisbands.jsx";
import { MAX_ROSTER_SIZE, MIN_ROSTER_SIZE } from "../../constants.js";
import { areMembersUniqueCb } from "js_utils/misc";
import { Team } from "#afm/team/Team.js";
import { TeamCommander } from "#afm/team/TeamCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { generateRandomName } from "js_utils";
import { teamReact } from "#afm/team/TeamReact.jsx";

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

const createTeam = (team) =>
  new TeamCommander(
    team,
    (player, wristband) => new PlayerCommander(player, wristband),
    (wristband) => new WristbandCommander(wristband),
  );

function useTeam(initialTeam, { ctx } = {}) {
  const [commander, setCommander] = React.useState(
    initialTeam instanceof Team ? initialTeam : createTeam(initialTeam),
  );
  const [randomTeamName, setRandom] = React.useState(() =>
    generateRandomName(),
  );

  const {
    queue: roster,
    setQueue,
    enqueue,
    dequeue,
    pairWristband,
    unpairWristband,
  } = ctx || useRegistrationQueue(commander.roster, createPlayer);

  const isThisTeamRegistering = (cmd) => cmd.args.team.name === commander.name;

  function reset() {
    setQueue([]);
    setCommander(createTeam());
  }

  function setName(name) {
    commander.name = name;
  }

  function addPlayer(player) {
    teamReact.addPlayer(commander, player, (team, player) => {
      enqueue(createPlayer(player, player.wristband));
    });
  }
  function removePlayer(player) {
    dequeue(player);
  }
  function register() {
    commander.name ||= randomTeamName;
    commander.roster = roster;
    teamReact.register(commander, (team) => team.register());
  }

  return {
    commander,
    roster,
    reset,
    isThisTeamRegistering,
    pairWristband,
    unpairWristband,
    setName,
    addPlayer,
    removePlayer,
    register,
    randomTeamName,
  };
}

export { useTeam };
