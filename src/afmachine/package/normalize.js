import { t_stomls, t_stomin } from "../../misc/misc.js";
import { PACKAGE_TYPES } from "../../constants.js";

function normalize(sources, options = {}) {
  trace("normalize package");
  trace(sources, "package normalize sources");
  trace(options, "package normalize options");

  // See documentation at wristband/normalize.js
  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede || false,
    defaultState: options.defaultState || "unregistered",
  };
  trace(_options, "package normalize _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "package normalize _sources");

  const target = {
    id: null,
    name: null,
    type: null,
    cost: null,
    t_start: null,
    t_end: null,
    amount: null,
    remainder: null,
    state: null,
  };
  let active = false;
  let paused = false;
  let amount = 0;
  let remainder = null;

  // Translate and merge sources into target.
  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      // Common to all types of packages
      target.id = _sources[i].id || null;
      target.name = _sources[i].name || null;
      target.cost = _sources[i].cost || null;
      target.t_start = _sources[i].t_start || _sources[i].started || null;
      target.t_end = _sources[i].t_end || _sources[i].ended || null;

      // State information
      active = _sources[i].active || false;
      paused = _sources[i].paused || false;

      // Type dependant
      if (Object.hasOwn(_sources[i], "missions")) {
        target.type = PACKAGE_TYPES.missions;
        amount = _sources[i].missions;
        remainder = amount - _sources[i].missionsPlayed;
      } else if (Object.hasOwn(_sources[i], "duration")) {
        target.type = PACKAGE_TYPES.time;
        amount = t_stomin(_sources[i].duration);
        remainder =
          Date.now() - (target.t_start + t_stomls(_sources[i].duration));
        remainder = remainder < 0 ? Math.floor(Math.abs(remainder)) : 0;
      } else {
        target.type = _sources[i].type;
        amount = _sources[i].amount;
        remainder = _sources[i].remainder;
      }
      target.amount = amount || null;
      target.remainder = remainder ?? null;
      target.state = _sources[i].state?.name || _sources[i].state || null;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      // Common to all types of packages
      target.id = _sources[i].id || target.id;
      target.name = _sources[i].name || target.name;
      target.cost = _sources[i].cost || target.cost;
      target.t_start =
        _sources[i].t_start || _sources[i].started || target.t_start;
      target.t_end = _sources[i].t_end || _sources[i].ended || target.t_end;

      // State information
      active = _sources[i].active || active;
      paused = _sources[i].paused || paused;

      // Type dependant
      if (Object.hasOwn(_sources[i], "missions")) {
        target.type = "mission";
        amount = _sources[i].missions;
        remainder = amount - _sources[i].missionsPlayed;
      } else if (Object.hasOwn(_sources[i], "duration")) {
        target.type = "time";
        amount = t_stomin(_sources[i].duration);
        remainder =
          Date.now() - (target.t_start + t_stomls(_sources[i].duration));
        remainder = remainder < 0 ? Math.floor(Math.abs(remainder)) : 0;
      } else {
        target.type = _sources[i].type || target.type;
        amount = _sources[i].amount;
        remainder = _sources[i].remainder;
      }
      target.amount = amount || target.amount;
      target.remainder = remainder ?? target.remainder;
      target.state = _sources[i].state?.name || _sources[i].state || null;
    }
  }

  // Calculate state
  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (paused) {
    target.state = "paused";
  } else if (target.remainder === 0 || target.t_end > 0) {
    target.state = "completed";
  } else if (active) {
    target.state = "playing";
  } else if (target.id) {
    target.state = "registered";
  } else {
    target.state ||= _options.defaultState;
  }

  trace(target, "package normalize target");
  return target;
}

export { normalize };
