import { generateRandomName, randomInteger } from "js_utils/misc";

function randomPlayer(count = 1) {
  const players = [];

  while (count > 0) {
    const username = `${generateRandomName()}_${randomInteger(1, 1000)}`;
    const [name, surname, password] = username.split("_");
    players.push({
      username,
      email: `${username}@gmail.com`,
      name,
      surname,
      password,
    });
    --count;
  }

  return players.length > 1 ? players : players.pop();
}

export { randomPlayer };
