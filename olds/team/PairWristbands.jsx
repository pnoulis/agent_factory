import * as React from "react";
import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard.jsx";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { GrouPartyPlayer } from "#afm/grouparty/GrouPartyPlayer.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { GrouPartyWristband } from "#afm/grouparty/GrouPartyWristband.js";

function PairWristbands({ className, team }) {
  const createPlayer = React.useCallback(
    team.isTemporary
      ? (player, wristband) =>
          new GrouPartyPlayer(player, new GrouPartyWristband(wristband))
      : (player, wristband) =>
          new PlayerCommander(player, new WristbandCommander(wristband)),
    [team.isTemporary],
  );
  const rosterRef = React.useRef();

  rosterRef.current ??= team.roster.map((player) =>
    createPlayer(player, player.wristband),
  );

  debug(rosterRef.current, " roster");
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue(rosterRef.current);

  debug(queue, "queue");

  return (
    <RegistrationQueue className={className} style={{ maxHeight: "500px" }}>
      {queue.map((p, i) => {
        return (
          <StandardPlayerActionCard
            key={p.username + i}
            ctx={p}
            onPlayerRemove={dequeue}
            onWristbandPair={pairWristband}
            onWristbandUnpair={unpairWristband}
          />
        );
      })}
    </RegistrationQueue>
  );
}

export { PairWristbands };
