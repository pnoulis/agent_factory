import { isObject, isArray, unique } from "js_utils/misc";

function gatherPlayers(car, src) {
  if (isArray(src)) {
    for (let i = 0; i < src.length; i++) {
      gatherPlayers(car, src[i]);
    }
  } else if (isObject(src)) {
    if (Object.hasOwn(src, "_roster")) {
      gatherPlayers(car, src._roster);
    } else if (Object.hasOwn(src, "roster")) {
      gatherPlayers(car, src.roster);
    } else if (Object.hasOwn(src, "currentRoster")) {
      gatherPlayers(car, src.currentRoster?.players);
    } else {
      car.push(src);
    }
  }
  return car;
}

function flatRosters(...sources) {
  const _sources = unique(gatherPlayers([], sources));
  const repeatedPlayers = new Map();
  const soloPlayers = [];
  for (let i = 0; i < _sources.length; i++) {
    const player = repeatedPlayers.get(_sources[i].username);
    if (player) {
      player.push(_sources[i]);
    } else if (_sources[i].username?.length >= 1) {
      repeatedPlayers.set(_sources[i].username, [_sources[i]]);
    } else {
      soloPlayers.push(_sources[i]);
    }
  }
  return [...soloPlayers, ...Array.from(repeatedPlayers.values())];
}

export { flatRosters };
