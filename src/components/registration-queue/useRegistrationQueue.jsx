import * as React from "react";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { Player } from "#afm/player/Player.js";

function nextPlayer(queue) {
  let next;
  debug(queue, "NEXT PLAYER");
  for (let i = 0; i < queue.length; i++) {
    if (
      queue[i].wristband.inState("pairing") ||
      queue[i].wristband.inState("unpairing")
    ) {
      debug("noet found");
      return null;
    }
    debug(queue[i]);
    debug("found");
    next ||= queue[i].wristband.inState("unpaired") && queue[i];
  }
  return next;
}

function useRegistrationQueue(players) {
  const [queue, setQueue] = React.useState(() =>
    [].concat(players).filter((p) => !!p),
  );
  const queueRef = React.useRef();

  function pairWristband(player) {
    nextPlayer(queue) && player.pairWristband();
  }

  async function unpairWristband(player) {
    player.unpairWristband();
  }

  function enqueue(...players) {
    for (let i = 0; i < players.length; i++) {
      for (let y = 0; y < queue.length; y++) {
        if (players[i].username === queue[y].username) {
          return renderDialog(
            <DialogAlertStandard
              initialOpen
              heading="pair wristband"
              msg="Player is already in the queue!"
            />,
          );
        }
      }
    }
    debug(players, "enqueue");
    setQueue(queue.concat(players));
  }

  function dequeue(...players) {
    debug("playres", "dequeue");
    const newQueue = [];
    for (let i = 0; i < queue.length; i++) {
      let y = 0;
      for (; y < players.length; y++) {
        if (queue[i].username === players[y].username) {
          break;
        }
      }
      if (y === players.length) newQueue.push(queue[i]);
    }
    for (let i = 0; i < players.length; i++) {
      players[i].wristband.cancelPairing();
    }
    setQueue(newQueue);
  }

  React.useEffect(() => {
    debug("QUEUE CHANGE");
    const onIdle = () => nextPlayer(queue)?.pairWristband?.();
    queueRef.current = queue;
    afm.on("idle", onIdle);
    return () => afm.removeListener("idle", onIdle);
  }, [queue, setQueue]);

  React.useEffect(() => {
    return () => {
      for (let i = 0; i < queueRef.current.length; i++) {
        if (queueRef.current[i]?.wristband?.inState?.("pairing")) {
          queueRef.current[i].wristband.cancelPairing();
        }
      }
    };
  }, []);

  return { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband };
}

export { useRegistrationQueue };
