import { unique, isArray, isObject } from "js_utils/misc";
import { random as randomPlayer } from "../player/random.js";

function random(sources, options = {}) {
  trace("random roster");

  const _options = {
    ...options,
    size: options.size ?? 0,
    depth: options.depth ?? 0,
    Player: options.Player,
    Wristband: options.Wristband,
  };
  trace(_options, "roster random _options");

  const _sources = [sources]
    .flat(2)
    .filter((src) => !!src)
    .map((src) => ("tobject" in src ? src.tobject(_options.depth) : src));
  trace(_sources, "roster random _sources");

  if (_options.size < _sources.length) {
    _options.size = _sources.length;
  }

  const target = [];

  if (_options.depth <= 0) {
    for (let i = 0; i < _options.size; i++) {
      target.push(
        new _options.Player(
          _sources[i],
          new _options.Wristband(_sources[i]?.wristband),
        ),
      );
    }
  } else {
    for (let i = 0; i < _options.size; i++) {
      target.push(
        randomPlayer(_sources[i], { ..._options, depth: _options.depth - 1 }),
      );
    }
  }
  trace(target, "roster random target");
  return target;
}

export { random };
