import { Wristband } from "../wristband/Wristband.js";

function tobject(player, options) {
  player ||= {};
  options ||= {};

  const _options = {
    backendForm: options.backendForm || false,
    defaultState: options.defaultState || "unregistered",
    depth: options.depth ?? 1,
  };
  trace(_options, "player.tobject() _options");

  const afmPlayer = {
    state: player.state?.name || player.state || _options.defaultState,
    wristband: _options.depth
      ? Wristband.tobject(player.wristband, {
          backendForm: _options.backendForm,
          ...options.wristband,
        })
      : player.wristband,
  };

  const sharedProps = {
    username: player.username || null,
    name: player.name || null,
    surname: player.surname || null,
    email: player.email || null,
  };

  if (!_options.backendForm) return { ...sharedProps, ...afmPlayer };

  const wristbandMerged =
    wristbandState === "unpairing" || wristbandState === "paired";

  return {
    ...sharedProps,
    wristbandMerged,
  };
}

export { tobject };
