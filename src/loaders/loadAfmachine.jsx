import { defer } from "react-router-dom";
import { delay } from "js_utils/misc";
import { getafm } from "/src/getafm.js";

function loadAfmachine() {
  return defer({
    afm: delay(100).then(() =>
      getafm(false).then((afm) => {
        return afm.boot().then(() => afm);
      }),
    ),
  });
}

export { loadAfmachine };
