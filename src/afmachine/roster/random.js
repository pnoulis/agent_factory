import { unique, isArray, isObject } from "js_utils/misc";
import { Player } from "../../player/thin/Player.js";

function random(sources, options = {}) {
  // debug("random roster");

  const _options = {
    size: options.size ?? 0,
    ...options,
  };
  // debug(_options);

  const _sources = unique(
    [sources].flat(2).reduce((cdr, src) => {
      if (src == null) return cdr;
      src = Object.hasOwn(src, "roster") ? src.roster : src;
      if (src instanceof Map) {
        cdr.push(...Array.from(src.values()));
      } else if (isArray(src)) {
        cdr.push(...src);
      } else if (isObject(src)) {
        cdr.push(src);
      }
      return cdr;
    }, []),
  );

  // debug(_sources);

  if (_options.size < _sources.length) {
    _options.size = _sources.length;
  }

  const target = [];
  for (let i = 0; i < _options.size; i++) {
    target.push(Player.random(_sources[i], options));
  }

  // debug(target);
  return target;
}

export { random };
