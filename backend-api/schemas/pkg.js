const pkg = {
  type: "object",
  required: ["name", "cost", "type", "amount"],
  properties: {
    name: {
      type: "string",
    },
    cost: {
      type: ["number", "null"],
    },
    type: {
      type: "string",
      enum: ["mission", "time"],
    },
    amount: {
      type: "integer",
    },
  },
  additionalProperties: false,
};

export { pkg };
