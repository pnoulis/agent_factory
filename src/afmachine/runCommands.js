async function runCommands(afm, cmd) {
  if (cmd == null) return Promise.resolve();
  try {
    cmd.task.emit("pending", cmd);
    cmd.task.emit("stateChange", "queued", "pending", cmd);
    afm.emit("commandStarted", cmd);
    await cmd();
    cmd.task.emit("fulfilled", cmd);
    cmd.task.emit("stateChange", "pending", "fulfilled", cmd);
  } catch (err) {
    afm.emit("error", err, cmd);
    cmd.task.emit("rejected", cmd);
    cmd.task.emit("stateChange", "pending", "rejected", cmd);
  } finally {
    cmd.task.emit("settled", cmd);
    cmd.task.emit(
      "stateChange",
      cmd.error ? "rejected" : "fulfilled",
      "settled",
      cmd,
    );
    afm.emit("commandFinished", cmd);
  }
  afm.commandQueue.shift();
  runCommands(afm, afm.commandQueue.at(0));
}

export { runCommands };
