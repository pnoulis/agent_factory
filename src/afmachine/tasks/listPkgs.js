import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("listPkgs", Command);

function Command(opts) {
  const afm = this;
  const promise = Command.createCommand(afm, (cmd) => {
    afm.runCommand(cmd);
  });
  return promise;
}
Command.middleware = [
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.listPackages();
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  (ctx, next) => {
    ctx.res.packages = ctx.raw.packages;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to list packages";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully listed packages";
  cmd.resolve(cmd.res);
};

export { Command as listPkgs };
