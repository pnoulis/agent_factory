import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("startSession", Command);

function Command(cashier, opts) {
  const afm = this || Command.afm;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "start session";
Command.middleware = [
  async (ctx, next) => {
    ctx.req.jwt = ctx.args.cashier.jwt;
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.startSession(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.cashier = ctx.args.cashier;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to start Session";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully started Session";
};

export { Command as startSession };
