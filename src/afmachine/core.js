import { compose } from "./compose.js";

const afm = {
  createCommand(task, cb) {
    const cmd = new Promise((resolve, reject) => {
      cmd.resolve = resolve;
      cmd.reject = reject;
    });

    cmd.task = task;
    cmd.afm = this;
    cmd.req = null;
    cmd.res = {};
    cmd.err = null;

    setImmediate(() => {
      const precmd = [...afm.events.precmd];
      const pretask = [...task.events.pretask];
      const thetask = [...task.middleware];
      const postask = [...task.events.postask];
      const postcmd = [...afm.events.postcmd];

      cmd.run = function (ct) {
        return compose([precmd, pretask, thetask])(cmd)
          .then(
            () => Promise.resolve(cmd.resolve(cmd.toClient(cmd))),
            (err) => {
              cmd.reject(err);
              throw err;
            },
          )
          .then(
            () => cmd.onSuccess(cmd),
            (err) => cmd.onFailure(err, cmd),
          )
          .finally(() => compose([postask, postcmd](cmd)));
      };
      cb(cmd);
    });
    return cmd;
  },
};
