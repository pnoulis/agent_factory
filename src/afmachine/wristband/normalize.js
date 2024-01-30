import { WRISTBAND_COLORS } from "../../constants.js";
import { isObject } from "js_utils/misc";

function normalize(sources, options = {}) {
  trace("normalize wristband");

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
  trace(_options, "wristband options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources);

  const target = { id: null, color: "", colorCode: null, state: "" };
  let active = false;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? _sources[i].wristbandNumber ?? null;
      target.colorCode =
        _sources[i].colorCode ?? _sources[i].wristbandColor ?? null;
      target.state = isObject(sources[i].state)
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
        (isObject(_sources[i].state)
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

  trace(target, "wristband target");
  return target;
}

export { normalize };
