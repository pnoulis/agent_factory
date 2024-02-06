import { normalize as normalizeWristband } from "../wristband/normalize.js";
import { flatWristbands } from "./flatWristbands.js";

function normalize(sources, options = {}) {
  trace("normalize player");

  trace(options, "player options");
  trace(sources, "player sources");

  // See documentation at wristband/normalize.js
  const _options = {
    password: options.password || false,
    depth: options.depth ?? 1,
    targetState: options.state || "",
    nullSupersede: options.nullSupersede || false,
    defaultState: options.defaultState || "unregistered",
    wristband: options.wristband || {},
  };
  trace(_options, "player _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "player _sources");

  const target = {
    username: null,
    name: null,
    surname: null,
    email: null,
    state: null,
    wristband: null,
  };
  let wristbandMerged = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || null;
      target.name = _sources[i].name || null;
      target.surname = _sources[i].surname || null;
      target.email = _sources[i].email || null;
      target.state = _sources[i].state?.name || _sources[i].state || null;
      wristbandMerged = _sources[i].wristbandMerged || false;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || target.username;
      target.name = _sources[i].name || target.name;
      target.surname = _sources[i].surname || target.surname;
      target.email = _sources[i].email || target.email;
      target.state = _sources[i].state?.name || _sources[i].state || null;
      wristbandMerged = _sources[i].wristbandMerged ?? wristbandMerged;
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  }

  target.state ||= _options.defaultState;

  if (_options.depth > 0) {
    target.wristband = normalizeWristband(
      flatWristbands(_sources),
      _options.wristband,
    );
  }

  trace(target, "player target");
  return target;
}

export { normalize };
