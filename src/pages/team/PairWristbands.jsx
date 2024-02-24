import { RegistrationQueue } from "#components/registration-queue/RegistrationQueue.jsx";
import { useRegistrationQueue } from "#components/registration-queue/useRegistrationQueue.jsx";
import { StandardPlayerActionCard } from "../../components/player/StandardPlayerActionCard.jsx";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";

const createPlayer = (player, wristband) =>
  new PlayerCommander(player, new WristbandCommander(wristband));

function PairWristbands({ className, team }) {
  const rosterRef = React.useRef();
  rosterRef.current ??= team.roster.map((player) =>
    createPlayer(player, player.wristband),
  );
  debug(rosterRef.current, " roster");
  const { queue, enqueue, dequeue, pairWristband, unpairWristband } =
    useRegistrationQueue(rosterRef.current);

  debug(queue, "queue");

  return (
    <RegistrationQueue
      className={className}
      style={{ maxHeight: "500px", alignContent: "center" }}
    >
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
