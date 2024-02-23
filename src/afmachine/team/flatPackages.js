import { isObject, isArray, unique } from "js_utils/misc";

function gatherPackages(car, src) {
  if (isArray(src)) {
    for (let i = 0; i < src.length; i++) {
      gatherPackages(car, src[i]);
    }
  } else if (isObject(src)) {
    if (Object.hasOwn(src, "_packages")) {
      gatherPackages(car, src._packages);
    } else if (Object.hasOwn(src, "packages")) {
      gatherPackages(car, src.packages);
    } else {
      car.push(src);
    }
  }
  return car;
}

function flatPackages(...sources) {
  const _sources = unique(gatherPackages([], sources));
  const repeatedPackages = new Map();
  const soloPackages = [];
  for (let i = 0; i < _sources.length; i++) {
    const pkg = repeatedPackages.get(_sources[i].id);
    if (pkg) {
      pkg.push(_sources[i]);
    } else if (_sources[i].id > 0) {
      repeatedPackages.set(_sources[i].id, [_sources[i]]);
    } else {
      soloPackages.push(_sources[i]);
    }
  }
  return [...soloPackages, ...Array.from(repeatedPackages.values())];
}

export { flatPackages };
