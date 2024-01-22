function emulateWristbandScan({ id, color }) {
  return this.publish(
    "read",
    {
      timestamp: Date.now(),
      wristbandNumber: id,
      wristbandColor: color,
    },
    { mode: "ff" },
  );
}

export { emulateWristbandScan };
