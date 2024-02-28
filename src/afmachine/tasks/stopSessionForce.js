import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("stopSessionForce", Command);

function Command(opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(afm, { opts }, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.verb = "stop session";
Command.middleware = [
  attachBackendRegistrationRouteInfo,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.stopSessionForce();
    return next();
  },
  parseBackendResponse,
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to force stop Session";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully force stopped Session";
};

export { Command as stopSessionForce };
