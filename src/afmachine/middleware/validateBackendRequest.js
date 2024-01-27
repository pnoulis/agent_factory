import { isObject, isFunction } from "js_utils/misc";
import { createValidationErr } from "../../errors.js";

function validateBackendRequest(ctx, next) {
  const schema = ctx.route.schema;

  if (!isObject(ctx.route.schema)) {
    throw new Error(`Missing route schema: ${ctx.taskname}`);
  } else if (!isFunction(schema.req) || schema.req(ctx.req)) {
    return next();
  }

  const validationErrors = schema.req.errors.map((err) => {
    let propname;
    let msg;
    switch (err.keyword) {
      case "additionalProperties":
        propname = err.params.additionalProperty;
        msg = `Unknown property: ${propname}:`;
        break;
      case "required":
        propname = err.params.missingProperty;
        msg = `Missing property: ${propname}`;
        break;
      default:
        propname = err.instancePath;
        msg = `${err.message}: ${propname}`;
    }

    return { key: propname, value: ctx.req[propname], msg };
  });

  throw createValidationErr({
    validationErrors,
    severity: "fatal",
    msg: "Invalid API request",
  });
}

export { validateBackendRequest };
