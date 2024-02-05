import { generateRandomName, randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { t_daytomls } from "../../misc/misc.js";
import { random as randomPackage } from "../package/random.js";
import { random as randomPlayer } from "../player/random.js";
import { normalize } from "./normalize.js";

function random(sources, options = {}) {
  trace("random team");
  const _options = {
    ...options,
    longtext: options.longtext ?? false,
    depth: options.depth ?? 0,
    players: options.players ?? 0,
    packages: options.packages ?? 0,
  };
  trace(_options, "team random _options");

  const target = normalize(sources, _options);
  while (target.roster.length < _options.players) {
    target.roster.push({});
  }
  while (target.packages.length < _options.packages) {
    target.packages.push({});
  }
  trace(target, "team random target normalized");

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
