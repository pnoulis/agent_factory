function parseBackendResponse(ctx, next) {
  const { result, validationErrors } = ctx.raw;

  if (result === "OK") {
    return next();
  } else if (validationErrors) {
    return Promise.reject(
      craterr(({ EVALIDATION }) =>
        EVALIDATION({
          msg: "Invalid Backend API request",
          severity: "warn",
          validationErrors,
        }),
      ),
    );
  } else {
    return Promise.reject(
      craterr(({ EGENERIC }) =>
        EGENERIC({
          msg: "NOK Backend API response",
          response: ctx.raw,
        }),
      ),
    );
  }
}

export { parseBackendResponse };
