import {
  MAX_WRISTBAND_CC,
  MIN_WRISTBAND_CC,
  MAX_WRISTBAND_ID,
  MIN_WRISTBAND_ID,
  WRISTBAND_COLORS,
} from "../../constants.js";

const afmForm = {
  type: "object",
  additionalProperties: true,
  required: ["id", "colorCode", "color", "state"],
  properties: {
    id: {
      type: "integer",
      minimum: MIN_WRISTBAND_ID,
      maximum: MAX_WRISTBAND_ID,
    },
    colorCode: {
      type: "integer",
      minimum: MIN_WRISTBAND_CC,
      maximum: MAX_WRISTBAND_CC,
    },
    color: {
      type: "string",
      enum: new Array(MAX_WRISTBAND_CC)
        .fill()
        .map((_, i) => WRISTBAND_COLORS[MIN_WRISTBAND_CC + i]),
    },
    state: {
      oneOf: [
        {
          type: "string",
          enum: ["unpaired", "pairing", "unpairing", "paired"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["unpaired", "pairing", "unpairing", "paired"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
  },
};

const backendForm = {
  type: "object",
  additionalProperties: false,
  required: ["wristbandNumber", "wristbandColor", "active"],
  properties: {
    wristbandNumber: {
      type: "integer",
      minimum: MIN_WRISTBAND_ID,
      maximum: MAX_WRISTBAND_ID,
    },
    wristbandColor: {
      type: "integer",
      minimum: MIN_WRISTBAND_CC,
      maximum: MAX_WRISTBAND_CC,
    },
    active: {
      type: "boolean",
    },
  },
};

export { afmForm, backendForm };
