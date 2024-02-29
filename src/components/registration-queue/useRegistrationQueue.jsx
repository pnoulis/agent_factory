import * as React from "react";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { confirmUnpairWristband } from "../dialogs/confirms/confirmUnpairWristband";

function nextPlayer(queue) {
  for (let i = 0; i < queue.length; i++) {
    if (queue[i].wristband.inState("unpaired")) return queue[i];
  }
  return null;
}

function useRegistrationQueue(players) {
  const [queue, setQueue] = React.useState(() =>
    [].concat(players).filter((p) => !!p),
  );
  const queueRef = React.useRef();
  const pairingRef = React.useRef();
  queueRef.current = queue;

  async function stopPairing() {
    try {
      for (let i = 0; i < queueRef.current.length; i++) {
        if (queueRef.current[i].wristband.inState("pairing")) {
          await queueRef.current[i].unpairWristband();
        }
      }
    } catch (err) {
    } finally {
      pairingRef.current = null;
      return Promise.resolve();
    }
  }

  async function pairWristband(player) {
    await stopPairing();
    pairingRef.current = player;
    try {
      await player.pairWristband();
      pairingRef.current = null;
    } catch (err) {
      if (err.code !== ERR_CODES.UNSUB) {
        pairingRef.current = null;
      }
      throw err;
    }
  }

  async function unpairWristband(player) {
    if (player.wristband.inState("paired")) {
      if (!(await confirmUnpairWristband(player))) {
        return;
      }
    }
    await player.unpairWristband();
    pairingRef.current = null;
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
    setQueue(queue.concat(players));
  }

  function dequeue(...players) {
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
      if (pairingRef.current === players[i]) {
        stopPairing();
      }
    }
    setQueue(newQueue);
  }

  React.useEffect(() => {
    function onidle() {
      setTimeout(() => {
        const player = nextPlayer(queueRef.current);
        if (player && !pairingRef.current) {
          pairWristband(player);
        }
      }, 500);
    }
    afm.on("idle", onidle);
    return () => afm.removeListener("idle", onidle);
  }, [queue, setQueue]);

  React.useEffect(() => {
    return () => {
      stopPairing();
    };
  }, []);

  return {
    queue,
    setQueue,
    nextPlayer,
    enqueue,
    dequeue,
    pairWristband,
    unpairWristband,
  };
}

export { useRegistrationQueue };
