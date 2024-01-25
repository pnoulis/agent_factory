import "../src/debug.js";
import { afm } from "../src/afmachine/afm.js";
import { PlayerCommander } from "../src/player/thin/PlayerCommander.js";
import { Wristband } from "../src/wristband/thin/Wristband.js";
import { WristbandCommander } from "../src/wristband/thin/WristbandCommander.js";
import { WristbandTarget } from "../src/wristband/thin/WristbandTarget.js";

logafm(afm);
const w = new Wristband();
const pc = new PlayerCommander(afm, {}, w).fill();
logent(pc);
logevents(pc);
pc.pairWristband();
