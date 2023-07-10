/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  The command line interface for now does not accept the same argument parameters as the function
  itself.

  Example:

  ./registerPlayer.js 1
 */


import { CreateBackendService } from "../services/backend/CreateBackendService.js";
const bservice = CreateBackendService();
const ERR_DUPLICATE_PLAYER = "This username already exists";

/*
  ------------------------------ CLI ------------------------------
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.

  The command line arguments if any; are consumed by this script before
  importing other scripts which read process.argv to determine their calling
  context.
*/
let arg1;
if (globalThis.process.argv.length > 2) {
  arg1 = parseInt(process.argv.splice(2, 1));
}
const { randomPlayer } = await import("./randomPlayer.js");
if (arg1) {
  __registerPlayer(false, arg1).then((res) => {
    console.dir(res, { depth: null})
  }).finally(process.exit);
}

/* ------------------------------ MODULE ------------------------------ */
/**
 * Register player
 *
 * @param {Boolean} dupNoErr - If the Flag is ON do not
 * reject in case of a NOK response stemming from an attempt
 * at registering an already registered player.
 * @param {Array<Number, Object|| Object>} players - See examples
 *
 * @returns {Promise} - Array of players
 *
 * @example
 * registerPlayer(); -> 1 player
 * @example
 * registerPlayer(5); -> 5 players
 * @example
 * registerPlayer({username: "p1"}); -> 1 player
 * @example
 * registerPlayer({username: "p1"}, {username: "p2"}); -> 2 players
 * @example
 * registerPlayer(3, {username: "p1"}) -> 3 players
 * @example
 * // throws no error
 * registerDuplicatePlayer({username: "p1"}) -> 1 player
 * registerDuplicatePlayer({username: "p1"}) -> 1 player
 **/
async function __registerPlayer(dupNoErr, ...players) {
  let i = 0;
  let jobs = null;
  if (!players.length) {
    jobs = new Array(1);
  } else if (typeof players[0] === "number") {
    i = players.shift();
    jobs = new Array(players.length > i ? players.length : i);
    i = 0;
  } else {
    jobs = new Array(players.length);
  }

  while (i < jobs.length) {
    try {
      jobs[i] = {
        ...randomPlayer(),
        ...players[i],
      };

      const { result, player, message } = await bservice.registerPlayer(
        jobs[i],
      );
      if (result === "NOK") {
        if (message === ERR_DUPLICATE_PLAYER && dupNoErr) {
          const {
            _result,
            _message,
            players: [_this],
          } = await bservice.searchPlayer({ searchTerm: jobs[i].username });
          if (_result === "NOK") {
            throw new Error("Failed player duplicate registartion", {
              cause: _message,
            });
          }
          jobs[i] = _this;
        } else {
          throw new Error("Failed player registration", { cause: message });
        }
      } else {
        jobs[i] = player;
      }
      console.log(`Successfully registered player ${i}`);
    } catch (err) {
      console.log(err);
      console.log(`Failed to register player ${i}`);
      throw err;
    }
    i++;
  }

  return jobs.length > 1 ? jobs : jobs.pop();
}

const registerDuplicatePlayer = __registerPlayer.bind(null, true);
const registerPlayer = __registerPlayer.bind(null, false);

export { registerPlayer, registerDuplicatePlayer };
