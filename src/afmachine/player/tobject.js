import { tobject as tobjectWristband } from "../wristband/tobject.js";

function tobject(player, { depth = 1, backendForm = false } = {}) {
  player ||= {};

  const _tobject = {
    username: player.username || null,
    name: player.name || null,
    surname: player.surname || null,
    email: player.email || null,
  };

  if (backendForm) {
    return _tobject;
  }

  _tobject.wristband = depth < 1 ? null : tobjectWristband(player.wristband);
  _tobject.state = player.state?.name || player.state || null;

  return _tobject;
}

export { tobject };
