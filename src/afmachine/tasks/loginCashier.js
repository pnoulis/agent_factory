import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";
import { Cashier } from "../cashier/Cashier.js";

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
Command.verb = "login cashier";
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      username: ctx.args.cashier.username.toUpperCase(),
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
      (cashier) => cashier.username === ctx.req.username,
    );
    if (!thisCashier) {
      throw new Error(`Could not locate cashier: ${ctx.req.username}`);
    }
    ctx.res.cashier = Cashier.normalize([{ role: "cashier" }, thisCashier]);
    ctx.res.cashier.jwt = ctx.raw.jwtResponse.jwt;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.res.ok = false;
  cmd.res.msg = "Failed to login Cashier";
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.res.ok = true;
  cmd.res.msg = "Successfully logged in Cashier";
};

export { Command as loginCashier };
