import { WRISTBAND_COLORS } from "../../constants.js";

function tobject(wristband, options) {
  wristband ||= {};
  options ||= {};

  const _options = {
    defaultState: options.defaultState || "unpaired",
    backendForm: options.backendForm || false,
  };
  trace(_options, "wristband.tobject() _options");

  const afmWristband = {
    id: wristband.id || null,
    color: wristband.color || null,
    colorCode: wristband.colorCode || null,
    state: wristband.state?.name || wristband.state || _options.defaultState,
  };

  if (!_options.backendForm) return afmWristband;

  return {
    wristbandNumber: afmWristband.id,
    wristbandColor:
      afmWristband.colorCode || WRISTBAND_COLORS[afmWristband.color],
    active: afmWristband.state === "paired",
  };
}

export { tobject };
