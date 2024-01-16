import { compose } from "../compose.js";
import { attachBackendRegistrationRouteInfo } from "../middleware/attachBackendRegistrationRouteInfo.js";
import { validateBackendRequest } from "../middleware/validateBackendRequest.js";
import { validateBackendResponse } from "../middleware/validateBackendResponse.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

const listPkgs = {
  taskname: "listPkgs",
};

listPkgs.middleware = compose([
  // attachBackendRegistrationRouteInfo,
  // validateBackendRequest,
  async (ctx, next) => {
    ctx.command.res.data = await ctx.afm.backend.listPackages();
    return next();
  },
  // validateBackendResponse,
  // parseBackendResponse,
]);

listPkgs.cb = function (err, ctx) {
  if (err) {
    ctx.error = err;
    ctx.msg = "Failed to list packages!";
  } else {
    ctx.msg = "Successfully listed packages!";
  }
};

export { listPkgs };
