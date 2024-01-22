import { WRISTBAND_COLORS } from "../constants.js";

function normalize(wristband = {}) {
  const _wristband = {
    id: wristband.id ?? wristband.wristbandNumber ?? 0,
    colorCode: wristband.colorCode ?? wristband.wristbandColor ?? 0,
  };
  _wristband.color = WRISTBAND_COLORS[_wristband.colorCode] ?? 0;
  return _wristband;
}

export { normalize };
