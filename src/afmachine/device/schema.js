import { DEVICE_TYPES, DEVICE_IDS, ROOM_TYPES } from "../../constants.js";
import { unique } from "js_utils/misc";

const schema = {
  type: "object",
  additionalProperties: true,
  required: ["id", "type", "room"],
  properties: {
    id: {
      type: "string",
      enum: unique(Object.values(DEVICE_IDS)),
    },
    type: {
      type: "string",
      enum: unique(Object.values(DEVICE_TYPES)),
    },
    room: {
      type: "string",
      enum: unique(Object.values(ROOM_TYPES)),
    },
  },
};

export { schema };
