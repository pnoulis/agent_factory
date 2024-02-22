import * as React from "react";
import { PlayerCommander } from "#afm/player/PlayerCommander.js";
import { WristbandCommander } from "#afm/wristband/WristbandCommander.js";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";

const createPlayer = (player) =>
  new PlayerCommander(player, new WristbandCommander(player.wristband));

function pairWristband(player) {
  player.pairWristband();
}

function unpairWristband(player) {
  player.unpairWristband();
}

function nextPlayer(queue) {
  let next;
  for (let i = 0; i < queue.length; i++) {
    if (
      queue[i].wristband.inState("pairing") ||
      queue[i].wristband.inState("unpairing")
    ) {
      return null;
    }
    next ||= queue[i].wristband.inState("unpaired") && queue[i];
  }
  return next;
}

function useRegistrationQueue(players) {
  const [queue, setQueue] = React.useState(() =>
    []
      .concat(players)
      .filter((p) => !!p)
      .map(createPlayer),
  );

  function enqueue(player) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].username === player.username) {
        return renderDialog(
          <DialogAlertStandard
            initialOpen
            heading="pair wristband"
            msg="Player is already in the queue!"
          />,
        );
      }
    }
    setQueue(queue.concat(createPlayer(player)));
  }

  function dequeue(player) {
    const newQueue = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].username === player.username) continue;
      newQueue.push(queue[i]);
    }
    setQueue(newQueue);
  }

  React.useEffect(() => {
    const onIdle = () => nextPlayer(queue)?.pairWristband?.();
    afm.on("idle", onIdle);
    return () => afm.removeListener("idle", onIdle);
  }, [queue, setQueue]);

  return { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband };
}

export { useRegistrationQueue };
