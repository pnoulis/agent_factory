import { WRISTBAND_COLORS } from "../constants.js";

function normalize(sources, options = {}) {
  // debug("normalize wristband");
  const _sources = [sources].flat().filter((src) => !!src);
  // debug(_sources);

  const _options = {
    targetState: options.state || "",

    // Allow null values in the sources sequence to replace
    // non-empty properties in the target object.
    nullSupersede: options.nullSupersede ?? false,

    // It is assumed that if the value of options.defaultState is the
    // empty string "" it is done so by design and the 'actual' default
    // state (unpaired) will not shadow it.
    defaultState: options.defaultState ?? "unpaired",
  };
  // debug(_options);

  const target = { id: null, color: "", colorCode: null, state: "" };
  let active = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? _sources[i].wristbandNumber ?? null;
      target.colorCode =
        _sources[i].colorCode ?? _sources[i].wristbandColor ?? null;
      target.state =
        typeof _sources[i].state === "object"
          ? _sources[i].state?.name
          : _sources[i].state;
      active = _sources[i].active ?? false;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? _sources[i].wristbandNumber ?? target.id;
      target.colorCode =
        _sources[i].colorCode ?? _sources[i].wristbandColor ?? target.colorCode;
      target.state =
        (typeof _sources[i].state === "object"
          ? _sources[i].state?.name
          : _sources[i].state) || target.state;
      active = _sources[i].active ?? active;
    }
  }

  target.color = WRISTBAND_COLORS[target.colorCode] || "";

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (active) {
    target.state = "paired";
  }

  target.state ||= _options.defaultState;

  // debug(target);
  return target;
}

export { normalize };
