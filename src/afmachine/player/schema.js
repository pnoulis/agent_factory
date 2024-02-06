import { schema as wristbandSchema } from "../wristband/schema.js";

const schema = {
  type: "object",
  additionalProperties: true,
  required: ["name", "surname", "username", "email", "state", "wristband"],
  properties: {
    name: { type: "string", minLength: 1 },
    surname: { type: "string", minLength: 1 },
    username: { type: "string", minLength: 1 },
    email: { type: "string", minLength: 1 },
    state: {
      oneOf: [
        {
          type: "string",
          enum: ["unregistered", "registered", "inTeam", "playing"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["unregistered", "registered", "inTeam", "playing"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
    wristband: {
      oneOf: [{ type: "null" }, wristbandSchema],
    },
  },
};

export { schema };
