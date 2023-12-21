const device = {
  type: "object",
  properties: {
    deviceId: {
      type: "string",
    },
    deviceType: {
      type: "string",
      enum: [
        "REGISTRATION_SCREEN",
        "SCOREBOARD_SCREEN",
        "RPI_READER",
        "OUTSIDE_ROOM_SCREEN",
        "INSIDE_ROOM_SCREEN",
        "RPI_GAMEPLAY",
      ],
    },
    roomType: {
      type: "string",
    },
  },
};

export { device };
