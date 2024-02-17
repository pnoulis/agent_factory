import { createEventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { isFunction } from "js_utils/misc";

class Task extends createEventful() {
  constructor(taskname, Command, routeAlias) {
    super();
    this.taskname = taskname;
    this.routeAlias = routeAlias;
    this.Command = Command;
    Object.setPrototypeOf(Command, this);

    Object.assign(this.events, {
      pretask: [],
      task: [],
      postask: [],
      queued: [],
      pending: [],
      fulfilled: [],
      rejected: [],
      stateChange: [],
    });
  }

  createCommand(afm, props, cb) {
    if (isFunction(props)) {
      cb = props;
      props = {};
    }
    const cmd = Object.create(this.Command);
    afm.commands += 1;
    cmd.afm = afm;
    Object.assign(
      cmd,
      {
        state: "created",
        t_start: null,
        t_end: null,
      },
      props,
    );
    cmd.raw ??= {};
    cmd.opts ??= {};
    cmd.args ??= {};
    cmd.req ??= {};
    cmd.res ??= {};
    cmd.errs ??= [];

    afm.onCmdCreate(cmd);

    const promise = new Promise((resolve, reject) => {
      cmd.resolve = resolve;
      cmd.reject = reject;
    });

    promise.cmd = cmd;
    cmd.promise = promise;

    setTimeout(() => {
      let thetask = [].concat(cmd.middleware);

      cmd.queued = function () {
        const ostate = cmd.state;
        cmd.state = "queued";
        cmd.emit("stateChange", cmd.state, ostate, cmd);
        cmd.onQueued?.();
        cmd.emit("queued", cmd);
      };

      cmd.run = async function () {
        thetask = compose(thetask);
        let ostate;

        try {
          ostate = cmd.state;
          cmd.t_start = Date.now();
          cmd.state = "pending";
          cmd.emit("stateChange", cmd.state, ostate, cmd);
          cmd.onPending?.();
          cmd.emit("pending", cmd);

          await cmd
            .emit("pretask", cmd)
            .then(() => thetask(cmd))
            .then(() => cmd.emit("task", cmd))
            .then(() => {
              ostate = cmd.state;
              cmd.state = "fulfilled";
              cmd.emit("stateChange", cmd.state, ostate, cmd);
              cmd.onSuccess?.();
              cmd.emit("fulfilled", cmd);
            })
            .catch((err) => {
              trace("catch 1");
              cmd.errs.push(err);
              cmd.state = "rejected";
              cmd.emit("stateChange", cmd.state, ostate, cmd);
              cmd.onFailure?.();
              cmd.emit("rejected", cmd);
              throw err;
            })
            .finally(() => {
              trace("finally 1");
              return cmd.emit("postask", cmd);
            });
        } finally {
          if (cmd.errs) {
            trace("finally 2");
            cmd.reject(cmd);
          } else {
            cmd.resolve(cmd);
          }
        }
      };
      cb(cmd);
    }, 0);

    return promise;
  }
}

export { Task };
