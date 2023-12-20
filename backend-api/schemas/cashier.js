import { user } from "./user.js";

const cashier = {
  type: "object",
  properties: {
    username: user.properties.username,
    email: user.properties.email,
    password: user.properties.password,
    role: {
      type: "array",
      minItems: 1,
      maxItems: 1,
      items: {
        type: "string",
        enum: ["ROLE_CASHIER", "ROLE_MANAGER", "ROLE_ADMIN"],
      },
    },
  },
};

export { cashier };
