#!/usr/bin/env node

/*
  make run file=scripts/emulateScan.mjs args='<number> <color>'

  Examples:
  ./emulateScan.mjs 2 green
  ./emulateScan.mjs 2
  ./emulateScan.mjs null yellow
  ./emulateScan.mjs null 2
 */

import { randomInteger } from "js_utils/misc";
import { getafm } from '../src/getafm.js';
import * as CONSTANTS from '../src/constants.js';

let [id, color] = process.argv.slice(2);
id = parseInt(id) ? id : randomInteger(1, CONSTANTS.MAX_WRISTBAND_ID);
color = CONSTANTS.WRISTBAND_COLORS[color];
if (typeof color !== 'number') {
  color = CONSTANTS.WRISTBAND_COLORS[color];
}
if (color == null) {
  color = randomInteger(1, CONSTANTS.WRISTBAND_COLORS.max);
}

let err;
try {
  await getafm(false).then(async (afm) => {
    return afm.readWristband({ id, colorCode: color }, { queue: false });
  })
  console.log(`id: ${id}`);
  console.log(`colorCode: ${color}`)
  console.log(`color: ${CONSTANTS.WRISTBAND_COLORS[color]}`)
} catch (err) {
  console.log(err);
  err = err;
} finally {
  await getafm(false).then((afm) => afm.stop());
  process.exit(err ? 1 : 0);
}
