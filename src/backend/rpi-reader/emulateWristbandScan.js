function emulateWristbandScan({ id, color }) {
  return this.publish(
    "scan",
    {
      timestamp: Date.now(),
      wristbandNumber: id,
      wristbandColor: color,
    },
    { mode: "ff" },
  );
}

export { emulateWristbandScan };
