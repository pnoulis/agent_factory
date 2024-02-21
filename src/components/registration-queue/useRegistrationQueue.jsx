import * as React from "react";

function useRegistrationQueue(players) {
  const [queue, setQueue] = React.useState(
    [].concat(players).filter((p) => !!p),
  );

  function enqueue(player) {
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].username === player.username) {
        return alert(`${player.username} already in queue`);
      }
    }
    setQueue(queue.concat(player));
  }

  function dequeue(player) {
    const newQueue = [];
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].username === player.username) continue;
      newQueue.push(queue[i]);
    }
    setQueue(newQueue);
  }

  return { queue, enqueue, dequeue };
}

export { useRegistrationQueue };
