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
    id: { type: ["integer", "null"] },
    name: { type: "string", enum: ["", ...PACKAGES.map((pkg) => pkg.name)] },
    type: { type: "string", enum: ["", ...Object.keys(PACKAGE_TYPES)] },
    amount: { type: ["number", "null"] },
    cost: { type: ["number", "null"] },
    t_start: { type: ["integer", "null"] },
    t_end: { type: ["integer", "null"] },
    remainder: { type: ["integer", "null"] },
    state: {
      anyOf: [
        { type: "null" },
        {
          type: "string",
          enum: [
            "",
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
                "",
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
