function searchPlayer({ timestamp = Date.now(), searchTerm } = {}) {
  return this.publish("player/search", { timestamp, searchTerm });
}

export { searchPlayer };
