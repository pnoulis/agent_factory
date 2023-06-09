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

import { exec, spawn } from "node:child_process";
import path from "node:path";
import { getMqttClientBackend } from "../clients/mqtt.js";
import { findNodePkgDir } from "js_utils/node";

const AF_SHAREDIR = findNodePkgDir();
const AF_SRCDIR = path.resolve(AF_SHAREDIR, "../");
const PYTHON_SCRIPT_PATH = path.resolve(
  AF_SRCDIR,
  "gregoris/MQTT_API_Emulator/main.py",
);
const mqttClientBackend = getMqttClientBackend();

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
  const arg1 = parseInt(process.argv.splice(2, 1));
  const arg2 = parseInt(process.argv.splice(2, 1));
  emulateScan(arg1 || "r", arg2 || "r").finally(() => {
    // for some reason emulate scan needs to write to stdout
    // in order to not exit prematurely.
    console.log("done");
    process.exit;
  });
}

/* ------------------------------ MODULE ------------------------------ */
function runPythonScript() {
  return new Promise((resolve, reject) => {
    exec("ps aux | grep 'python.*./main.py$'", (err, stdout, stderr) => {
      if (err) {
        spawn("python", [PYTHON_SCRIPT_PATH], {
          stdio: "ignore",
          detached: true,
        }).unref();
        console.log("Spawned main.py!");
        resolve();
      } else {
        resolve();
      }
    });
  });
}

function emulateScan(number = "r", color = "r") {
  return runPythonScript()
    .then(() => {
      return mqttClientBackend.publish(
        `/themaze/registration5/emulateScan/${number}/${color}`,
      );
    })
    .then(() => {
      console.log(
        `Successfully published wristband scan. number:${number} color:${color}`,
      );
      return [number, color];
    })
    .catch((err) => {
      console.log(err);
      console.log("Failed to publish wristband scan.");
      throw err;
    });
}

export { emulateScan };
