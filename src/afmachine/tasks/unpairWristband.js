import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerCommander } from "../player/PlayerCommander.js";
import { WristbandCommander } from "../wristband/WristbandCommander.js";

new Task("unpairWristband", Command);

function Command(player, wristband, opts) {
  const afm = this;
  const wristbandTarget = new WristbandCommander(afm, wristband);
  const playerTarget = new PlayerCommander(null, player, wristbandTarget);
  afm.setCache("players", playerTarget.username, playerTarget);
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

Command.middleware = [
  async (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    player.state.unpairWristband();
    player.wristband.state.unpair();
    ctx.raw = await ctx.afm.getWristbandInfo(ctx.args.wristband, {
      queue: false,
    });
    if (ctx.raw.wristband.state === "paired") {
      ctx.raw = await ctx.afm.deregisterWristband(
        ctx.args.player,
        ctx.args.wristband,
        { queue: false },
      );
    }
    player.wristband.state.unpaired(ctx.raw.wristband);
    ctx.res = player.wristband.tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to unpair wristband from player";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully unpaired wristband from player";
  cmd.resolve(cmd.res);
};

export { Command as unpairWristband };
