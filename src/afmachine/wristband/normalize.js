import { WRISTBAND_COLORS } from "../../constants.js";

function normalize(sources, options) {
  trace(sources, options, "wristband.normalize() arguments");

  options ||= {};
  const _options = {
    targetState: options.state || null,
    defaultState: options.defaultState || "unpaired",
    nullSupersede: options.nullSupersede || false,
    stage2: options.stage2 ?? false,
  };
  trace(_options, "wristband.normalize() _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "wristband.normalize() _sources");

  const target = {
    id: null,
    color: null,
    colorCode: null,
    state: null,
  };
  let active = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || _sources[i].wristbandNumber || null;
      target.colorCode =
        _sources[i].colorCode || _sources[i].wristbandColor || null;
      target.state = _sources[i].state?.name || _sources[i].state || null;
      active = _sources[i].active || false;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id || _sources[i].wristbandNumber || target.id;
      target.colorCode =
        _sources[i].colorCode || _sources[i].wristbandColor || target.colorCode;
      target.state =
        _sources[i].state?.name || _sources[i].state || target.state;
      active = _sources[i].active || active;
    }
  }

  target.color = WRISTBAND_COLORS[target.colorCode] || null;

  // stage 1
  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (active) {
    target.state = "paired";
  } else {
    target.state ||= _options.defaultState;
  }

  if (!_options.stage2) {
    trace(target, "wristband.normalize() target");
    return target;
  }

  // stage 2
  let misaligned = "";
  switch (target.state) {
    case "paired":
    // fall through
    case "unpairing":
    // fall through
    case "pairing":
      if (!(target.id && target.color && target.colorCode)) {
        misaligned = "Missing properties";
      }
    // fall through
    case "unpaired":
      // Content could be either defined or not defined
      break;
    default:
      throw globalThis.craterr(({ EWRISTBAND }) =>
        EWRISTBAND({
          msg: `Unrecognized wristband state: '${target.state}'`,
          target,
        }),
      );
  }

  trace(target, "wristband.normalize() target");
  if (misaligned) {
    throw globalThis.craterr(({ EWRISTBAND }) =>
      EWRISTBAND({
        msg: `Misaligned wristband in '${target.state}' state: '${misaligned}'`,
        target,
      }),
    );
  }
  return target;
}

export { normalize };
