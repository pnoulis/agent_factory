import { PACKAGE_TYPES, PACKAGES } from "../../constants.js";

const schema = {
  type: "object",
  additionalProperties: true,
  required: [
    "id",
    "name",
    "type",
    "amount",
    "cost",
    "t_start",
    "t_end",
    "remainder",
    "state",
  ],
  properties: {
    id: { type: "integer", minimum: 1 },
    name: { type: "string", enum: PACKAGES.map((pkg) => pkg.name) },
    type: { type: "string", enum: Object.keys(PACKAGE_TYPES) },
    amount: { type: "number", minimum: 1 },
    cost: { type: "number", minimum: 1 },
    t_start: { type: "integer", minimum: 1 }, // MILLISECONDS
    t_end: { type: "integer", minimum: 1 }, // MILLISECONDS
    remainder: { type: "number", minimum: 1 }, // MILLISECONDS OR MISSIONS
    state: {
      anyOf: [
        {
          type: "string",
          enum: [
            "unregistered",
            "registered",
            "playing",
            "paused",
            "completed",
          ],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: [
                "unregistered",
                "registered",
                "playing",
                "paused",
                "completed",
              ],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
  },
};

export { schema };
