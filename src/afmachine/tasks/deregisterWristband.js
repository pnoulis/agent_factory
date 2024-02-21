import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeWristband } from "../wristband/normalize.js";

new Task("deregisterWristband", Command);

function Command(player, wristband, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player: "tobject" in player ? player.tobject() : player,
        wristband: "tobject" in wristband ? wristband.tobject() : wristband,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "deregister cashier";
Command.middleware = [
  (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      username: ctx.args.player.username,
      wristbandNumber: ctx.args.wristband.id,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.deregisterWristband(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.player = { ...ctx.args.player };
    ctx.res.player.wristband = normalizeWristband(ctx.args.wristband, {
      state: "unpaired",
    });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to deregister Wristband from Player";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully deregistered Wristband from Player";
  cmd.resolve(cmd.res);
};

export { Command as deregisterWristband };
