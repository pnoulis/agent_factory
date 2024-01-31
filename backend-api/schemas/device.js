const device = {
  deviceId: { type: ["string", "integer"] },
  deviceType: { type: "string" },
  /*
      enum: [
        "REGISTRATION_SCREEN",
        "SCOREBOARD_SCREEN",
        "RPI_READER",
        "OUTSIDE_ROOM_SCREEN",
        "INSIDE_ROOM_SCREEN",
        "RPI_GAMEPLAY",
      ],
   */
  roomType: {
    type: "string",
  },
  macAddress: { type: "null" },
  ipAddress: { type: "null" },
  status: { type: "string" },
};

export { device };
