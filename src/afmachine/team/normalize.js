import { Package } from "../package/Package.js";
import { Player } from "../player/Player.js";
import { flatRosters } from "./flatRosters.js";
import { flatPackages } from "./flatPackages.js";

function normalize(sources, options) {
  trace(sources, options, "team.normalize() arguments");

  options ||= {};
  const _options = {
    targetState: options.state || null,
    nullSupersede: options.nullSupersede || false,
    defaultState: options.defaultState || "unregistered",
  };
  trace(_options, "team.normalize() _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "team.normalize() _sources");

  const target = {
    name: null,
    t_created: null,
    points: null,
    state: null,
    isTemporary: false,
    roster: [],
    packages: [],
  };

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || null;
      target.t_created = _sources[i].t_created || _sources[i].created || null;
      target.points = _sources[i].points ?? _sources[i].totalPoints ?? null;
      target.isTemporary = _sources[i].isTemporary ?? null;
      target.state =
        _sources[i].state?.name ||
        _sources[i].state ||
        _sources[i].teamState ||
        null;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || target.name;
      target.t_created =
        _sources[i].created || _sources[i].t_created || target.t_created;
      target.points =
        _sources[i].totalPoints ?? _sources[i].points ?? target.points;
      target.isTemporary = _sources[i].isTemporary ?? target.isTemporary;
      target.state =
        _sources[i].state?.name ||
        _sources[i].state ||
        _sources[i].teamState ||
        target.state;
    }
  }

  // stage 1
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
  } else {
    target.state ||= _options.defaultState;
  }

  // stage 2
  target.roster = flatRosters(sources).map((src) =>
    Player.normalize(src, {
      state: target.state === "playing" ? "playing" : "inTeam",
      ...options.player,
      wristband: options.wristband,
    }),
  );
  target.packages = flatPackages(sources).map((src) =>
    Package.normalize(src, options.package),
  );
  trace(target, "team.normalize() target");
  return target;
}

export { normalize };
