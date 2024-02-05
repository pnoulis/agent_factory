import { isObject, isArray, unique } from "js_utils/misc";

function gatherPlayers(car, src) {
  if (isArray(src)) {
    for (let i = 0; i < src.length; i++) {
      findPlayer(car, src[i]);
    }
  } else if (isObject(src)) {
    if (Object.hasOwn(src, "roster")) {
      findPlayer(car, src.roster);
    } else {
      car.push(src);
    }
  }
  return car;
}

function flatRoster(sources) {
  const _sources = [];
  unique(gatherPlayers(_sources, sources));
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
  return [...soloPlayers, ...Array.from(repeatedPlayers.values())];
}

export { flatRoster };
