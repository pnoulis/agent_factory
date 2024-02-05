import { schema as wristbandSchema } from "../wristband/schema.js";

const schema = {
  type: "object",
  additionalProperties: true,
  required: ["name", "surname", "username", "email", "state", "wristband"],
  properties: {
    name: { type: "string" },
    surname: { type: "string" },
    username: { type: "string" },
    email: { type: "string" },
    state: {
      oneOf: [
        { type: "null" },
        {
          type: "string",
          enum: ["", "unregistered", "registered", "inTeam", "playing"],
        },
        {
          type: "object",
          nullable: true,
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["", "unregistered", "registered", "inTeam", "playing"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
    wristbandSchema,
  },
};

export { schema };
