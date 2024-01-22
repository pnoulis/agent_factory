function debug(any) {
  console.dir(any, { depth: null });
}

function logevents(eventful) {
  eventful.on("stateChange", (nstate, ostate, entity) => {
    debug(`${entity.constructor.name} changed state: ${ostate} -> ${nstate}`);
  });
  eventful.on("error", (err) => {
    console.log(err);
  });
}

function logcmd(afm) {
  afm.on("precmd", async (cmd, next) => {
    debug(`Command ${cmd.taskname} started at: ${new Date().toISOString()}`);
    await next();
    console.log(cmd);
    debug(`Command ${cmd.taskname} finished at: ${new Date().toISOString()}`);
  });
}

globalThis.debug = debug;
globalThis.logevents = logevents;
globalThis.logcmd = logcmd;

process.on("unhandledRejection", (err) => {
  console.log('unhandled rejection');
  console.log(err);
});
