function restartDevice({ deviceId }) {
  return this.publish(
    "/devices/action",
    deviceId
      ? {
          timestamp: Date.now(),
          devicesAction: "RESTART",
          deviceId,
        }
      : {
          timestamp: Date.now(),
          devicesAction: "RESTART_ALL",
          deviceId: "",
        },
  );
}

export { restartDevice };
