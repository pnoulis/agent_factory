function loginPlayer({ username = "", password = "" } = {}) {
  return this.publish("player/login", { username, password });
}

export { loginPlayer };
