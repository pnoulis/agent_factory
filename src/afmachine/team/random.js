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

  switch (target.state) {
    case "unregistered":
      target.roster = target.roster.map((player) =>
        Player.random(player, {
          ...options.player,
          state: "registered",
          wristband: {
            state: ["unpaired", "pairing", "unpairing", "paired"].at(
              randomInteger(0, 3),
            ),
            ...options.wristband,
          },
        }),
      );
      target.packages = target.packages.map((pkg) =>
        Package.random(pkg, { state: "unregistered" }),
      );
      break;
    case "registered":
      while (target.roster.length < 2) {
        target.roster.push({});
      }
      target.roster = target.roster.map((player) =>
        Player.random(player, {
          ...options.player,
          state: "registered",
          wristband: {
            ...options.wristband,
            state: "paired",
          },
        }),
      );
      target.packages = target.packages.map((pkg) =>
        Package.random(pkg, {
          state: ["unregistered", "registered"].at(randomInteger(0, 1)),
        }),
      );
      break;
    case "playing":
      while (target.roster.length < 2) {
        target.roster.push({});
      }
      target.roster = target.roster.map((player) =>
        Player.random(player, {
          ...options.player,
          state: "registered",
          wristband: {
            ...options.wristband,
            state: "paired",
          },
        }),
      );
      const playingPackage =
        target.packages.find((pkg) => pkg.state === "playing") ||
        Package.random(target.packages.at(0), { state: "playing" });

      target.packages = [playingPackage].concat(
        target.packages.slice(1).map((pkg) =>
          Package.random(pkg, {
            state: ["unregistered", "registered", "completed"].at(
              randomInteger(0, 2),
            ),
            ...options.package,
          }),
        ),
      );

      // hopefully package ID's will be unique.
      break;
    default:
      throw new Error(`Unrecognized team target state: '${target.state}'`);
  }

  trace(target, "team random target");
  return target;
}

export { random };
