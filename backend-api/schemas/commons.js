const primitives = {
  timestamp: {
    type: "integer",
  },
  cashierRoles: {
    type: "array",
    minItems: 1,
    maxItems: 1,
    items: {
      type: "string",
      enum: ["ROLE_CASHIER", "ROLE_MANAGER", "ROLE_ADMIN"],
    },
  },
};

export { primitives };
