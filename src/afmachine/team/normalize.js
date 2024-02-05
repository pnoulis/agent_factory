import { isObject } from "js_utils/misc";
import { normalize as normalizePackage } from "../package/normalize.js";
import { normalize as normalizePlayer } from "../player/normalize.js";
import { flatRosters } from "./flatRosters.js";
import { flatPackages } from "./flatPackages.js";

function normalize(sources, options = {}) {
  trace("normalize team");

  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    package: options.package,
    player: {
      ...options?.player,
      wristband: options.wristband,
    },
  };
  trace(_options, "team _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "team _sources");

  const target = {
    name: "",
    t_created: null,
    points: null,
    state: "",
    packages: flatPackages(sources).map((src) =>
      normalizePackage(src, _options.package),
    ),
    roster: flatRosters(sources).map((src) =>
      normalizePlayer(src, _options.player),
    ),
  };

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || "";
      target.t_created = _sources[i].t_created || _sources[i].created || null;
      target.points = _sources[i].points ?? _sources[i].totalPoints ?? 0;
      target.state =
        _sources[i].teamState ||
        (isObject(_sources[i].state)
          ? _sources[i].state.name
          : _sources[i].state);
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || target.name;
      target.t_created =
        _sources[i].created ?? _sources[i].t_created ?? target.t_created;
      target.points =
        _sources[i].totalPoints ?? _sources[i].points ?? target.points;
      target.state =
        _sources[i].teamState ||
        (isObject(_sources[i].state)
          ? _sources[i].state.name
          : _sources[i].state) ||
        target.state;
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (target.state === "PACKAGE_RUNNING") {
    target.state = "playing";
  } else if (
    target.state === "PENDING_PACKAGES" ||
    target.state === "FINISHED" ||
    target.state === "LOADED_PACKAGES"
  ) {
    target.state = "registered";
  }
  target.state ||= _options.defaultState;

  if (_options.depth > 0) {
    // target.roster = flatRosters(_sources).map((src) =>
    //   normalizePlayer(src, {
    //     ..._options.player,
    //     depth: _options.depth - 1,
    //     wristband: _options.wristband,
    //   }),
    // );
    // target.roster = target.roster.map((player) =>
    //   normalizePlayer(player, {
    //     depth: _options.depth - 1,
    //     defaultState: target.state === "playing" ? "playing" : "inTeam",
    //     ..._options.player,
    //     wristband: {
    //       defaultState: "paired",
    //       ..._options.wristband,
    //     },
    //   }),
    // );

    // target.packages = flatPackages(_sources).map((src) =>
    //   normalizePackage(src, _options.package),
    // );

    // target.packages = target.packages.map((pkg) =>
    //   normalizePackage(pkg, _options.package),
    // );
  }
  trace(target, "team target");
  return target;
}

export { normalize };
