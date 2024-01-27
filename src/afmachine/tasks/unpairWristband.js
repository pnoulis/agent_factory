import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerTarget } from "../../player/thin/PlayerTarget.js";
import { WristbandTarget } from "../../wristband/thin/WristbandTarget.js";

new Task("unpairWristband", Command);

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
  async (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    player.wristband.unpair();
    player.unpairWristband();
    return next();
  },
  async (ctx, next) => {
    ctx.raw = await delay();
    return next();
  },
  (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    ctx.res.wristband = player.wristband.unpaired(ctx.args.wristband).tobject();
    ctx.res.player = player.unpairedWristband().tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to unpair wristband from player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully unpaired wristband from player";
  cmd.resolve(cmd.res);
};

export { Command as unpairWristband };
