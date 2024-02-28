function listPackages() {
  return this.mqtt.publish("list/packages");
}

export { listPackages };
