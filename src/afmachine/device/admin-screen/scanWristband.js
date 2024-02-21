function scanWristband(unsubcb) {
  return new Promise((resolve, reject) => {
    this.mqtt
      .subscribe(
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

export { scanWristband };
