import { isObject } from "js_utils/misc";

function normalize(sources, options = {}) {
  // debug("normalize player");

  // See documentation at wristband/normalize.js
  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    depth: options.depth || 0,
  };
  // debug(_options);

  const _sources = [sources].flat(2).filter((src) => !!src);
  // debug(_sources);

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
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  }

  target.state ||= _options.defaultState;

  // debug(target);
  return target;
}

export { normalize };
