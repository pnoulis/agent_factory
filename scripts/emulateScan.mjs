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
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";
import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../src/constants.js";

const b = new BackendRPIReader();

let [id, color] = process.argv.slice(2);
id = parseInt(id) ? id : randomInteger(1, MAX_WRISTBAND_ID);
color = WRISTBAND_COLORS[color];
if (typeof color !== 'number') {
  color = WRISTBAND_COLORS[color];
}
if (color == null) {
  color = randomInteger(1, WRISTBAND_COLORS.max);
}

let err;
try {
  await b.read({ id, color });
  console.log(`id: ${id}`);
  console.log(`colorCode: ${color}`)
  console.log(`color: ${WRISTBAND_COLORS[color]}`)
} catch (err) {
  console.log(err);
  err = err;
} finally {
  await b.stop();
  process.exit(err ? 1 : 0);
}
