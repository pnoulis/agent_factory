/*
  This script can run in the browser and nodejs, both as a module
  and executable.


  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./randomPackage.js 1

  Unfortunately the script cannot accept a shebang #!/usr/bin/env node which it
  would allow for its execution without the need to prefix it with 'node'
  because in some contexts it breaks importing the script as a module.
 */

import { AF_PACKAGES } from "../constants.js";
import { randomInteger } from "js_utils/misc";
import { isRuntime } from "js_utils/environment";

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
  console.log(randomPackage(arg1));
  process.exit();
}

/* ------------------------------ MODULE ------------------------------ */
function randomPackage(n = 1) {
  const packages = new Array(n);
  const lenPkgs = AF_PACKAGES.length;

  n = 0;
  while (n < packages.length) {
    packages[n] = AF_PACKAGES[randomInteger(0, lenPkgs - 1)];
    n++;
  }
  return packages.length > 1 ? packages : packages.pop();
}

export { randomPackage };
