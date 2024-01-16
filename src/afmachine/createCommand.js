function createCommand(afm, task, args, resolve, reject, cb) {
  const command = () =>
    task
      .middleware({ afm, command })
      .then(() => {
        cb(null, command);
        resolve(command);
      })
      .catch((err) => {
        cb(err, command);
        reject(err);
      });

  Object.assign(command, {
    task,
    args,
    req: {},
    res: {},
    msg: null,
    error: null,
  });

  return command;
}

export { createCommand };
