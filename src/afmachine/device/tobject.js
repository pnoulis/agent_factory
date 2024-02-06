function tobject(device, { backendForm = false } = {}) {
  device ||= {};
  return backendForm
    ? {
        deviceId: device.id || null,
        deviceType: device.type || null,
        roomType: device.room || null,
      }
    : {
        id: device.id || null,
        type: device.type || null,
        room: device.room || null,
      };
}

export { tobject };
