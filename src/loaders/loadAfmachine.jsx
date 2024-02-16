import { defer } from "react-router-dom";
import { delay } from "js_utils/misc";
// import { fmagent } from "#components/flash-messages/fmagent.js";
import { removeIndex } from "/src/misc/misc.js";

let booted;
let listeners = {};
function registerListener(event, name, listener) {
  const registered = listeners[event]?.find((l) => l.name === name);
  if (registered) {
    trace(`'${name}' listener is already registered`);
    return;
  }
  listeners[event] ??= [];
  listeners[event].push({ name, listener });
  trace(`Registering listener: '${name}'`);
  globalThis.afm.on(event, listener);
}

function deregisterListener(event, name) {
  if (arguments.length < 2) {
    trace("Deregistering all listeners");
    for (const [k, v] of Object.entries(listeners)) {
      for (let i = 0; i < v.length; i++) {
        trace(`Deregistering listener: '${v[i].name}'`);
        globalThis.afm.removeListener(k, v[i].listener);
      }
      listeners[k] = [];
    }
  } else {
    const listener = listeners[event]?.findIndex((l) => l.name === name);
    if (listener < 0) {
      throw new Error(`Could not find listener: '${name}'`);
    }
    trace(`Deregistering listener: '${name}'`);
    globalThis.afm.removeListener(event, listener);
    listeners[event] = removeIndex(listeners[event], listener);
  }
}

function loadAfmachine() {
  return booted
    ? { afm: globalThis.afm }
    : defer({
        afm: delay(1500)
          .then(() => import("#afm/Afmachine.js"))
          .then(({ Afmachine }) => new Afmachine())
          .then((afm) => {
            globalThis.afm = afm;
            globalThis.afm.registerListener = registerListener;
            globalThis.afm.deregisterListener = deregisterListener;
            logafm(afm);
            // afm.on("cmdend", (cmd) => {
            //   if (cmd.res.ok) {
            //     fmagent.success({ message: cmd.msg });
            //   } else {
            //     fmagent.error({ message: cmd.msg });
            //     fmagent.error({ message: cmd.errs.at(-1).message });
            //   }
            // });
            return afm;
          })
          .then((afm) => afm.boot())
          .then((cmd) => {
            booted = cmd.res.ok;
            return globalThis.afm;
          }),
      });
}

export { loadAfmachine };
