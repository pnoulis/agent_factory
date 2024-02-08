import { Wristband } from "../wristband/Wristband.js";
import { flatWristbands } from "./flatWristbands.js";

function normalize(sources, options = {}) {
  trace("normalize player");
  trace(sources, "player normalize sources");
  trace(options, "player normalize options");

  const _options = {
    targetState: options.state || null,
    defaultState: options.defaultState || "unregistered",
    nullSupersede: options.nullSupersede || false,
  };
  trace(_options, "player normalize _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "player normalize _sources");

  const target = {
    username: null,
    name: null,
    surname: null,
    email: null,
    state: null,
    wristband: Wristband.normalize(
      flatWristbands(_sources),
      _options.wristband,
    ),
  };

  let wristbandMerged = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || null;
      target.name = _sources[i].name || null;
      target.surname = _sources[i].surname || null;
      target.email = _sources[i].email || null;
      target.state = _sources[i].state?.name || _sources[i].state || null;
      wristbandMerged = _sources[i].wristbandMerged ?? false;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.username = _sources[i].username || target.username;
      target.name = _sources[i].name || target.name;
      target.surname = _sources[i].surname || target.surname;
      target.email = _sources[i].email || target.email;
      target.state =
        _sources[i].state?.name || _sources[i].state || target.state;
      wristbandMerged = _sources[i].wristbandMerged ?? wristbandMerged;
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  } else {
    target.state ||= _options.defaultState;
  }

  trace(target, "player normalize target");
  return target;
}

export { normalize };
