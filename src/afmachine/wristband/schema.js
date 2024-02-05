const schema = {
  type: "object",
  additionalProperties: true,
  required: ["id", "colorCode", "color", "state"],
  properties: {
    id: { type: ["integer", "null"] },
    colorCode: { type: ["integer", "null"] },
    color: { type: "string" },
    state: {
      anyOf: [
        { type: "null" },
        {
          type: "string",
          enum: ["", "unpaired", "pairing", "unpairing", "paired"],
        },
        {
          type: "object",
          required: ["name", "order"],
          additionalProperties: true,
          properties: {
            name: {
              type: "string",
              enum: ["", "unpaired", "pairing", "unpairing", "paired"],
            },
            order: { type: "integer" },
          },
        },
      ],
    },
  },
};

export { schema };
