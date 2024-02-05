import { isObject, isArray, unique } from "js_utils/misc";
import { normalize as normalizePlayer } from "../player/normalize.js";

function normalize(sources, options) {
  // debug("normalize roster");

  // debug("options", options);
  // debug("sources", sources, { depth: 1 });

  // Reduce sources into unique players. If a Player
  // is repeated within the set there are 2 reasons.
  // 1. These 2 players are the exact same object and
  // one of them will be left out of the result.
  // 2. The 2 players are not the same object but share
  // the same username. In this case the Players will
  // be merged.
  // The __sources output looks like that in the end:
  // [ [PlayerAA_#1, PlayerAA_#2], PlayerBB, PlayerCC, [ PlayerCC_#1, PlayerCC_#2]]
  let _sources = unique(
    (function findPlayer(accum, src) {
      if (isArray(src)) {
        for (let i = 0; i < src.length; i++) {
          findPlayer(accum, src[i]);
        }
      } else if (isObject(src)) {
        if (Object.hasOwn(src, "roster")) {
          findPlayer(accum, src.roster);
        } else {
          accum.push(src);
        }
      }
      return accum;
    })([], sources),
  );

  const repeatedPlayers = new Map();
  const soloPlayers = [];
  for (let i = 0; i < _sources.length; i++) {
    const player = repeatedPlayers.get(_sources[i].username);
    if (player) {
      player.push(_sources[i]);
    } else if (_sources[i].username !== "") {
      repeatedPlayers.set(_sources[i].username, [_sources[i]]);
    } else {
      soloPlayers.push(_sources[i]);
    }
  }
  _sources = [...soloPlayers, ...Array.from(repeatedPlayers.values())];
  // debug("__sources", _sources, { depth: 3 });

  const target = _sources.map((src) => normalizePlayer(src, options));
  // debug("target", target, {});

  return target;
}

export { normalize };

//  LocalWords:  PlayerCC
