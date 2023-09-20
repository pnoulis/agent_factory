/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./emulateScan.js 1 2

  The script cannot accept a shebang '#!/usr/bin/env' node which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

import { createRPIReaderService } from "../services/backend/createRPIReaderService.js";
import { WRISTBAND_COLORS } from "../constants.js";

/*
  ------------------------------ CLI ------------------------------
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.

  The command line arguments if any; are consumed by this script before
  importing other scripts which read process.argv to determine their calling
  context.
*/
if (globalThis.process.argv.length > 2) {
  try {
    const { getMqttClientBackend } = await import("../clients/mqtt.node.js");
    const rpiReaderService = await createRPIReaderService(
      getMqttClientBackend(),
    );
    await emulateScan(rpiReaderService);
  } finally {
    process.exit();
  }
}

/* ------------------------------ MODULE ------------------------------ */

function emulateScan(rpiReaderService, number, color) {
  return rpiReaderService
    .scanWristband(number === "r" ? null : number, color === "r" ? null : color)
    .then((scannedWristband) => {
      console.log(
        `Successfully published wristband scan. number:${
          scannedWristband.id
        } color:${WRISTBAND_COLORS[scannedWristband.color]}`,
      );
      return scannedWristband;
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to publish wristband scan.");
      throw err;
    });
}

export { emulateScan };
