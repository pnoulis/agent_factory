import * as React from "react";
import { DialogAlertStandard } from "#components/dialogs/alerts/DialogAlertStandard.jsx";
import { renderDialog } from "#components/dialogs/renderDialog.jsx";
import { confirmUnpairWristband } from "../dialogs/confirms/confirmUnpairWristband";

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
  const pairingRef = React.useRef();
  queueRef.current = queue;

  async function stopPairing() {
    try {
      for (let i = 0; i < queueRef.current.length; i++) {
        if (queueRef.current[i].wristband.inState("pairing")) {
          debug("stopPairing() unpair wristband");
          await queueRef.current[i].unpairWristband();
        }
      }
    } catch (err) {
    } finally {
      debug("stopPairing() null pairingref");
      pairingRef.current = null;
      return Promise.resolve();
    }
  }

  async function pairWristband(player) {
    await stopPairing();
    debug("pairWristband() will pair wristband");
    pairingRef.current = player;
    await player.pairWristband();
    pairingRef.current = null;
    debug("pairWristband, paired");
  }

  async function unpairWristband(player) {
    try {
      if (player.wristband.inState("paired")) {
        if (!(await confirmUnpairWristband(player))) {
          return;
        }
      }
      debug("unpair wristband");
      await player.unpairWristband();
      pairingRef.current = null;
    } catch (err) {
    } finally {
      debug("stop pairing");
    }
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
    debug("DEQUE SEARCHING FOR pairing player");
    debug(pairingRef.current);
    for (let i = 0; i < players.length; i++) {
      debug(players[i], `player: ${i}`);
      if (pairingRef.current === players[i]) {
        debug("DEQUE stop pairing");
        stopPairing();
      }
    }
    setQueue(newQueue);
  }

  React.useEffect(() => {
    function onidle() {
      setTimeout(() => {
        const player = nextPlayer(queueRef.current);
        debug("IDLE");
        if (player && !pairingRef.current) {
          debug("WILL PAIR");
          // pairingRef.current = player;
          pairWristband(player);
          // player.pairWristband().then(() => {
          //   pairingRef.current = null;
          // });
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

  return { queue, setQueue, enqueue, dequeue, pairWristband, unpairWristband };
}

export { useRegistrationQueue };
