import { isObject, isArray } from "js_utils/misc";
import { normalize as normalizePackages } from "../package/normalize.js";
import { normalize as normalizeRoster } from "../roster/normalize.js";

function normalize(sources, options = {}) {
  trace("normalize team");

  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    depth: options.depth ?? 0,
    pkgs: options.pkgs,
    roster: options.roster,
  };
  trace(_options, "team options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "team _sources");

  const target = {
    name: "",
    t_created: null,
    points: 0,
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
      if (Object.hasOwn(_sources[i], "currentRoster")) {
        roster = _sources[i].currentRoster;
        target.roster = _sources[i].currentRoster || target.roster;
      } else if (Object.hasOwn(_sources[i], "roster")) {
        roster = isArray(_sources[i].roster)
          ? _sources[i].roster
          : _sources[i].roster.players;
      }
      target.roster = roster || [];
      target.state =
        _sources[i].teamState ||
        (isObject(_sources[i].state)
          ? _sources[i].state.name
          : _sources[i].state);
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.name = _sources[i].name || target.name;
      target.t_created = _sources[i].created || target.t_created;
      target.points = _sources[i].totalPoints || target.points;
      target.packages = _sources[i].packages || target.packages;

      if (Object.hasOwn(_sources[i], "currentRoster")) {
        roster = _sources[i].currentRoster;
        target.roster = _sources[i].currentRoster || target.roster;
      } else if (Object.hasOwn(_sources[i], "roster")) {
        roster = isArray(_sources[i].roster)
          ? _sources[i].roster
          : _sources[i].roster.players;
      }

      target.roster = roster || target.roster;
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
    target.state === "PACKAGE_PENDING" ||
    target.state === "FINISHED"
  ) {
    target.state = "registered";
  }
  target.state ||= _options.defaultState;

  if (_options.depth > 0) {
    target.roster = normalizeRoster(target.roster, {
      state: target.state === "playing" ? "playing" : "inTeam",
      depth: 1,
      wristband: { state: "paired" },
      ..._options.roster,
    });
    target.packages = target.packages.map((pkg) =>
      normalizePackages(pkg, _options.pkgs),
    );
  }
  trace(target, "team target");
  return target;
}

export { normalize };
