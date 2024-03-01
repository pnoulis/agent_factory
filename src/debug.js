import { ENV } from "./config.js";
import { isObject, isArray } from "js_utils/misc";

debug(ENV);
function trace(...args) {
  if (ENV.LOGLEVEL !== "trace") return;
  args.forEach((arg) => {
    console.log(arg);
  });
}

function debug(...args) {
  args.forEach((arg) => {
    console.log(arg);
  });
}

function deebug(...args) {
  args.forEach((arg) => console.dir(arg, { depth: null }));
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
    console.log(logcmd(err));
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
    t_start: cmd.t_start,
    t_end: cmd.t_end,
    msg: cmd.msg,
  };
  if (ENV.RUNTIME === "node") {
    deebug(_cmd);
  } else {
    debug(_cmd);
  }
}
function logafm(afm) {
  if (ENV.LOGLEVEL === "silent") return;

  afm.on("cmdcreate", (cmd) => {
    console.log(`CMD_CREATE: '${cmd.taskname}'`);
    logcmd(cmd);
    console.log(`CMD_CREATE: '${cmd.taskname}'`);
    console.log("--------------------------------------------------");
    console.log();
    console.log();
  });

  afm.on("cmdqueue", (cmd) => {
    console.log(`CMD_QUEUE: '${cmd.taskname}'`);
    console.log("--------------------------------------------------");
    console.log(cmd.afm.commandQueue);
    console.log();
    console.log();
  });

  afm.on("cmdstart", (cmd) => {
    console.log(`CMD_START: '${cmd.taskname}'`);
    logcmd(cmd);
    console.log(`CMD_START: '${cmd.taskname}'`);
    console.log("--------------------------------------------------");
    console.log();
    console.log();
  });

  afm.on("cmdend", (cmd) => {
    console.log(`CMD_END: '${cmd.taskname}' ${cmd.state}`);
    logcmd(cmd);
    console.log(`CMD_END: '${cmd.taskname}' ${cmd.state}`);
    console.log("--------------------------------------------------");
    console.log();
    console.log();
  });

  afm.on("error", (cmd) => {
    console.log(`CMD_ERRORS: '${cmd.taskname}' ${cmd.state}`);
    console.dir(cmd.errs, { depth: 10 });
    console.log(`CMD_ERRORS: '${cmd.taskname}' ${cmd.state}`);
    console.log("--------------------------------------------------");
    console.log();
    console.log();
  });

  afm.on("idle", (afm) => {
    console.log("idle__:");
    console.log(afm.history);
  });
}

function logPlayer(player, format) {
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

function logent(entity, format = false) {
  if (!isObject(entity)) return false;

  if ("username" in entity) {
    logPlayer(entity, format);
  }
  if ("wristband" in entity) {
    logWristband(entity.wristband, format);
  } else if ("colorCode" in entity) {
    logWristband(entity, format);
  }
  return true;
}

function logstate(stateventful) {
  stateventful.on("stateChange", (newState, oldState, staeventful) => {
    debug(
      `state change '${stateventful.constructor.name}' ${oldState}' -> '${newState}'`,
    );
  });
}

globalThis.debug = debug;
globalThis.deebug = deebug;
globalThis.trace = trace;
globalThis.logevents = logevents;
globalThis.logafm = logafm;
globalThis.logPlayer = logPlayer;
globalThis.logWristband = logWristband;
globalThis.logent = logent;
globalThis.logstate = logstate;
