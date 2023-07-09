#!/usr/bin/env node

/*
  This script can be executed from the command line or imported
  as a module in a nodejs runtime only. Browser runtime is not supported.

  In order to call this script from the command line an argument *must*
  be provided. Such a requirement exists in order to allow the script a
  chance at detecting its runtime environment and prevent it from
  running jobs twice if imported as a module.

  Example:

  ./registerTeam.js 1
*/

const arg1 = parseInt(process.argv[2]);
const arg2 = process.argv.splice(3);

import { CreateBackendService } from "../services/backend/CreateBackendService.js";
import { calcTeamSize } from "../utils/misc.js";
import { MAX_TEAM_SIZE } from "../constants.js";
import { generateRandomName } from "js_utils/misc";

const bservice = CreateBackendService();

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (arg1) {
  const { registerWristband } = await import("./registerWristband.js");
  globalThis.registerWristband = registerWristband;
  registerTeam(arg1, ...arg2)
    .then((res) => {
      console.log(res);
      process.exit();
    })
    .catch((err) => console.log(err));
} else {
  const { registerWristband } = await import("./registerWristband.js");
  globalThis.registerWristband = registerWristband;
}

/**
 * Register Team.
 * @param {number || string || Array<string>} teams
 * @param {Array<Object>} registeredPlayers
 * @returns {Promise<Teams>}
 * @throws {Error} In case of return NOK
 *
 * @example
 * registerTeam(); -> 1 team
 * @example
 * registerTeam(5); -> 5 teams
 * @example
 * registerTeam("one") -> 1 team named 'one'
 * @example
 * registerTeam(["one", "two"]) -> 2 teams named 'one' and 'two'
 * @example
 * registerTeam([5, "one", "two"]) -> 5 teams, where #1 and #2 are named
 * 'one' and 'two' respectively.
 * @example
 * registerTeam(null, [ { ...p1 }, {...p2}]) -> 1 team
 *
 * More examples to follow
 */
async function registerTeam(teams, ...registeredPlayers) {
  let i = 0;
  let jobs = null;
  const [nTeams] = calcTeamSize(registeredPlayers);
  if (typeof teams === "number") {
    jobs = new Array(teams).fill(null).map((_) => ({}));
    teams = [];
  } else if (teams instanceof Array) {
    if (typeof teams[0] === "number") {
      jobs = new Array(teams[0]).fill(null).map((_) => ({}));
    } else {
      jobs = new Array(teams.length > nTeams ? teams.length : nTeams)
        .fill(null)
        .map((_) => ({}));
    }
  } else {
    jobs = new Array(nTeams || 1).fill(null).map((_) => ({}));
    teams = [teams];
  }

  while (i < jobs.length) {
    try {
      Object.assign(jobs[i], {
        teamName: teams[i] || generateRandomName(),
      });

      // Array<{username,...}>
      // || Array<string>
      // || null
      jobs[i].players = registeredPlayers[i];
      if (jobs[i].players) {
        jobs[i].players = jobs[i].players.map((p) =>
          typeof p === "string" ? p : p.username,
        );
      } else {
        jobs[i].players = await globalThis
          .registerWristband(MAX_TEAM_SIZE)
          .then((players) => players.map((p) => p.username));
      }

      const { result, message } = await bservice.mergeTeam({
        teamName: jobs[i].teamName,
        usernames: jobs[i].players,
      });
      if (result === "NOK") {
        throw new Error("Failed team registration", { cause: message });
      }
      console.log(`Successfully registered team ${i}`);
    } catch (err) {
      console.log(`Failed to register team ${i}`);
      throw err;
    }
    i++;
  }

  return jobs.length > 1 ? jobs : jobs.pop();
}

export { registerTeam };
