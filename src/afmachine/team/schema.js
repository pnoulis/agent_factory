import { schema as packageSchema } from "../package/schema.js";
import { schema as playerSchema } from "../player/schemas.js~";

const schema = {
  type: "object",
  additionalProperties: true,
  required: ["name", "t_created", "points", "state", "packages", "roster"],
  properties: {
    name: { type: "string" },
    t_created: { type: ["integer", "null"] },
    points: { type: ["integer", "null"] },
    state: {
      anyOf: [
        { type: "null" },
        {
          type: "string",
          enum: ["", "unregistered", "registered", "playing"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["", "unregistered", "registered", "playing"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
    packages: {
      type: "array",
      items: packageSchema,
    },
    roster: {
      type: "array",
      items: playerSchema,
    },
  },
};

export { schema };
