import * as React from "react";
import { useRegistrationQueue } from "../../components/registration-queue/useRegistrationQueue.jsx";
import { RegistrationQueue } from "../../components/registration-queue/RegistrationQueue.jsx";
import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { GrouPartyPlayer } from "#afm/grouparty/GrouPartyPlayer.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { GrouPartyWristband } from "#afm/grouparty/GrouPartyWristband.js";
import { team as teamController } from "/src/controllers/team.js";
import { renderDialog } from "../../components/dialogs/renderDialog";
import { DialogAlertStandard } from "../../components/dialogs/alerts/DialogAlertStandard";

function PairWristbands({ team }) {
  const createPlayer = React.useCallback(
    team.isTemporary
      ? (player, wristband) =>
          new GrouPartyPlayer(player, new GrouPartyWristband(wristband))
      : (player, wristband) =>
          new PlayerCommander(player, new WristbandCommander(wristband)),
    [team.isTemporary],
  );

  const rosterRef = React.useRef(null);
  rosterRef.current ??= team.roster.map((player) =>
    createPlayer(player, player.wristband),
  );

  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue(rosterRef.current);

  const removePlayer = (player) => {
    try {
      teamController.removePlayer(team, player);
      dequeue(player);
    } catch (err) {
      renderDialog(
        <DialogAlertStandard
          initialOpen
          heading="remove player"
          msg={err.message}
        />,
      );
    }
  };

  return (
    <RegistrationQueue
      style={{ alignContent: queue.length > 3 ? "center" : "start" }}
    >
      {queue.map((player, i) => (
        <StandardPlayerActionCard
          key={player.username + i}
          ctx={player}
          onPlayerRemove={removePlayer}
          onWristbandPair={pairWristband}
          onWristbandUnpair={unpairWristband}
        />
      ))}
    </RegistrationQueue>
  );
}

export { PairWristbands };
