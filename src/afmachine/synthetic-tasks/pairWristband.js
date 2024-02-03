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
  afm.setCache("players", player.username, player);
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
    await player.wristband.pair(player);
    ctx.res.player = player.tobject(1);
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
