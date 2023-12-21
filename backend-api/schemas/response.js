import { commons } from "./commons.js";
const response = {
  type: "object",
  properties: {
    timestamp: commons.timestamp,
    result: {
      type: "string",
      enum: ["OK", "NOK"],
    },
  },
};

export { response };
