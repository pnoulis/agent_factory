import { createEventful } from "../Eventful.js";
import { compose } from "./compose.js";
import { isFunction } from "js_utils/misc";

class Task extends createEventful() {
  constructor(taskname, Command) {
    super();
    this.taskname = taskname;
    this.Command = Command;
    Object.setPrototypeOf(Command, this);

    Object.assign(this.events, {
      pretask: [],
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
    cmd.afm = afm;
    Object.assign(
      cmd,
      {
        raw: null,
        state: "",
        t_start: null,
        t_end: null,
      },
      props,
    );
    cmd.opts ??= {};
    cmd.args ??= {};
    cmd.req ??= {};
    cmd.res ??= {};
    cmd.errs ??= [];

    const promise = new Promise((resolve, reject) => {
      cmd.resolve = resolve;
      cmd.reject = reject;
    });

    promise.cmd = cmd;
    cmd.promise = promise;

    setImmediate(() => {
      let pretask = [...afm.events.precmd, ...cmd.events.pretask].map(
        (fn) => fn.listener,
      );
      let thetask = [].concat(cmd.middleware);
      let postask = [...cmd.events.postask, ...afm.events.postcmd].map(
        (fn) => fn.listener,
      );

      cmd.queued = function () {
        const ostate = cmd.state;
        cmd.state = "queued";
        cmd.emit("stateChange", cmd.state, ostate, cmd);
        cmd.onQueued?.();
        cmd.emit("queued", cmd);
      };

      cmd.run = async function () {
        pretask = compose(pretask);
        thetask = compose(thetask);
        postask = compose(postask);
        let pretaskerr;
        let taskerr;
        let postaskerr;
        let ostate;

        try {
          ostate = cmd.state;
          cmd.t_start = Date.now();
          cmd.state = "pending";
          cmd.emit("stateChange", cmd.state, ostate, cmd);
          cmd.onPending?.();
          cmd.emit("pending", cmd);
          await pretask(cmd).catch((err) => {
            pretaskerr = err;
            throw err;
          });
          await thetask(cmd).catch((err) => {
            cmd.errs.push(err);
            taskerr = err;
            throw err;
          });
          await postask(cmd).catch((err) => {
            cmd.errs.push(err);
            postaskerr = err;
            throw err;
          });
        } catch (err) {
          switch (err) {
            case pretaskerr:
            // fall through
            case taskerr:
              await postask(cmd).catch((err) => {
                cmd.errs.push(err);
                postaskerr = err;
              });
              break;
            case postaskerr:
              break;
            default:
              cmd.errs.push(err);
              break;
          }
        } finally {
          ostate = cmd.state;
          cmd.t_end = Date.now();
          if (cmd.errs.length === 0) {
            cmd.state = "fulfilled";
            cmd.emit("stateChange", cmd.state, ostate, cmd);
            cmd.onSuccess?.();
            cmd.resolve(cmd);
            cmd.emit("fulfilled", cmd);
          } else {
            cmd.state = "rejected";
            cmd.emit("stateChange", cmd.state, ostate, cmd);
            cmd.onFailure?.();
            cmd.reject(cmd);
            cmd.emit("rejected", cmd);
          }
        }
      };

      cb(cmd);
    });

    return promise;
  }
}

export { Task };
