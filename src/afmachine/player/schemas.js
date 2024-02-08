import { afmForm as wristbandSchema } from "../wristband/schemas.js";

const afmForm = {
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

const backendForm = {
  type: "object",
  additionalProperties: false,
  required: ["name", "surname", "username", "email", "wristbandMerged"],
  properties: {
    name: { type: "string", minLength: 1 },
    surname: { type: "string", minLength: 1 },
    username: { type: "string", minLength: 1 },
    email: { type: "string", minLength: 1 },
    wristbandMerged: { type: "boolean" },
  },
};

export { afmForm, backendForm };
