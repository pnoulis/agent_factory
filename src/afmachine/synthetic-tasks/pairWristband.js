import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerCommander } from "../player/PlayerCommander.js";
import { WristbandCommander } from "../wristband/WristbandCommander.js";

new Task("pairWristband", Command);

function Command(player, wristband, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: {
        player,
        wristband,
      },
      opts,
    },
    (cmd) => afm.runCommand(cmd),
  );
  return promise;
}

Command.middleware = [
  async (ctx, next) => {
    ctx.args.player.state.pairWristband();
    ctx.args.wristband.state.pair();
    await ctx.args.wristband.pair(ctx.args.player);
    ctx.res.player = ctx.args.player.tobject(null, { depth: 1 });
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to pair Wristband to Player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully paired Wristband to Player";
  cmd.resolve(cmd);
};

export { Command as pairWristband };
