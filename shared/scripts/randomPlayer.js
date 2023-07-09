#!/usr/bin/env node

/*
  This script can run in the browser and nodejs, both as a module
  and executable.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./randomPlayer.js 1

 */

import { generateRandomName, randomInteger } from "js_utils/misc";
import { isRuntime } from "js_utils/environment";

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (isRuntime("node") && globalThis.process?.argv?.length > 2) {
  const arg1 = parseInt(process.argv[2]);
  process.argv.splice(2);
  const players = randomPlayer(arg1);
  console.log(players);
}

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
