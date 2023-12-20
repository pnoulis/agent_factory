const pkg = {
  type: "object",
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
