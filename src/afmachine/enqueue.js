async function run(queue, cmd) {
  if (!cmd) return;
  await cmd();
  queue.shift();
  run(queue, queue[0]);
}

function enqueue(queue, cb) {
  queue.push(cb);
  if (queue.length > 1) return;
  run(queue, queue[0]);
}

export { enqueue };
