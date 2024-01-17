import { Eventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { enqueue } from "./enqueue.js";
import { listPkgs } from "./tasks/listPkgs.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";
import { createTask } from "./createTask.js";
import { isFunction } from "js_utils/misc";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "command",
      "commandStarted",
      "commandFinished",
      "commandAborted",
    ]);
    this.commandQueue = [];
    this.backend = new BackendRegistration();
  }
}

Afm.prototype.listPkgs = createTask(listPkgs);

Afm.prototype.run = async function (command, cb) {
  const precmd = command.task.events.command;
  command.task.events.command = precmd.filter((handler) => handler.persist);

  const cmd = compose(
    precmd.concat(async (ctx, next) => {
      await enqueue(ctx.afm.commandQueue, () =>
        compose(ctx.task.middleware)(command),
      );
      return next();
    }),
  );

  try {
    await cmd(command);
    cb(command.res.raw.timestamp);
    command.task.emit("fulfilled", command.res.raw.timestamp);
  } catch (err) {
    console.log("error");
    cb(command.res.raw.timestamp);
    command.task.emit("rejected", command.res.raw.timestamp);
  } finally {
    command.task.emit("settled", command.res.raw.timestamp);
    return command.res.raw.timestamp;
  }
};

const afm = new Afm();

export { afm };
