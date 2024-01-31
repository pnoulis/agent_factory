import "../src/debug.js";
import { Roster } from "../src/afmachine/roster/Roster.js";
import { Player } from "../src/player/thin/Player.js";

let tmp;

// arrays
const ar = [
  new Player().fill({ username: "yolo", name: "ila" }),
  new Player().fill(),
];

// maps
const map = new Map();
tmp = new Player().fill();
map.set(tmp.username, tmp);
tmp = new Player({ username: "yolo", name: "tiza" }).fill();
map.set(tmp.username, tmp);

// objects
const p1 = new Player().fill();

// nulls
const p2 = null;
const p3 = undefined;

console.time("normalizeRoster");
const r = Roster.random(ar, { size: 6 });
console.timeEnd("normalizeRoster");

console.log(r);
