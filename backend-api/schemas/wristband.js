import { MAX_WRISTBAND_ID } from "../../src/constants.js";

const wristband = {
  type: "object",
  properties: {
    wristbandColor: {
      type: "integer",
      minimum: 0,
      maximum: 6,
    },
    wristbandNumber: {
      type: "integer",
      minimum: 0,
      maximum: MAX_WRISTBAND_ID,
    },
    active: {
      type: "boolean",
    },
  },
};

export { wristband };
