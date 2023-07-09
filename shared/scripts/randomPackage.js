#!/usr/bin/env node

/*
  This script can run in the browser and nodejs, both as a module
  and executable.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./randomPackage.js 1

 */

import { AF_PACKAGES } from "../constants.js";
import { randomInteger } from "js_utils/misc";
import { isRuntime } from "js_utils/environment";

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (isRuntime("node") && globalThis.process?.argv?.length > 2) {
  const arg1 = parseInt(process.argv[2]);
  process.argv.splice(2);
  const pkgs = randomPackage(arg1);
  console.log(pkgs);
}

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
