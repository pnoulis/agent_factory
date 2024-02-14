import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { normalize as normalizeCashier } from "../cashier/normalize.js";

new Task("loginCashier", Command);

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
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      username: ctx.args.cashier.username,
      password: ctx.args.password,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.adminScreen.loginCashier(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    const { cashiers } = await ctx.afm.adminScreen.listCashiers({
      timestamp: ctx.t_start,
    });
    const thisCashier = cashiers.find(
      (cashier) => cashier.username === ctx.args.cashier.username,
    );
    if (thisCashier === undefined) {
      throw new Error(`Could not locate cashier: ${ctx.args.cashier.username}`);
    }
    ctx.res.cashier = normalizeCashier(thisCashier);
    ctx.res.password = ctx.args.password;
    ctx.res.jwt = ctx.raw.jwtResponse.jwt;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.msg = "Failed to login Cashier";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.msg = "Successfully logged in Cashier";
  cmd.resolve(cmd.res);
};

export { Command as loginCashier };
