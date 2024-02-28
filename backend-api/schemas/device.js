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
  devicesActions: {
    type: "string",
    enum: [
      "WAKE_UP",
      "WAKEUP_ALL",
      "RESTART",
      "RESTART_ALL",
      "SHUTDOWN",
      "SHUTDOWN_ALL",
    ],
  },
};

export { device };
