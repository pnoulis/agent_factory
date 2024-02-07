// device = AFM FORM
function tobject(device, { backendForm = false } = {}) {
  device ||= {};

  const afmDevice = {
    id: device.id || null,
    type: device.type || null,
    room: device.room || null,
  };

  if (!backendForm) return afmDevice;

  return {
    deviceId: afmDevice.id,
    deviceType: afmDevice.type,
    roomType: afmDevice.room,
  };
}

export { tobject };
