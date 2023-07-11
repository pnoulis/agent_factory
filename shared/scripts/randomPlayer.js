/*
  This script can run in the browser and nodejs, both as a module
  and executable.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  node ./randomPlayer.js 1

  The script cannot accept a shebang '#!/usr/bin/env node' which it would allow
  for its execution without the need to prefix it with 'node' because in some
  contexts it breaks importing the script as a module.

 */

import { generateRandomName, randomInteger } from "js_utils/misc";
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
  console.log(randomPlayer(arg1));
  process.exit();
}

/* ------------------------------ MODULE ------------------------------ */
function randomPlayer(n = 1) {
  const players = [];

  while (n > 0) {
    const username = `${generateRandomName()}_${randomInteger(1, 1000)}`;
    const [name, surname, password = ""] = username.split("_");
    players.push({
      username,
      email: `${username}@gmail.com`,
      name,
      surname,
      password,
    });
    --n;
  }

  return players.length > 1 ? players : players.pop();
}

export { randomPlayer };
