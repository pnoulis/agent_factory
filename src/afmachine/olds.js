// Afm.prototype.createCommand = function (task, cb, args) {
//   return new Promise((resolve, reject) => {
//     task.afm = this;
//     const cmd = Object.create(task);
//     Object.assign(cmd, {
//       args: args ?? null,
//       req: {},
//       res: {},
//       raw: null,
//       err: null,
//     });
//     setImmediate(() => {
//       const premiddleware = compose(
//         [...afm.events.precmd, ...task.events.pretask].map((fn) => fn.listener),
//       );

//       const middleware = async function (ctx, next) {
//         try {
//           await compose(task.middleware)(ctx);
//           await Promise.resolve(resolve(ctx.toClient(ctx)));
//         } catch (err) {
//           reject(err);
//           throw err;
//         } finally {
//           return next(ctx.err, ctx);
//         }
//       };

//       const postmiddleware = compose(
//         [...task.events.postask, ...afm.events.postcmd].map(
//           (fn) => fn.listener,
//         ),
//       );

//       cmd.run = function () {
//         return premiddleware(cmd, async (err, ctx, next) => {
//           if (err) {
//             ctx.onFailure(err, ctx);
//             return await postmiddleware(ctx, next);
//           }
//           return await middleware(ctx, async (err, ctx) => {
//             if (err) {
//               ctx.onFailure(err, ctx);
//             } else {
//               ctx.onSuccess(ctx);
//             }
//             return await postmiddleware(ctx, next);
//           });
//         });
//       };
//       cb(cmd);
//     });
//   });
// };

function enqueue(queue, cmd) {
  return new Promise((resolve, reject) => {
    queue.push(() => cmd.run().then(resolve, reject));
    cmd.emit("queued", cmd);
    if (queue.length > 1) return;
    runQueue(queue[0]);
    async function runQueue(cmd) {
      if (!cmd) return;
      cmd.emit("pending", cmd);
      await cmd();
      queue.shift();
      runQueue(cmd[0]);
    }
  });
}

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
    debug("Create command events");
    debug(task.events);
    return;
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
