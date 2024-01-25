import { delay } from "js_utils/misc";
import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { PlayerTarget } from "../../player/thin/PlayerTarget.js";
import { WristbandTarget } from "../../wristband/thin/WristbandTarget.js";

const pairWristband = new Task("pairWristband", Command);

function Command(player, wristband, opts) {
  const afm = this;
  const wristbandTarget = new WristbandTarget(wristband);
  const playerTarget = new PlayerTarget(player, wristbandTarget);
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
    player.wristband.pair();
    player.pairWristband();
    return next();
  },
  async (ctx, next) => {
    ctx.raw = await delay();
    return next();
  },
  (ctx, next) => {
    const player = ctx.afm.getCache("players", ctx.args.player.username);
    ctx.res.wristband = player.wristband.paired().tobject();
    ctx.res.player = player.pairedWristband().tobject();
    return next();
  },
];

Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to pair wristband to player";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully paired wristband to player";
  cmd.resolve(cmd.res);
};

export { Command as pairWristband };
