import { createUnexpectedErr, createValidationErr } from "../../errors.js";
function parseBackendResponse(ctx, next) {
  const { result, message, validationErrors } = ctx.raw;
  if (result === "NOK") {
    if (validationErrors) {
      throw createValidationErr(validationErrors, {
        level: "warn",
        msg: "Invalid API response",
      });
    } else {
      throw createUnexpectedErr(ctx.raw);
    }
  }
  return next();
}

export { parseBackendResponse };
