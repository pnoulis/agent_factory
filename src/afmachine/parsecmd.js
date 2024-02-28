function parsecmd(promise) {
  return promise
    .then((cmd) => cmd.res)
    .catch((cmd) => {
      throw cmd.errs.at(-1);
    });
}

export { parsecmd };
