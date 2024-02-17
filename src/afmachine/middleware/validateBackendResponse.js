import { isObject, isFunction } from "js_utils/misc";

function validateBackendResponse(ctx, next) {
  const schema = ctx.route.schema;

  if (!isObject(ctx.route.schema)) {
    return Promise.reject(
      craterr(({ EGENERIC }) =>
        EGENERIC({ msg: `Missing route schema: ${ctx.taskName}` }),
      ),
    );
  } else if (!isFunction(schema.res) || schema.res(ctx.raw)) {
    return next();
  }

  const validationErrors = schema.res.errors.map((err) => {
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

  return Promise.reject(
    craterr(({ EVALIDATION }) =>
      EVALIDATION({
        msg: "Invalid Backend API response",
        severity: "fatal",
        validationErrors,
      }),
    ),
  );
}

export { validateBackendResponse };
