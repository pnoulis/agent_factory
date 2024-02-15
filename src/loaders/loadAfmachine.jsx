import { defer } from "react-router-dom";
import { delay } from "js_utils/misc";
import { fmagent } from "#components/flash-messages/fmagent.js";

let booted;
function loadAfmachine() {
  return booted
    ? { afm: globalThis.afm }
    : defer({
        afm: delay(1500)
          .then(() => import("#afm/Afmachine.js"))
          .then(({ Afmachine }) => (globalThis.afm = new Afmachine()))
          .then((afm) => afm.boot())
          .then((cmd) => {
            booted = cmd.res.ok;
            logafm(afm);
            fmagent.success({ message: cmd.msg });
            return globalThis.afm;
          }),
      });
}

export { loadAfmachine };
