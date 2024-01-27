import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Wristband } from "../../wristband/thin/Wristband.js";
import { WristbandTarget } from "../../wristband/thin/WristbandTarget.js";
import { Player } from "../../player/thin/Player.js";
import { PlayerTarget } from "../../player/thin/PlayerTarget.js";

new Task("registerWristband", Command);

function Command(player, wristband, opts) {
  const afm = this;
  const wristbandTarget = new WristbandTarget(wristband);
  const playerTarget = new PlayerTarget(player, wristbandTarget);
  afm.setCache("players", playerTarget.username, playerTarget);
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player: playerTarget.tobject(),
        wristband: wristbandTarget.tobject(),
      },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}

Command.middleware = [
  attachBackendRegistrationRouteInfo,
  (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      username: ctx.args.player.username,
      wristbandNumber: ctx.args.wristband.id,
    };
    return next();
  },
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.registerWristband(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    ctx.res = Wristband.normalize(ctx.args.wristband);
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to register wristband to player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully registered wristband to player";
  cmd.resolve(cmd.res);
};

export { Command as registerWristband };
