function normalize(player) {
  player ??= {};
  const _player = {
    username: player.username || "",
    name: player.name || "",
    surname: player.surname || "",
    email: player.email || "",
    password: player.password || "",
  };
  return _player;
}

export { normalize };
