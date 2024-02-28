function loginPlayer({ username = "", password = "" } = {}) {
  return this.mqtt.publish("player/login", { username, password });
}

export { loginPlayer };
