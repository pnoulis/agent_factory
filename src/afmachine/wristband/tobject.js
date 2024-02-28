import { WRISTBAND_COLORS } from "../../constants.js";

function tobject(wristband, options) {
  trace(wristband, "wristband.tobject() wristband");
  trace(options, "wristband.tobject() options");
  wristband ||= {};
  options ||= {};

  const _options = {
    backendForm: options.backendForm || false,
    defaultState: options.defaultState || "unpaired",
  };
  trace(_options, "wristband.tobject() _options");

  const afmWristband = {
    id: wristband.id || null,
    color: wristband.color || null,
    colorCode: wristband.colorCode || null,
    state: wristband.state?.name || wristband.state || _options.defaultState,
  };

  if (!_options.backendForm) return afmWristband;

  const active =
    afmWristband === "paired" || afmWristband.state === "unpairing";

  return {
    wristbandNumber: afmWristband.id,
    wristbandColor:
      afmWristband.colorCode || WRISTBAND_COLORS[afmWristband.color],
    active,
  };
}

export { tobject };
