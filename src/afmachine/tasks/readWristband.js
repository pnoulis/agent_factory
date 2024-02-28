import { Task } from "../Task.js";

new Task("readWristband", Command);

function Command(wristband, { queue } = {}) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: { wristband },
      opts: {
        queue: queue || false,
      },
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.verb = "read wristband";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      wristbandNumber: ctx.args.wristband.id,
      wristbandColor: ctx.args.wristband.colorCode,
    };
    return next();
  },
  async (ctx, next) => {
    ctx.raw = await ctx.afm.rpiReader.readWristband(ctx.req);
    return next();
  },
  (ctx, next) => {
    ctx.res.wristband = ctx.raw;
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to read wristband";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully read wristband";
};

export { Command as readWristband };
