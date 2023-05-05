import { TaskRunner } from "js_utils";
import { CONFIG } from "afmachine/config";
const { Afmachine } = CONFIG;
import { BACKEND_PLAYERS } from "../tmp/players.js";

const tr = new TaskRunner({
  timeout: 10000,
  isConnected: () => Afmachine.backend.connected && Afmachine.backend.isBooted,
});

Afmachine.init();
BACKEND_PLAYERS.forEach((player) =>
  tr
    .run(() => Afmachine.players.register(player))
    .then((res) => console.log(`registered player: ${res.player.username}`))
    .catch((err) => console.log(err))
);
