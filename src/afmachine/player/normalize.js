import { isObject } from "js_utils/misc";
import { normalize as normalizeWristband } from "../wristband/normalize.js";
import { flatWristbands } from "./flatWristbands.js";

function normalize(sources, options = {}) {
  trace("normalize player");

  trace(options, "player options");
  trace(sources, "player sources");

  // See documentation at wristband/normalize.js
  const _options = {
    password: options.password ?? false,
    targetState: options.state || "",
    nullSupersede: options.nullSupersede ?? false,
    defaultState: options.defaultState ?? "unregistered",
    wristband: options.wristband ?? {},
  };
  trace(_options, "player _options");

  const _sources = [sources].flat(2).filter((src) => !!src);
  trace(_sources, "player _sources");

  const target = {
    username: "",
    name: "",
    surname: "",
    email: "",
    state: "",
    wristband: normalizeWristband(flatWristbands(_sources), _options.wristband),
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
      // target.wristband =
      //   _sources[i].wristband ??
      //   (Object.hasOwn(_sources[i], "wristbandNumber")
      //     ? {
      //         wristbandNumber: _sources[i].wristbandNumber,
      //         wristbandColor: _sources[i].wristbandColor,
      //       }
      //     : {});
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
      // target.wristband =
      //   _sources[i].wristband ??
      //   (Object.hasOwn(_sources[i], "wristbandNumber")
      //     ? {
      //         wristbandNumber: _sources[i].wristbandNumber,
      //         wristbandColor: _sources[i].wristbandColor,
      //       }
      //     : target.wristband);
    }
  }

  if (_options.targetState) {
    target.state = _options.targetState;
  } else if (wristbandMerged) {
    target.state = "inTeam";
  }

  target.state ||= _options.defaultState;
  // if (_options.depth > 0) {
  //   target.wristband = normalizeWristband(target.wristband, _options.wristband);
  //   // target.wristband = normalizeWristband(target.wristband, {
  //   //   state:
  //   //     (target.state === "inTeam" || target.state === "playing") && "paired",
  //   //   ...options.wristband,
  //   // });
  // } else {
  //   target.wristband = target.wristband.pop
  // }
  trace(target, "player target");
  return target;
}

export { normalize };
