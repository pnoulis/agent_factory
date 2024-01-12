import { registrationTopics } from "../../../backend-topics.js";
import { isObject, isFunction } from "js_utils/misc";

function validateBackendResponse(ctx, next) {
  const schema = registrationTopics[ctx.routeKey]?.schema;
  if (!isObject(schema)) {
    throw new Error(`Missing route schema: ${ctx.routeKey}`);
  } else if (!isFunction(schema.res) || schema.res(ctx.res.data)) {
    return next();
  }
  return schemas.res.errors;
}

export { validateBackendResponse };
