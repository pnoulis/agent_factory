import { Task } from "../Task.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

new Task("loginCashier", Command);

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
Command.middleware = [
  async (ctx, next) => {
    ctx.req = {
      username: ctx.args.cashier.username,
      password: ctx.args.cashier.password,
    };
    return next();
  },
  attachBackendRegistrationRouteInfo,
  validateBackendRequest,
  async (ctx, next) => {
    ctx.raw = await ctx.afm.backend.loginCashier(ctx.req);
    return next();
  },
  parseBackendResponse,
  validateBackendResponse,
  async (ctx, next) => {
    ctx.res.cashier = {
      ...ctx.args.cashier,
      email: ctx.raw.jwtResponse.email,
      id: ctx.raw.jwtResponse.id,
      role: ctx.raw.jwtResponse.roles.at(0).split("_").at(1),
    };
    ctx.res.jwt = ctx.raw.jwtResponse.jwt;
    return next();
  },
];
Command.onFailure = function () {
  const cmd = this;
  cmd.msg = "Failed to login Cashier";
  cmd.reject(cmd.errs.at(-1));
};
Command.onSuccess = function () {
  const cmd = this;
  cmd.msg = "Successfully logged in Cashier";
  cmd.resolve(cmd.res);
};

export { Command as loginCashier };
