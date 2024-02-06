import { PRIVILEGE_TYPES } from "../../constants.js";
import { unique } from "js_utils/misc";

const schema = {
  type: "object",
  additionalProperties: true,
  required: ["id", "username", "email", "role"],
  properties: {
    id: {
      type: "integer",
      minimum: 1,
    },
    username: {
      type: "string",
      minLength: 1,
    },
    email: {
      type: "string",
      minLength: 1,
    },
    role: {
      type: "string",
      enum: unique(Object.keys(PRIVILEGE_TYPES)),
    },
  },
};

export { schema };
