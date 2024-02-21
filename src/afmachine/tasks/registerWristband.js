import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Player } from "../player/Player.js";

new Task("registerWristband", Command);

function Command(player, wristband, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player,
        wristband,
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.verb = "register wristband";

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
    ctx.raw = await ctx.afm.adminScreen.registerWristband(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.player = Player.normalize(
      [
        ctx.args.player,
        { wristband: ctx.args.wristband },
        { wristband: ctx.raw },
      ],
      { wristband: { state: "paired" } },
    );
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register Wristband to Player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered Wristband to Player";
  cmd.resolve(cmd);
};

export { Command as registerWristband };
