import { ENV } from "./config.js";
import { isObject } from "js_utils/misc";

function trace(any) {
  if (ENV.LOGLEVEL !== "trace") return;
  console.dir(any, { depth: null });
}

function debug(any) {
  console.dir(any, { depth: null });
}

function inspectProtoChain(obj) {
  const chain = [];
  if (obj == null) return chain;
  let proto = obj.prototype ?? Object.getPrototypeOf(obj);
  while (proto) {
    chain.push(proto.constructor.name);
    proto = Object.getPrototypeOf(proto);
  }
  console.log(chain);
  return chain;
}

function logevents(eventful) {
  if (ENV.LOGLEVEL === "silent") return;
  eventful.on("stateChange", (nstate, ostate, entity) => {
    debug(`${entity.constructor.name} changed state: ${ostate} -> ${nstate}`);
  });
  eventful.on("error", (err) => {
    console.log(err);
  });
}

function logcmd(cmd) {
  const _cmd = {
    opts: cmd.opts,
    args: cmd.args,
    raw: cmd.raw,
    state: cmd.state,
    req: cmd.req,
    res: cmd.res,
    errs: cmd.errs,
    t_start: cmd.t_start,
    t_end: cmd.t_end,
    msg: cmd.msg,
  };
  debug(_cmd);
}
function logafm(afm) {
  if (ENV.LOGLEVEL === "silent") return;

  afm.on("cmdqueued", (cmd) => {
    console.log(`Command: ${cmd.taskname} queued`);
  });

  afm.on("cmdstart", (cmd) => {
    console.log(
      `Command: ${cmd.taskname} started at: ${new Date(
        cmd.t_start,
      ).toISOString()}`,
    );
    console.dir(cmd.afm.players, { depth: 3 });
  });

  afm.on("cmdend", (cmd) => {
    console.log(
      `Command: ${cmd.taskname} finished at: ${new Date(
        cmd.t_end,
      ).toISOString()}`,
    );
    logcmd(cmd);
  });

  afm.on("error", (cmd) => {
    console.log(`Command: ${cmd.taskname} threw errors`);
  });
}

function logPlayer(player) {
  if (ENV.LOGLEVEL === "silent") return;
  console.log();
  console.log("PLAYER_START:----------------------------");
  console.log(`username: ${player?.username}`);
  console.log(`name: ${player?.name}`);
  console.log(`surname: ${player?.surname}`);
  console.log(`email: ${player?.email}`);
  console.log(`password: ${player?.password}`);
  console.log(`state: ${player?.getState()?.name}`);
  console.log(`states: ${player?.States.map((s) => s.name)}`);
  console.log("inheritance:");
  inspectProtoChain(player);
  console.log("PLAYER_END:------------------------------");
  console.log();
}

function logWristband(wristband) {
  if (ENV.LOGLEVEL === "silent") return;
  console.log();
  console.log("WRISTBAND_START:------------------------------");
  console.log(`id: ${wristband?.id}`);
  console.log(`colorCode: ${wristband?.colorCode}`);
  console.log(`color: ${wristband?.color}`);
  console.log(`state: ${wristband?.getState().name}`);
  console.log(`states: ${wristband?.States.map((s) => s.name)}`);
  console.log("inheritance:");
  inspectProtoChain(wristband);
  console.log("WRISTBAND_END:--------------------------------");
  console.log();
}

function logent(entity) {
  if (!isObject(entity)) return false;

  if ("username" in entity) {
    logPlayer(entity);
  }
  if ("wristband" in entity) {
    logWristband(entity.wristband);
  } else if ("colorCode" in entity) {
    logWristband(entity);
  }
  return true;
}

globalThis.debug = debug;
globalThis.trace = trace;
globalThis.logevents = logevents;
globalThis.logafm = logafm;
globalThis.logPlayer = logPlayer;
globalThis.logWristband = logWristband;
globalThis.logent = logent;

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED: REJECTION");
  console.log(err);
});
