#!/usr/bin/env node

/*
  ./emulateScan.mjs <number> <color>

  Examples:
  ./emulateScan.mjs 2 green
  ./emulateScan.mjs 2
  ./emulateScan.mjs null yellow
  ./emulateScan.mjs null 2
 */

import { randomInteger } from "js_utils/misc";
import { BackendRPIReader } from "../src/backend/rpi-reader/BackendRPIReader.js";
import { WRISTBAND_COLORS, MAX_WRISTBAND_ID } from "../src/constants.js";

const b = new BackendRPIReader({
  deviceId: "tmp",
});

let [id, color] = process.argv.slice(2);
id = parseInt(id) ? id : randomInteger(1, MAX_WRISTBAND_ID);
color = parseInt(color)
  ? color
  : WRISTBAND_COLORS.findIndex((c) => c === color);

if (color < 1) {
  color = randomInteger(1, WRISTBAND_COLORS.length - 1);
}

b.scan({ id, color });
