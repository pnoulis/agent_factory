import { Wristband } from "../wristband/Wristband.js";
import { flatWristbands } from "./flatWristbands.js";

function normalize(sources, options) {
  trace(sources, options, "player.normalize() arguments");

  options ||= {};
  const _options = {
    targetState: options.state || null,
    defaultState: options.defaultState || "unregistered",
    nullSupersede: options.nullSupersede || false,
    stage2: options.stage2 ?? true,
  };
  trace(_options, "player.normalize() _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "player.normalize() _sources");

  const target = {
    username: null,
    name: null,
    surname: null,
    email: null,
    state: null,
    wristband: Wristband.normalize(flatWristbands(_sources), options.wristband),
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

  // stage 1
  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  } else {
    target.state ||= _options.defaultState;
  }

  if (!_options.stage2) {
    trace(target, "player.normalize() target");
    return target;
  }

  // stage 2
  let misaligned = "";
  switch (target.state) {
    case "playing":
      // wristband must be paired
      if (target.wristband.state !== "paired") {
        misaligned = "Must have a paired wristband";
        break;
      }
    // fall through
    case "inTeam":
    // fall through
    case "registered":
      if (!(target.username && target.name && target.surname && target.email)) {
        misaligned = "Missing properties";
      }
    // fall through
    case "unregistered":
      // Content could be either defined or not defined
      break;
    default:
      throw globalThis.createError(({ EPLAYER }) =>
        EPLAYER({
          msg: `Unrecognized player state: '${target.state}'`,
          target,
        }),
      );
  }

  trace(target, "player.normalize() target");
  if (misaligned) {
    throw globalThis.createError(({ EPLAYER }) =>
      EPLAYER({
        msg: `Misaligned player in '${target.state}' state: '${misaligned}'`,
        target,
      }),
    );
  }
  return target;
}

export { normalize };
