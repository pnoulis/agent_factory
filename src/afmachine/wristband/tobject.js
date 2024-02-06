function tobject(wristband, { backendForm = false } = {}) {
  wristband ||= {};
  return backendForm
    ? {
        wristbandNumber: wristband.id || null,
        wristbandColor: wristband.colorCode || null,
      }
    : {
        id: wristband.id || null,
        color: wristband.color || null,
        colorCode: wristband.colorCode || null,
        state: wristband.state?.name || wristband.state || null,
      };
}

export { tobject };
