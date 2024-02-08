function tobject(device, options) {
  device ||= {};
  options ||= {};

  const _options = {
    backendForm: options.backendForm || false,
  };
  trace(_options, "device.tobject() _options");

  const afmDevice = {
    id: device.id || null,
    type: device.type || null,
    room: device.room || null,
  };

  if (!_options.backendForm) return afmDevice;

  return {
    deviceId: afmDevice.id,
    deviceType: afmDevice.type,
    roomType: afmDevice.room,
  };
}

export { tobject };
