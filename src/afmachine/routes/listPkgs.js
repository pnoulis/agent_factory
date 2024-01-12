import { compose } from "../compose.js";
import { parseBackendResponse } from "../middleware/parseBackendResponse.js";

export default (backend) =>
  compose([
    async function (ctx, next) {
      ctx.res.data = await backend.listPackages();
      validateBackendResponse('listPkgs')
      parseBackendResponse(
        ctx,
        "Unable to list agent factory packages",
        "Successfully retrieved agent factory packages",
      );
      await next();
    },
  ]);
