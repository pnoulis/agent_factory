import { generateRandomName, randomInteger } from "js_utils/misc";
import { smallid } from "js_utils/uuid";
import { t_daytomls } from "../../misc/misc.js";
import { Package } from "../package/Package.js";
import { Player } from "../player/Player.js";
import { normalize } from "./normalize.js";

function random(sources, options) {
  trace("random team");
  trace(sources, "team random sources");
  trace(options, "team  random options");

  options ||= {};
  const _options = {
    depth: options.depth ?? 0,
    players: options.players ?? 0,
    packages: options.packages ?? 0,
  };
  trace(_options, "team random _options");

  const target = normalize(sources, options);
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

  if (_options.depth) {
    target.roster = target.roster.map((player) =>
      Player.random(player, {
        depth: _options.depth - 1,
        ...options.player,
        wristband: options.wristband,
      }),
    );
    target.packages = target.packages.map((pkg) =>
      Package.randome(pkg, options.package),
    );
  }
  trace(target, "team random target");
  return target;
}

export { random };
