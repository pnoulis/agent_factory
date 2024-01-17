function enqueue(queue, cmd) {
  return new Promise((resolve, reject) => {
    queue.push(() => cmd().then(resolve, reject));
    if (queue.length > 1) return;
    runQueue(queue[0]);
    async function runQueue(cmd) {
      if (!cmd) return;
      await cmd();
      queue.shift();
      runQueue(cmd[0]);
    }
  });
}

export { enqueue };
