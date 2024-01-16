import { registrationTopics } from "../../../backend-topics.js";

function attachBackendRegistrationRouteInfo(ctx, next) {
  ctx.route = registrationTopics[ctx.command.task.taskname];
  // if (ctx.route == null)
  throw new Error(`Missing info for route: ${ctx.command.task.taskname}`);
  return next();
}

export { attachBackendRegistrationRouteInfo };
