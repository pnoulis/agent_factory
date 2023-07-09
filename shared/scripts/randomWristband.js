#!/usr/bin/env node

/*
  This script can run in the browser and nodejs, both as a module
  and executable.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./randomWristband.js 1

 */

import { randomInteger } from "js_utils/misc";
import { WRISTBAND_COLORS } from "agent_factory.shared/constants.js";
import { isRuntime } from "js_utils/environment";

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

const ids = [];
let colors = [...WRISTBAND_COLORS];

if (isRuntime("node") && globalThis.process.argv.length > 2) {
  const arg1 = parseInt(process.argv[2]);
  process.argv.splice(2);
  const wristbands = randomWristband(arg1);
  console.log(wristbands);
}

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
