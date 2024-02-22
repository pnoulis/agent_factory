import { t_stomls, t_stomin } from "../../misc/misc.js";
import { PACKAGE_TYPES } from "../../constants.js";

function normalize(sources, options) {
  trace(sources, options, "package.normalize() arguments");

  options ||= {};
  const _options = {
    targetState: options.state || null,
    defaultState: options.defaultState || "unregistered",
    nullSupersede: options.nullSupersede || false,
    stage2: options.stage2 ?? true,
  };
  trace(_options, "package.normalize() _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "package.normalize() _sources");

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
      target.state =
        _sources[i].state?.name || _sources[i].state || target.state;
    }
  }

  // stage 1
  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (active) {
    target.state = "playing";
  } else {
    target.state ||= _options.defaultState;
  }

  if (true) {
    trace(target, "package.normalize() target");
    return target;
  }

  // stage 2
  let misaligned = "";
  switch (target.state) {
    case "completed":
      if (!target.t_end) {
        misaligned = "Must have ended";
      } else if (!target.t_start) {
        misaligned = "Must have started";
      } else if (!target.id) {
        misaligned = "Must have been registered";
      } else if (
        !(target.amount && target.name && target.cost && target.type)
      ) {
        misaligned = "Missing properties";
      }
      break;
    case "playing":
      if (!target.t_start) {
        misaligned = "Must have started";
      } else if (target.t_end) {
        misaligned = "Must not have ended";
      }
    // fall through
    case "registered":
      // remainder is not being checked on purpose.
      if (!target.id) {
        misaligned = "Must have been registered";
      } else if (
        !(target.amount && target.name && target.cost && target.type)
      ) {
        misaligned = "Missing properties";
      }
      break;
    case "unregistered":
      if (target.id) {
        misaligned = "Must not have been registered";
      }
      break;
    default:
      throw globalThis.craterr(({ EPLAYER }) =>
        EPLAYER({
          msg: `Unrecognized package state: '${target.state}'`,
          target,
        }),
      );
  }

  trace(target, "package.normalize() target");
  if (misaligned) {
    throw globalThis.craterr(({ EPACKAGE }) =>
      EPACKAGE({
        msg: `Misaligned package in '${target.state}' state: '${misaligned}'`,
        target,
      }),
    );
  }
  return target;
}

export { normalize };
