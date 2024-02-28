const team = {
  name: { type: "string" },
  totalPoints: { type: "integer" },
  teamState: {
    type: "string",
    nullable: true,
    enum: [
      "PENDING_PACKAGES",
      "LOADED_PACKAGES",
      "PACKAGE_RUNNING",
      "FINISHED",
      null,
    ],
  },
  created: {
    type: "integer",
  },
  lastRegisterAttempt: {
    type: ["null", "integer"],
  },
  roomType: {
    type: ["null", "string"],
  },
  version: {
    type: "integer",
  },
};

export { team };
