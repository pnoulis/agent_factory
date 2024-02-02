import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerCommander } from "../player/PlayerCommander.js";
import { WristbandCommander } from "../wristband/WristbandCommander.js";
import { createStateErr, ERR_CODES } from "../../errors.js";

new Task("pairWristband", Command);

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
    player.state.pairWristband();
    player.wristband.state.pair();
    ctx.raw = await player.wristband.scan();
    ctx.raw = await ctx.afm.getWristbandInfo(ctx.raw.wristband, {
      queue: false,
    });
    ctx.raw = await ctx.afm.registerWristband(
      ctx.args.player,
      ctx.raw.wristband,
      {
        queue: false,
      },
    );
    player.wristband.state.paired(ctx.raw.wristband);
    ctx.res.wristband = player.wristband.tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to pair Wristband to Player";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully paired Wristband to Player";
  cmd.resolve(cmd.res);
};

export { Command as pairWristband };
