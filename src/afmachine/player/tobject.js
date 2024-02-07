import { Wristband } from "../wristband/Wristband.js";

// player = AFM FORM
function tobject(player, options) {
  player ||= {};

  const _options = (arguments.length < 2 ? player : options) || {};
  _options.depth ??= 1;
  _options.defaultState ||= "unregistered";
  _options.backendForm ||= false;

  const backendPlayer = {
    username: player.username || null,
    name: player.name || null,
    surname: player.surname || null,
    email: player.email || null,
  };

  if (_options.backendForm) return backendPlayer;

  return {
    ...backendPlayer,
    wristband: Wristband.tobject(player.wristband, _options.wristband),
    state: player.state?.name || player.state || _options.defaultState,
  };
}

export { tobject };
