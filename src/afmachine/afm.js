import { Eventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { enqueue } from "./enqueue.js";
import { listPkgs } from "./tasks/listPkgs.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";
import { createTask } from "./createTask.js";
import { isFunction } from "js_utils/misc";
import { createUnexpectedErr } from "../errors.js";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "precmd",
      "postcmd",
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

Afm.prototype.createCommand = function (task, cb, ctx) {
  const cmd = Object.create(task);
  cmd.ctx = Object.assign({ req: {}, res: {}, error: null }, ctx);
  cmd.targetcb = cb;

  cmd.value = function () {
    if (!Object.hasOwn(cmd, "__value")) {
      cmd.__value = new Promise(function (resolve, reject) {
        cmd.__resolve = resolve;
        cmd.__reject = reject;
      });
    }
    return Promise.resolve(cmd.__value);
  };

  // This function operates under the assumption that it will be invoked by afm
  // asynchronously.
  cmd.run = function () {
    // pre task middleware
    const precmd = task.events.precmd;
    task.events.precmd = cmd.precmd.filter((handler) => handler.persist);

    // task middleware

    // post task middleware
  };

  // pre task middleware
  cmd.precmd = task.events.precmd;
  task.events.precmd = cmd.precmd.filter((handler) => handler.persist);

  // task middleware
  // at task.middleware or cmd.middleware

  // post task middleware
  cmd.postcmd = task.events.postcmd;
  task.events.postcmd = cmd.postcmd.filter((handler) => handler.persist);

  return cmd;
};

Afm.prototype.run = async function (task, cb) {
  try {
    const precmd = task.task.events.precmd;
    task.task.events.precmd = precmd.filter((handler) => handler.persist);
    const postcmd = task.task.events.postcmd;
    task.task.events.postcmd = postcmd.filter((handler) => handler.persist);
    const cmd = async function (ctx, next) {
      await enqueue(ctx.afm.commandQueue, () => compose(task.middleware)(ctx));
      await Promise.resolve(cb(null, ctx));
      return next();
    };

    try {
      await compose([].concat(precmd, cmd, postcmd))(task);
      task.task.onSuccess(task);
      task.task.emit("fulfilled", task);
    } catch (err) {
      await task.task.onFailure(err, task, cb);
      task.task.emit("rejected", task);
    }
  } catch (err) {
    task.error = createUnexpectedErr(err, task.error);
    task.task.emit("rejected", task);
    this.emit("error", task);
  } finally {
    task.task.emit("settled", task);
    return task;
  }
};

const afm = new Afm();

export { afm };
