import { isObject, isArray } from "js_utils/misc";
import { normalize as normalizePackage } from "../package/normalize.js";
import { normalize as normalizePlayer } from "../player/normalize.js";

function normalize(sources, options = {}) {
  trace("normalize team");

  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    depth: options.depth ?? 0,
    package: options.package,
    player: options.player,
    wristband: options.wristband,
  };
  trace(_options, "team _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "team _sources");

  const target = {
    name: "",
    t_created: null,
    points: null,
    packages: [],
    roster: [],
    state: "",
  };
  let roster;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || "";
      target.t_created = _sources[i].t_created || _sources[i].created || null;
      target.points = _sources[i].points ?? _sources[i].totalPoints ?? 0;
      target.packages = _sources[i].packages || [];
      target.roster =
        _sources[i].currentRoster?.players || _sources[i].roster || [];
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
      target.packages = _sources[i].packages || target.packages;
      target.roster =
        _sources[i].currentRoster?.players ||
        _sources[i].roster ||
        target.roster;
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
    target.roster = target.roster.map((player) =>
      normalizePlayer(player, {
        depth: _options.depth - 1,
        defaultState: target.state === "playing" ? "playing" : "inTeam",
        ..._options.player,
        wristband: {
          defaultState: "paired",
          ..._options.wristband,
        },
      }),
    );
    target.packages = target.packages.map((pkg) =>
      normalizePackage(pkg, _options.package),
    );
  }
  trace(target, "team target");
  return target;
}

export { normalize };
