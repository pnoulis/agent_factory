import "../src/debug.js";
import { afm } from "../src/afmachine/afm.js";
import { PlayerCommander } from "../src/player/thin/PlayerCommander.js";
import { Wristband } from "../src/wristband/thin/Wristband.js";
import { WristbandCommander } from "../src/wristband/thin/WristbandCommander.js";

logafm(afm);
const wc = new WristbandCommander(afm);
const pc = new PlayerCommander(afm, {}, wc).fill();

await pc.register("yolo");
await pc.pairWristband();
await pc.unpairWristband();
