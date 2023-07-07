/*
  Does not run in the browser.
 */
import process from "node:process";
import { CreateBackendService } from "../services/backend/CreateBackendService.js";
import { randomPlayer } from "./randomPlayer.js";

const bservice = CreateBackendService();

/**
 * Register players
 *
 * @example
 *
 * import { registerPlayers } from '/registerPlayers.js'
 * registerPlayers(3).then((res) => console.log(res)).catch(err => console.log(err));
 *
 * @example
 *
 * registerPlayers(3, p1, p2)
 *
 * @example
 *
 * registerPlayers(3, p1, p2, p3)
 **/

function registerPlayers(n = 1, ...players) {
  const toregister = new Array(n);
  for (let i = 0; i < n; i++) {
    toregister[i] = bservice.registerPlayer(players.pop() || randomPlayer());
  }
  return Promise.all(toregister);
}

/*
  If running as a script
 */

if (process.stdin.isTTY) {
  registerPlayers(process.argv[0], ...process.argv.slice(1));
}

export { registerPlayers };
