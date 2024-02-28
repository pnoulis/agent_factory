import { registrationTopics } from "../../../backend-topics.js";

function attachBackendRegistrationRouteInfo(ctx, next) {
  ctx.route = registrationTopics[ctx.routeAlias || ctx.taskname];
  if (ctx.route == null)
    throw new Error(`Missing info for route: ${ctx.taskname}`);
  return next();
}

export { attachBackendRegistrationRouteInfo };
