function parseBackendResponse(ctx, next) {
  const { result, validationErrors } = ctx.raw;

  if (result === "OK") {
    return next();
  } else if (validationErrors) {
    throw globalThis.createError(({ EVALIDATION }) =>
      EVALIDATION({
        msg: "Invalid Backend API request",
        severity: "warn",
        validationErrors,
      }),
    );
  } else {
    throw globalThis.createError(({ EUNKNOWN }) =>
      EUNKNOWN({
        msg: "NOK Backend API response",
        response: ctx.raw,
      }),
    );
  }
}

export { parseBackendResponse };
