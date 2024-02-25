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
      settled: [],
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
    promise.parse = () =>
      promise
        .then((_cmd) => _cmd.res)
        .catch((_cmd) => {
          throw _cmd.errs.at(-1);
        });

    setTimeout(() => {
      cmd.queued = function () {
        const ostate = cmd.state;
        cmd.state = "queued";
        cmd.emit("stateChange", cmd.state, ostate, cmd);
        cmd.onQueued?.();
        cmd.emit("queued", cmd);
      };

      cmd.run = async function () {
        const thetask = compose(cmd.middleware);
        let ostate;

        try {
          ostate = cmd.state;
          cmd.t_start = Date.now();
          cmd.state = "pending";
          await cmd.emit("stateChange", cmd.state, ostate, cmd);
          debug("after state change emit");
          cmd.onPending?.();
          debug(cmd);
          await cmd.emit("pending", cmd);
          debug("after pending");

          await cmd
            .emit("pretask", cmd)
            .then(async () => await thetask(cmd))
            .then(async () => await cmd.emit("task", cmd))
            .then(async () => {
              ostate = cmd.state;
              cmd.onSuccess?.();
              cmd.state = "fulfilled";
              await cmd.emit("stateChange", cmd.state, ostate, cmd);
              await cmd.emit("settled", cmd);
              await cmd.emit("fulfilled", cmd);
              return cmd;
            })
            .catch(async (err) => {
              debug(err);
              debug("catch 1");
              cmd.onFailure?.();
              cmd.errs.push(err);
              cmd.state = "rejected";
              debug("calling state change");
              await cmd.emit("stateChange", cmd.state, ostate, cmd);
              debug("after state change");
              await cmd.emit("settled", cmd);
              cmd.emit("rejected", cmd);
              throw err;
            })
            .finally(() => cmd.emit("postask", cmd));
        } finally {
          debug(cmd, "finally 2");
          if (cmd.errs.length) {
            cmd.reject(cmd);
            throw cmd.errs.at(-1);
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
