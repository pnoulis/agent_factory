function scanWristband(unsubcb) {
  return new Promise((resolve, reject) => {
    this.subscribe(
      "wristband/scan",
      (unsubed, err, wristband) => {
        if (err) {
          reject(err);
        }
        resolve({ unsubed, wristband });
      },
      { mode: "response" },
    )
      .then(unsubcb)
      .catch(reject);
  });
}

function onWristbandScan(listener) {
  return this.subscribe("/wristband/scan", listener, {
    mode: "persistent",
  });
}

function onceWristbandScan(listener) {
  return this.subscribe("wristband/scan", listener, { mode: "response" });
}

export { scanWristband, onWristbandScan, onceWristbandScan };
