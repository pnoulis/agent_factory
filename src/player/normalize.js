import { isObject } from "js_utils/misc";

function normalize(player) {
  player ??= {};
  const _player = {
    username: player.username || "",
    name: player.name || "",
    surname: player.surname || "",
    email: player.email || "",
    password: player.password || "",
  };
  _player.state = player.state?.name ?? player.state ?? "";
  return _player;
}

export { normalize };
