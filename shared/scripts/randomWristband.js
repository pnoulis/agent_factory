/*
  This script can run in the browser and nodejs, both as a module
  and executable.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./randomWristband.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

import { randomInteger } from "js_utils/misc";
import { WRISTBAND_COLORS } from "agent_factory.shared/constants.js";
import { isRuntime } from "js_utils/environment";
const ids = [];
let colors = [...WRISTBAND_COLORS];

/*
  ------------------------------ CLI ------------------------------
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.

  The command line arguments if any; are consumed by this script before
  importing other scripts which read process.argv to determine their calling
  context.
*/
if (isRuntime("node") && globalThis.process.argv.length > 2) {
  const arg1 = parseInt(process.argv.splice(2, 1));
  console.log(randomWristband(arg1));
  process.exit();
}

/* ------------------------------ MODULE ------------------------------ */
function randomId() {
  const id = randomInteger(1, 900);
  if (ids.some((previousId) => previousId === id)) {
    randomId();
  } else {
    ids.push(id);
  }
  return ids.at(-1);
}

function randomColor(uniqueColors = false) {
  let color;
  if (uniqueColors) {
    color = colors.length - 1;
    colors.pop();
  } else {
    color = randomInteger(0, WRISTBAND_COLORS.length - 1);
  }
  return color;
}

function randomWristband(n = 1, uniqueColors = false) {
  colors = [...WRISTBAND_COLORS];
  const maxWristbands = uniqueColors ? WRISTBAND_COLORS.length : n;
  const wristbands = new Array(n <= maxWristbands ? n : maxWristbands - 1)
    .fill(null)
    .map(() => ({
      number: randomId(),
      color: randomColor(uniqueColors),
    }));

  return wristbands.length > 1 ? wristbands : wristbands.pop();
}

export { randomWristband };
