import { WRISTBAND_COLORS } from "../../constants.js";

function normalize(sources, options = {}) {
  trace("normalize wristband");

  const _options = {
    targetState: options.state || "",
    // Allow null values in the sources sequence to replace
    // non-empty properties in the target object.
    nullSupersede: options.nullSupersede || false,
    defaultState: options.defaultState || "unpaired",
  };
  trace(_options, "wristband _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "wristband _sources");

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
      target.state = sources[i].state?.name || _sources[i].state || null;
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

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (target.id == null) {
    target.state = "unpaired";
  } else if (active) {
    target.state = "paired";
  }

  target.state ||= _options.defaultState;

  trace(target, "wristband target");
  return target;
}

export { normalize };
