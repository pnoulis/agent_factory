import { CreateBackendService } from "../services/backend/CreateBackendService.js";
import { randomPlayer } from "./randomPlayer.js";

const bservice = CreateBackendService();

function registerPlayers(n = 1, ...players) {
  const toregister = new Array(n);
  for (let i = 0; i < n; i++) {
    toregister[i] = bservice.registerPlayer(players.pop() || randomPlayer());
  }
  return Promise.all(toregister);
}

export { registerPlayers };
