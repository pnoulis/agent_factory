const pkg = {
  type: "object",
  required: ["name", "cost", "type", "amount"],
  properties: {
    name: {
      type: "string",
    },
    cost: {
      type: "number",
      nullable: true,
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
