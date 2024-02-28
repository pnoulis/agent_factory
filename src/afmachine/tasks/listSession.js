import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listSession", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "list session";
Command.middleware = [
  attachBackendRegistrationRouteInfo,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.listSession();
    return next();
  },
  parseBackendResponse,
  (ctx, next) => {
    if (ctx.raw.message === "No active session") {
      ctx.res.session = {
        active: false,
      };
    } else {
      ctx.res.session = JSON.parse(ctx.raw.message);
      ctx.res.session.active = true;
    }
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to retrieve Session";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully retrieved Session";
};

export { Command as listSession };
