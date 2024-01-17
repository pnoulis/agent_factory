import { compose } from "./compose.js";

function runTask(afm, task, ...argv) {
  const cb = isFunction(argv.at(-1)) ? argv.splice(-1, 1) : null;
  setImmediate(async () => {
    const precmd = task.events.command;
    task.events.command = precmd.filter((handler) => handler.persist);
    const cmd = task.createCommand(afm, argv, cb);
    try {
      await compose(
        []
          .concat(
            precmd.map((handler) => handler.listener),
            cmd,
          )
          .filter((middleware) => !!middleware),
      )(cmd);
      task.parseSuccessCmd(cmd);
      cmd.emit("fulfilled", cmd);
    } catch (err) {
      task.parseFailedCmd(cmd);
      cmd.emit("rejected", err, cmd);
    } finally {
      cmd.emit("settled", cmd);
    }
  });
}

export { runTask };
