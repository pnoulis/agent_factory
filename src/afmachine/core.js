import { compose } from "./compose.js";

const afm = {
  createCommand(task, cb) {
    const afm = this;
    const cmd = Object.create(task);
    cmd.value = function () {};
    cmd.target = function () {};

    setImmediate(() => {
      const precmd = [...afm.events.precmd];
      const pretask = [...task.events.pretask];
      const thetask = [...task.middleware];
      const postask = [...task.events.postask];
      const postcmd = [...afm.events.postcmd];

      async function comm(ctx) {
        await compose([pretask, thetask, postask])({
          cmd,
          ctx,
        })
          .then(
            (ctx) => {
              return Promise.resolve(task.targetcb(ctx.target()));
            },
            (err) => {
              return Promise.reject(task.onFailure(err, ctx, task.targetcb));
            },
          )
          .then(() => {
            return Promise.resolve(task.onSuccess(ctx));
          });
      }
    });
    return cmd;
  },
};
