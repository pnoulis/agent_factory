function searchPlayer({ timestamp = Date.now(), searchTerm } = {}) {
  return this.mqtt.publish("player/search", { timestamp, searchTerm });
}

export { searchPlayer };
