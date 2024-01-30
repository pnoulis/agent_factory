import { isObject } from "js_utils/misc";
import { normalize as normalizeWristband } from "../wristband/normalize.js";

function normalize(sources, options = {}) {
  trace("normalize player");

  // See documentation at wristband/normalize.js
  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    depth: options.depth ?? 0,
    wristband: options.wristband,
  };
  trace(_options, "player options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  // trace(_sources);

  const target = {
    username: "",
    name: "",
    surname: "",
    email: "",
    state: "",
  };
  let wristbandMerged = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || null;
      target.name = _sources[i].name || null;
      target.surname = _sources[i].surname || null;
      target.email = _sources[i].email || null;
      target.state = isObject(_sources[i].state)
        ? _sources[i].state.name
        : _sources[i].state;
      wristbandMerged = _sources[i].wristbandMerged ?? false;
      target.wristband = _sources[i].wristband ?? {};
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || target.username;
      target.name = _sources[i].name || target.name;
      target.surname = _sources[i].surname || target.surname;
      target.email = _sources[i].email || target.email;
      target.state =
        (isObject(_sources[i].state)
          ? _sources[i].state.name
          : _sources[i].state) || target.state;
      wristbandMerged = _sources[i].wristbandMerged ?? wristbandMerged;
      target.wristband = _sources[i].wristband ?? target.wristband;
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  }

  target.state ||= _options.defaultState;

  if (_options.depth > 0) {
    target.wristband = normalizeWristband(target.wristband, options.wristband);
  }
  trace(target, "player target");
  return target;
}

export { normalize };
