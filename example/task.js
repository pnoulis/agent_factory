import { delay } from "js_utils/misc";

task.taskname = "pairWristband";
function task(targetcb) {
  const cmd = Object.create(Promise);
}

task.state = {
  busyScanning: false,
};

task.onSuccess = function (cmd) {
  cmd.msg = "Successfully paired wristband";
  return cmd;
};
task.onError = function (cmd, cb) {
  cmd.msg = "Failed to pair wristband";
  switch (cmd.error.code) {
    case 12:
      return cb(cmd.error, cmd);
    default:
      return cmd;
  }
};

task.middleware = [
  // Checks if other wristbands are currently waiting for a wristband scan.
  async (ctx, next) => {
    if (ctx.state.busyScanning) {
      const err = new Error("Busy scanning another wristband.");
      err.code = 12;
      throw err;
    }

    ctx.state.busyScanning = true;
    return next();
  },

  // Wait for a wristband scan
  async (ctx, next) => {
    ctx.res.raw = await delay().then({ id: 2, color: 5 });
    return next();
  },
];

export { task as pairWristband };
