import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeCashier } from "../cashier/normalize.js";

new Task("deregisterCashier", Command);

function Command(cashier, opts) {
  const afm = this;
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
Command.verb = "deregister cashier";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      timestamp: ctx.t_start,
      username: ctx.args.cashier.username,
      userId: ctx.args.cashier.id,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.deregisterCashier(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.cashier = normalizeCashier([{ role: "cashier" }, ctx.args.cashier]);
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to deregister Cashier";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully deregistered Cashier";
};

export { Command as deregisterCashier };
