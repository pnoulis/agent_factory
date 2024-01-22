import { Eventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { enqueue } from "./enqueue.js";
import { listPkgs } from "./tasks/listPkgs.js";
import { registerPlayer } from "./tasks/registerPlayer.js";
import { scanWristband } from "./tasks/scanWristband.js";
import { BackendRegistration } from "../backend/registration/BackendRegistration.js";
import { createTask } from "./createTask.js";
import { isFunction } from "js_utils/misc";

class Afm extends Eventful {
  constructor() {
    super([
      "connected",
      "disconnected",
      "error",
      "precmd",
      "postcmd",
      "cmd",
      "cmdstart",
      "cmdend",
    ]);
    this.commandQueue = [];
    this.backend = new BackendRegistration();
  }
}

Afm.prototype.listPkgs = createTask(listPkgs);
Afm.prototype.registerPlayer = createTask(registerPlayer);
Afm.prototype.scanWristband = createTask(scanWristband);

Afm.prototype.createCommand = function (task, cb, args) {
  return new Promise((resolve, reject) => {
    task.afm = this;
    const cmd = Object.create(task);
    Object.assign(cmd, {
      state: null,
      args: args ?? null,
      req: {},
      res: {},
      raw: null,
      errs: [],
    });
    setImmediate(() => {
      const middleware = compose(
        [
          ...afm.events.precmd,
          ...task.events.pretask,
          async (ctx, next) => {
            try {
              await compose(task.middleware)(ctx);
              await Promise.resolve(resolve(ctx.toClient(ctx)));
              return next();
            } catch (err) {
              reject(err);
              throw err;
            }
          },
          ...task.events.postask,
          ...afm.events.postcmd,
        ].map((fn) => (fn.listener ? fn.listener : fn)),
      );

      cmd.run = async function () {
        try {
          afm.emit("cmdstart", cmd);
          await middleware(cmd);
          cmd.onSuccess(cmd);
        } catch (err) {
          cmd.onFailure(err, cmd);
          afm.emit("error", cmd);
        } finally {
          afm.emit("cmdend", cmd);
        }
      };
      cb(cmd);
    });

    return cmd;
  });
};

Afm.prototype.run = async function (cmd, { queue = true } = {}) {
  cmd.onQueued(cmd);
  this.emit("cmd", cmd);
  if (!queue) {
    cmd.run();
  } else {
    enqueue(this.commandQueue, cmd.run);
  }
};

process.on("unhandledRejection", (err, promise) => {
  console.log("unhandled rejection");
});
const afm = new Afm();

export { afm };
