import { generateRandomName, randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { t_daytomls } from "../../misc/misc.js";
import { random as randomPackage } from "../package/random.js";
import { random as randomPlayer } from "../player/random.js";

function random(sources, options = {}) {
  trace("random team");
  const _options = {
    ...options,
    longtext: options.longtext ?? false,
    depth: options.depth ?? 0,
    size: options.size ?? 0,
  };
  trace(_options, "team random _options");

  const _sources = [sources]
    .flat(2)
    .filter((src) => !!src)
    .map((src) => ("tobject" in src ? src.tobject(_options.depth) : src));
  trace(_sources, "team random _sources");

  const target = Object.assign({ roster: [], packages: [] }, ..._sources);

  target.name ||= generateRandomName() + "_" + smallid();
  target.points ??= randomInteger(0, 500);
  target.t_created = Date.now() - t_daytomls() / randomInteger(2, 5);

  if (_options.depth > 0) {
    target.roster = target.roster.map((player) =>
      randomPlayer(player, { ..._options, depth: _options.depth - 1 }),
    );
    target.packages = target.packages.map((pkg) =>
      randomPackage(pkg, _options),
    );
  }
  trace(target, "team random target");
  return target;
}

export { random };
