import { createValidationError, createBackendError } from "../../errors.js";

function parseBackendResponse(ctx, onErrorMsg, onSuccessMsg) {
  const { result, message, validationErrors } = ctx;
  delete ctx.res.result;
  delete ctx.res.timestamp;
  if (result === 'OK') {
    delete ctx.result;
    delete ctx.message;
    const data = { ...ctx.res };
    ctx.res = {};
    ctx.res = {};
    ctx.res.ok = true;
    ctx.res.msg = onSuccessMsg || "";
    return ctx.res;
  }
  ctx.res.ok = false;
  ctx.res.msg = onErrorMsg || "";
  if (Object.hasOwn(ctx.res.msg, ctx.res.validationErrors)) {
    throw createValidationError(ctx.res.msg, ctx.res.validationErrors);
  } else {
    throw createBackendError(ctx.res.msg);
  }
}

export { parseBackendResponse };
