const wristband = {
  type: "object",
  additionalProperties: true,
  nullable: true,
  required: ["id", "colorCode", "color", "state"],
  properties: {
    id: { type: ["integer", "null"] },
    colorCode: { type: ["integer", "null"] },
    color: { type: "string" },
    state: {
      oneOf: [
        { type: "null" },
        {
          type: "string",
          enum: ["", "unpaired", "pairing", "unpairing", "paired"],
        },
        {
          type: "object",
          nullable: true,
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

export { wristband };
