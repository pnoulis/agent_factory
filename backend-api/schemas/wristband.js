const wristband = {
  type: "object",
  properties: {
    wristbandColor: {
      type: "integer",
      minimum: 1,
      maximum: 6,
    },
    wristbandNumber: {
      type: "integer",
      minimum: 0,
      maximum: 300,
    },
    active: {
      type: "boolean",
    },
  },
};

export { wristband };
