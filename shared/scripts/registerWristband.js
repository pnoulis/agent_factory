#!/usr/bin/env node

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

  ./registerWristband.js 1

*/

const arg1 = parseInt(process.argv[2]);
const arg2 = process.argv.splice(3);
const { randomPlayer } = await import("./randomPlayer.js");
const { randomWristband } = await import("./randomWristband.js");

import { CreateBackendService } from "../services/backend/CreateBackendService.js";

const bservice = CreateBackendService();

/*
  Assume this module has been executed as a script if the parent node process
  has been provided with command line arguments instead of being used as a
  module through an import.
 */

if (arg1) {
  const { registerPlayer } = await import("./registerPlayer.js");
  globalThis.registerPlayer = registerPlayer;
  __registerWristband(false, arg1, ...arg2)
    .then((res) => {
      console.log(res);
      process.exit();
    })
    .catch((err) => console.log(err));
} else {
  const { registerPlayer, registerDuplicatePlayer } = await import(
    "./registerPlayer.js"
  );
  globalThis.registerPlayer = registerPlayer;
  globalThis.registerDuplicatePlayer = registerDuplicatePlayer;
}

/**
 * Register Wristband
 * @param {number || Object || Array<Object> || null} wristbands
 * @param {Array<Object>} registeredPlayers
 * @returns {Promise<Players>} Array of registered players and their wristbnads
 * @throws {Error} In case of a return NOK
 *
 * @example
 * registerWristband(); -> 1 player
 * @example
 * registerWristband(5); -> 5 players
 * @example
 * registerWristband({number: 5}) -> 1 player with wristband number 5
 * @example
 * registerWristband([{number: 5}, {number: 6}]) -> 2 players with wristbands 5 and 6
 * @example
 * registerWristband(null, p1, p2, ...n) -> N players
 * @example
 * registerWristband(3, p1) -> 3 players
 * @example
 * registerWristband({number: 5}, p1, p2, ...n) -> N players where the
 * first registered to wristband number 5
 * registerWristband([{ number: 5}, { number: 6}], p1) -> 2 players where
 * p1 = number 5, p2 = number6
 * @example
 * registerWristband([5, {number: 5}], p1) -> 5 players where 1st gets
 * wristband number 5
 */

const ERR_DUPLICATE_PLAYER = "This username already exists";
const ERR_PLAYER_HAS_WRISTBAND = "player has already a registered wristband";
async function __registerWristband(dupNoErr, wristbands, ...registeredPlayers) {
  let i = 0;
  let jobs = null;

  if (typeof wristbands === "number") {
    jobs = new Array(wristbands).fill(null).map((_) => ({}));
    wristbands = [];
  } else if (wristbands instanceof Array) {
    if (typeof wristbands[0] === "number") {
      jobs = new Array(wristbands[0]).fill(null).map((_) => ({}));
      wristbands.shift();
    } else {
      jobs = new Array(
        wristbands.length > registeredPlayers.length
          ? wristbands.length
          : registeredPlayers.length,
      )
        .fill(null)
        .map((_) => ({}));
    }
  } else {
    jobs = new Array(registeredPlayers.length || 1).fill(null).map((_) => ({}));
    wristbands = [wristbands];
  }

  while (i < jobs.length) {
    try {
      let player = registeredPlayers[i];
      if (dupNoErr) {
        player = await globalThis.registerDuplicatePlayer(player);
      } else if (!player) {
        player = await globalThis.registerPlayer();
      } else {
        try {
          player = await globalThis.registerPlayer(player);
        } catch (err) {
          if (err.cause === ERR_DUPLICATE_PLAYER) {
            throw err;
          }
        }
      }

      Object.assign(jobs[i], {
        ...registeredPlayers[i],
        ...player,
        wristband: {
          ...randomWristband(),
          ...wristbands[i],
        },
      });
      const { result, message } = await bservice.registerWristband({
        username: jobs[i].username,
        wristbandNumber: jobs[i].wristband.number,
      });
      if (result === "NOK") {
        if (message === ERR_PLAYER_HAS_WRISTBAND && dupNoErr) {
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
          if (_this.wristband.wristbandNumber !== jobs[i].wristband.number) {
            throw new Error(
              `Player ${jobs[i].username} wristband number mismatch ${_this.wristband.wristbandNumber} - ${jobs[i].wristband.number}`,
            );
          }
        } else {
          throw new Error("Failed wristband registration", { cause: message });
        }
      }
      jobs[i].wristband.wristbandNumber ||= jobs[i].wristband.number;
      jobs[i].wristband.wristbandColor ||= jobs[i].wristband.color;
      jobs[i].wristband.active ||= jobs[i].wristband.active || null;
      delete jobs[i].wristband.number;
      delete jobs[i].wristband.color;
      console.log(`Successfully registered player wristband ${i}`);
    } catch (err) {
      console.log(`Failed to register player wristband ${i}`);
      throw err;
    }
    i++;
  }
  return jobs.length > 1 ? jobs : jobs.pop();
}

const registerDuplicateWristband = __registerWristband.bind(null, true);
const registerWristband = __registerWristband.bind(null, false);

export { registerWristband, registerDuplicateWristband };
