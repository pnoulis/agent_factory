const commons = {
  timestamp: {
    type: "integer",
  },
  message: {
    type: "string",
  },
  started: {
    type: ["integer", "null"],
  },
  ended: {
    type: ["integer", "null"],
  },
  active: {
    type: "boolean",
  },
  id: {
    type: "integer",
  },
};

export { commons };
