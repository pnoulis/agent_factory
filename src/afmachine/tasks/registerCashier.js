import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Cashier } from "../cashier/Cashier.js";

new Task("registerCashier", Command);

function Command(cashier, password, opts) {
  const afm = this;
  const promise = Command.createCommand(
    afm,
    {
      args: { cashier, password },
      opts,
    },
    (cmd) => {
      afm.runCommand(cmd);
    },
  );
  return promise;
}
Command.verb = "register cashier";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      username: ctx.args.cashier.username?.toUpperCase(),
      email: ctx.args.cashier.email,
      password: ctx.args.password,
      role: [`ROLE_${ctx.args.cashier.role}`.toUpperCase()],
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.registerCashier(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    const { cashiers } = await ctx.afm.adminScreen.listCashiers({
      timestamp: ctx.t_start,
    });
    const thisCashier = cashiers.find(
      (cashier) => cashier.username === ctx.req.username,
    );
    if (thisCashier === undefined) {
      throw new Error(`Could not locate cashier: ${ctx.req.username}`);
    }
    ctx.res.cashier = Cashier.normalize(thisCashier);
    ctx.res.password = ctx.args.password;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to register new Cashier";
  cmd.reject(cmd);
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully registered new Cashier";
  cmd.resolve(cmd);
};

export { Command as registerCashier };
