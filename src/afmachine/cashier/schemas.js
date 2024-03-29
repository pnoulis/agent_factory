import { PRIVILEGE_TYPES } from "../../constants.js";
import { unique } from "js_utils/misc";

const afmCashier = {
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

const backendCashier = {
  type: "object",
  additionalProperties: false,
  required: ["id", "username", "email", "roles"],
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
    roles: {
      type: "array",
      minItems: 1,
      items: {
        type: "string",
        enum: ["ROLE_CASHIER", "ROLE_MANAGER", "ROLE_ADMIN"],
      },
    },
  },
};

export { afmCashier, backendCashier };
