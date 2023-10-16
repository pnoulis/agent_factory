function shutdownDevice({ deviceId }) {
  return this.publish(
    "/devices/action",
    deviceId
      ? {
          timestamp: Date.now(),
          devicesAction: "SHUTDOWN",
          deviceId,
        }
      : {
          timestamp: Date.now(),
          devicesAction: "SHUTDOWN_ALL",
          deviceId: "",
        },
  );
}

export { shutdownDevice };
