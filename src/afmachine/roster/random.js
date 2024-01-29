import { unique, isArray, isObject } from "js_utils/misc";
import { random as randomPlayer } from "../player/random.js";

function random(sources, options = {}) {
  // debug("random roster");

  const _options = {
    size: options.size ?? 0,
    ...options,
  };
  // debug(_options);

  const _sources = unique(
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
  // debug(_sources);

  if (_options.size < _sources.length) {
    _options.size = _sources.length;
  }

  const target = [];
  for (let i = 0; i < _options.size; i++) {
    target.push(randomPlayer(_sources[i], options));
  }

  // debug(target);
  return target;
}

export { random };
