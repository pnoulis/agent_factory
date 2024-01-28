import { isObject } from "js_utils/misc";

function normalize(sources, options = {}) {
  //debug('normalize package');

  // See documentation at wristband/normalize.js
  const _options = {
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
  };

  //debug(_options);

  const _sources = [sources].flat(2).filter((src) => !!src);
  // debug(_sources);

  const target = {
    id: null,
    name: "",
    type: "",
    amount: null,
    cost: null,
    t_start: null,
    t_end: null,
    remainder: null,
    state: "",
  };
  let active = false;
  let paused = false;
  let missionsPlayed = 0;
  let duration = 0;

  if (_options.nullSupersede) {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? null;
      target.name = _sources[i].name || "";
      target.amount = _sources[i].amount ?? null;
      target.cost = _sources[i].cost ?? null;
      target.t_start = _sources[i].t_start ?? _sources[i].t_started ?? null;
      target.t_end = _sources[i].t_end ?? _sources[i].ended ?? null;
      if (Object.hasOwn(_sources[i], "missions")) {
        target.type = "mission";
        missionsPlayed = _sources[i].missionsPlayed ?? null;
      } else if (Object.hasOwn(_sources[i], "duration")) {
        target.type = "time";
        duration = _sources[i].duration ?? null;
        paused = _sources[i].paused ?? false;
      } else {
        target.type = _sources[i].type || "";
      }
      active = _sources[i].active ?? false;
      target.state = isObject(_sources[i].state)
        ? _sources[i].state.name
        : _sources[i].state;
    }
  } else {
    for (let i = 0; i < _sources.length; i++) {
      target.id = _sources[i].id ?? target.id;
      target.name = _sources[i].name || target.name;
      target.amount = _sources[i].amount ?? target.amount;
      target.cost = _sources[i].cost ?? target.cost;
      target.t_start = _sources[i].t_start ?? target.t_start;
      target.t_end = _sources[i].t_end ?? target.t_end;
      active = _sources[i].active ?? active;
      if (Object.hasOwn(_sources[i], "missions")) {
        target.type = "mission";
        missionsPlayed = _sources[i].missionsPlayed ?? missionsPlayed;
      } else if (Object.hasOwn(_sources[i], "duration")) {
        target.type = "time";
        duration = _sources[i].duration ?? duration;
        paused = _sources[i].paused ?? paused;
      } else {
        target.type = _sources[i].type || target.type;
      }
      target.state =
        (isObject(_sources[i].state)
          ? _sources[i].state.name
          : _sources[i].state) || target.state;
    }
  }

  if (_options.targetState) {
  }

  // debug(target);
  return target;
}

export { normalize };
